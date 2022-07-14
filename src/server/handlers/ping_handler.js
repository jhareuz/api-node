'use strict';

/**
 * Constant to map methods names and make it more clear
 *
 * @type {Object}
 */
export const methods = {
  GET_INDEX: 'getIndex'
};

/**
 * Handler methods
 *
 * @type {Object}
 */
export default {
  [methods.GET_INDEX]: (req, res, next) => {
    return res.io({ code: 200, data:  { pong: 'pong' } });
  }
};
