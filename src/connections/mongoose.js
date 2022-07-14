'use strict';

/**************************************************************************************************
 * Connect to mongodb using mongoose, it export a promise to handle the connected and error event *
 *                                                                                                *                                            *
 **************************************************************************************************/

import config from './../config';

import mongoose from 'mongoose';
import Promise from 'bluebird';

export default new Promise((resolve, reject) => {
  mongoose.Promise = Promise;
  console.log(config.connections.mongo.url);
  mongoose.connect(config.connections.mongo.url, { useNewUrlParser: true });
  mongoose.set('debug', config.connections.mongo.debug);
  mongoose.connection.once('error', reject);
  mongoose.connection.once('connected', resolve);
});