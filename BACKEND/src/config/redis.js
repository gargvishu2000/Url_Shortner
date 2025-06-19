import { Redis } from '@upstash/redis';
// Import node-fetch for Node.js environments that don't have fetch
import fetch from 'node-fetch';

// Add fetch to global scope if it doesn't exist
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

export const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export const connectRedis = async () => {
  try {
    // Upstash Redis client doesn't require an explicit connect call
    // Let's just test the connection with a simple command
    await redisClient.ping();
    console.log('Redis connection established');
    return true;
  } catch (error) {
    console.error('Redis connection failed:', error);
    return false;
  }
};
