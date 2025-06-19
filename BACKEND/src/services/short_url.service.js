import { generateId } from "../utils/helper.js";
import { getCustomUrl, saveShrotUrl } from "../dao/short_url.js";
import urlSchema from "../models/shortUrl.model.js";

export const createShortUrlServiceWithoutUser = async (url) => {
    const shortUrl = await generateId(7);
    await saveShrotUrl(url, shortUrl);
    return shortUrl;
}

export const createShortUrlServiceWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug || await generateId(7);
    
    const exist = await getCustomUrl(slug);
    if (exist) throw new Error("Slug already exists");

    await saveShrotUrl(url, shortUrl, userId);
    return shortUrl;
}

export const getShortUrl = async(shortUrl) => {
    try {
        const result = await urlSchema.findOneAndUpdate(
            {short_url: shortUrl}, 
            {$inc:{clicks:1}},
            {new: true} // Return the updated document
        );
        
        if (!result) {
            console.log(`No URL found for short code: ${shortUrl}`);
            return null;
        }
        return result;
    } catch (error) {
        console.error(`Error retrieving URL for short code ${shortUrl}:`, error);
        throw error;
    }
}
