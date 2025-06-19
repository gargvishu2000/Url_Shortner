import { createClient } from 'redis';

// Use the REDIS_URL environment variable with a fallback
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectionStrategy: (retries) => {
            const delay = Math.min(Math.pow(2, retries) * 100, 10000);
            return delay;
        }
    }
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log(`Redis connected to ${process.env.REDIS_URL || 'redis://localhost:6379'}`);
        return true;
    } catch (error) {
        console.log('Redis connection failed', error);
        return false;
    }
};

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export { redisClient, connectRedis };