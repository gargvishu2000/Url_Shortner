
// Dao - data access object
// If in case in future we have change the DB then we need to only change this piece of code.
import urlSchema from "../models/shortUrl.model.js";
import { redisClient} from '../config/redis.js';

const URL_CACHE_TTL = 86400; // 1 day in seconds

export const saveShrotUrl = async (longUrl, shortUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.user = userId;
        }
        await newUrl.save()

        if(redisClient.isReady){
            try {
                await redisClient.set(`url:${shortUrl}`, longUrl, {
                    EX: URL_CACHE_TTL
                })
                if(userId){
                    await redisClient.sAdd(`user:${userId}:urls`, shortUrl);
                }
            } catch (error) {
                console.log("Redis caching error: ", error)
            }
        }
        
    } catch (error) {
        throw error;
    }
}

export const getCustomUrl = async(slug=null)=>{
    return await urlSchema.findOne({short_url: slug});
}

export const getLongUrl = async(shortUrl) => {
    try {
        if(redisClient.isReady){
            try {
                const cachedUrl = await redisClient.get(`url:${shortUrl}`);
                if(cachedUrl){
                    return cachedUrl; // Simply return the cached URL without stats
                }
            } catch (error) {
                console.log('Redis retrieval error: ', error);
            }
        }
        
        // If not in Redis or Redis is not connected, get from MongoDB
        const urlData = await urlSchema.findOne({ short_url: shortUrl });
        if (!urlData) return null;

        // Cache in Redis for future requests if Redis is connected
        if (redisClient.isReady) {
            try {
                await redisClient.set(`url:${shortUrl}`, urlData.full_url, {
                    EX: URL_CACHE_TTL
                });
            } catch (error) {
                console.log('Redis caching error: ', error);
            }
        }
        
        return urlData.full_url;
    } catch (error) {
        console.log('Error fetching long URL: ', error);
        return error;
    }
}
