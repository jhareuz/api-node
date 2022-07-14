'use strict';

/************************************************************
 * Local Logger, this logger outputs to the console, usage: *
 *                                                          *
 * logger.trace({foo: 'bar'});                              *
 * logger.debug({foo: 'bar'});                              *
 * logger.info({foo: 'bar'});                               *
 * logger.warn({foo: 'bar'});                               *
 * logger.error({foo: 'bar'});                              *
 *                                                          *
 ************************************************************/

import config from './../config';

import Tracer from 'tracer';
import colors from 'colors';

const LEVELS = ['trace', 'debug', 'info', 'warn', 'error'];
const DEFAULT_LEVEL = 'debug';

class LocalLogger {

  /**
   * [level description]
   * @param {Object} options options for the logger
   */
  constructor({ level = 'info' }) {
    let _this = this;
    _this.options = {};
    colors.enabled = true;
    _this.options.level = level.toLowerCase();
    _this.options.level = LEVELS.indexOf(this.options.level) > -1 ? this.options.level : DEFAULT_LEVEL;
    _this.tracer = Tracer.colorConsole({ level: this.options.level });
    // Attach a partial functions for each log level
    LEVELS.forEach(l => _this[l] = _this.tracer[l]);
  }

}

/**
 * Export a new instance of logger
 */
export default new LocalLogger(config.log);