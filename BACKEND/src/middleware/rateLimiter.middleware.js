import { redisClient } from '../config/redis.js';

/**
 * Redis-based rate limiter middleware
 * Limits requests based on IP address
 * 
 * @param {Object} options - Rate limiter options
 * @param {number} options.maxRequests - Maximum number of requests allowed in the time window
 * @param {number} options.windowSizeInSeconds - Time window in seconds
 * @returns {Function} Express middleware function
 */
export const rateLimiter = (options = {}) => {
  // Use environment variables with fallbacks
  const defaultMaxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100;
  const defaultWindowSize = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS, 10) || 60;
  
  const maxRequests = options.maxRequests || defaultMaxRequests;
  const windowSize = options.windowSizeInSeconds || defaultWindowSize;
  
  return async (req, res, next) => {
    
    try {
      const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const key = `ratelimit:${ip}`;
      
      // Get the current count for this IP
      let count = await redisClient.get(key);
      
      // If this is the first request, set the initial count and expiry
      if (count === null) {
        await redisClient.set(key, 1, { EX: windowSize });
        return next();
      }
      
      // Increment the counter
      count = parseInt(count, 10) + 1;
      
      // If under the limit, update the count and proceed
      if (count <= maxRequests) {
        await redisClient.set(key, count, { KEEPTTL: true });
        return next();
      }
      
      // Get the TTL (time-to-live) for the key to tell the client when they can retry
      const ttl = await redisClient.ttl(key);
      
      // Rate limit exceeded
      return res.status(429).json({
        error: 'Too many requests',
        message: `Rate limit exceeded. Try again in ${ttl} seconds.`,
        retryAfter: ttl
      });
      
    } catch (error) {
      console.error('Rate limiter error:', error);
      // If there's an error with rate limiting, allow the request to proceed
      return next();
    }
  };
};

/**
 * Stricter rate limiter for sensitive operations like URL creation
 */
export const createUrlRateLimiter = rateLimiter({
  maxRequests: parseInt(process.env.CREATE_RATE_LIMIT_MAX, 10) || 10,
  windowSizeInSeconds: parseInt(process.env.CREATE_RATE_LIMIT_WINDOW, 10) || 60
});

/**
 * More lenient rate limiter for URL redirects
 */
export const redirectRateLimiter = rateLimiter({
  // Use default values from environment variables
});