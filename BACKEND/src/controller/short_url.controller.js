import { get } from "mongoose";
import { createShortUrlServiceWithoutUser, createShortUrlServiceWithUser, getShortUrl } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { getLongUrl } from "../dao/short_url.js";


export const createShortUrl = wrapAsync(async (req, res) => {       
        const data = req.body;
        let shortUrl;
        if (req.user) {
            shortUrl = await createShortUrlServiceWithUser(data.url, req.user._id, data.slug);
        } else {
            shortUrl = await createShortUrlServiceWithoutUser(data.url);
        }
        res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
})

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
        const { shortUrl } = req.params;

        const url = await getLongUrl(shortUrl);
        
        if (!url) {
                console.log(`No URL found for short code: ${shortUrl}`);
                return null;
        }
        return res.redirect(url);
})

export const createCustomShortUrl = wrapAsync(async (req, res) => {
        const { url, slug } = req.body
        const shortUrl = await createShortUrlServiceWithoutUser(url, slug)
        res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
})
