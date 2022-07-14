'use strict';

import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

Promise.promisifyAll(bcrypt);

const saltRounds = 10;

export default {
  encrypt: (password) => bcrypt.hash(password, saltRounds),
  verify: (password, hashed) => bcrypt.compare(password, hashed)
};