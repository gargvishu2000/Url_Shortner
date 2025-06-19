import { nanoid } from 'nanoid';
import { redisClient } from '../config/redis.js';

// Base62 encoding for short URLs (a-z, A-Z, 0-9)
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length;

// Convert number to base62 string
const toBase62 = (num) => {
    let encoded = '';
    do {
        encoded = ALPHABET[num % BASE] + encoded;
        num = Math.floor(num / BASE);
    } while (num > 0);

    return encoded;
};

const isRedisConnected = () => {
    return redisClient.isReady;
}


// Pad the ID with leading characters to ensure consistent length
const padId = (id, length) => {
    return id.padStart(length, ALPHABET[0]);
};

/**
 * Generate a distributed unique ID using Redis
 * @param {number} length - The desired length of the ID
 * @returns {Promise<string>} - A unique ID
 */
export const generateDistributedId = async (length = 7) => {

    if (!isRedisConnected()) {
        throw new Error('Redis is not connected');
        return nanoid(length)
    }
    try {
        // Get a unique incrementing number from Redis
        const uniqueNum = await redisClient.incr('url:id:counter');

        // Add timestamp component for additional uniqueness
        const timestamp = Date.now();

        // Combine timestamp and counter for uniqueness
        const combinedNum = BigInt(timestamp) * BigInt(1000000) + BigInt(uniqueNum);

        // Convert to base62 for URL-friendly format
        let id = toBase62(Number(combinedNum % BigInt(Number.MAX_SAFE_INTEGER)));

        // Ensure the ID is the requested length
        if (id.length < length) {
            id = padId(id, length);
        } else if (id.length > length) {
            // If longer than requested, take the last 'length' characters
            id = id.substring(id.length - length);
        }

        return id;
    } catch (error) {
        console.error('Error generating distributed ID:', error);
        throw new Error('Failed to generate unique ID');
    }
};