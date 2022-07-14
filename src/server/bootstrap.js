'use strict';

import models from './../app/model';

import mongoose from './../connections/mongoose';
import { connection as redis } from './../connections/redis';
import { connection as redisRateLimit } from './../connections/redis_ratelimit';

export default() => Promise.all([
  mongoose,
  models,
  redis,
  redisRateLimit
]);