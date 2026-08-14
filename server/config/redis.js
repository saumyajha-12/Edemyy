import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis when this module is imported
(async () => {
    try {
        if (!process.env.REDIS_URL) {
            console.log("Redis URL not found in environment variables. Caching is disabled.");
            return;
        }
        await redisClient.connect();
        console.log("Connected to Redis successfully");
    } catch (error) {
        console.error("Failed to connect to Redis:", error.message);
    }
})();

export default redisClient;
