export default {
  // Default strategy defines 10 request per second
  hostname: {
    tries: process.env.RATELIMIT_HOSTNAME_TRIES || 2000, // 2000 request
    time:  process.env.RATELIMIT_HOSTNAME_LIFETIME || 1000 * 1, // Per second
    minWait: process.env.RATELIMIT_HOSTNAME_MIN_WAIT || 1000 * 10, // Start in 10 seconds
    maxWait: process.env.RATELIMIT_HOSTNAME_MAX_WAIT || 1000 * 30, // End in 1 day
  },
  // Default strategy defines 10 request per second
  user: {
    tries: process.env.RATELIMIT_USER_TRIES || 2000, // 2000 request
    time:  process.env.RATELIMIT_USER_LIFETIME || 1000 * 1, // Per second
    minWait: process.env.RATELIMIT_USER_MIN_WAIT || 1000 * 10, // Start in 10 seconds
    maxWait: process.env.RATELIMIT_USER_MAX_WAIT || 1000 * 30, // End in 1 day
  }
};
