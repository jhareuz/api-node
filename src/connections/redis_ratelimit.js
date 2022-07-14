'use strict';

import config from './../config';
import redis from 'redis';
import Promise from 'bluebird';

Promise.promisifyAll(redis);

const client = redis.createClient({url: config.connections.redisRateLimit.url})

const connection = new Promise((resolve, reject) => {
  client.once('ready', resolve);
  client.once('error', reject);
});

export {client as default, connection};