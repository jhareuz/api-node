'use strict';

import fs from 'fs';
import path from 'path';

// List files in this directory
let files = fs.readdirSync(__dirname);
// For every file found add a property to config var
let models = files.reduce(function(models, file) {
  // Prevent load this file
  if(file !== path.basename(__filename)) {
    let name = path.basename(file, path.extname(file));
    models[name] = require(path.join(__dirname, file)).default;
  }
  return models;
}, {});

export default models;