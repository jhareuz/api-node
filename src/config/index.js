'use strict';

/********************************************************************************************************************
 * File for app configuration                                                                                       *
 *                                                                                                                  *
 * This file loads all the files then add it to a JSON object, if worker.js is created in this directory, the final *
 * config object will be:                                                                                           *
 *                                                                                                                  *
 * {                                                                                                                *
 *  worker: {[worker.js content]}                                                                                   *
 * }                                                                                                                *
 *                                                                                                                  *                                                                                                               *
 * Note: Config file must have a single export and it must be the "default", example:                               *
 *  export default {...}                                                                                            *
 ********************************************************************************************************************/

import fs from 'fs';
import path from 'path';

// List files in this directory
let files = fs.readdirSync(__dirname);
// For every file found add a property to config var
let config = files.reduce(function(config, file) {
  // Prevent load this file
  if(file !== path.basename(__filename)) {
    let name = path.basename(file, path.extname(file));
    config[name] = require(path.join(__dirname, file))
      .default;
  }
  return config;
}, {});

export default config;
