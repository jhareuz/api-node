'use strict';

export default {
  /**
   * Logging level, posible values:
   *
   * 'trace', 'debug', 'info', 'warn', 'error'
   *
   * @type {String}
   */
  level: process.env.LOG_LEVEL || 'debug',

};