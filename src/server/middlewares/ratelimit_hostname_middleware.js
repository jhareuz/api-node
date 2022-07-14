'use strict';

import DlimitsMiddleware from './../../lib/dlimits/dlimits-express-middleware';
import redis from './../../connections/redis_ratelimit';
import config from './../../config';

let keyHandler = (req, res, cb) => {
  cb(null, req.connection.remoteAddress);
};

let limitHandler = (req, res) => {

  return res.io({
    status: 'error',
    code: 429,
    message: `API rate limit exceeded for ${req.connection.remoteAddress}`,
    data: null
  });
};

let middleware = DlimitsMiddleware(
  config.ratelimit.hostname.tries,
  config.ratelimit.hostname.time,
  redis,
  keyHandler,
  limitHandler, {
    minWait: config.ratelimit.hostname.minWait,
    maxWait: config.ratelimit.hostname.maxWait,
  });

export default middleware;
