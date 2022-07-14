'use strict';

export default {
    mongo:  {
        url: process.env.MONGODB_URI_AUTH || 'mongodb://127.0.0.1:27017/ms_auth',
        debug: process.env.MONGO_DEBUG && process.env.MONGO_DEBUG === 'true'
    },
    redis: {
        url: process.env.REDISCLOUD_URL || 'redis://localhost:6379'
    },
    redisRateLimit: {
        url: process.env.REDIS_RATELIMIT_URL || 'redis://localhost:6379/1',
    },    
};