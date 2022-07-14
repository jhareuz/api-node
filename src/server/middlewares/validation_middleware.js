'use strict';

/****************************************************************************************************
 * Factory to create a middleware than validates against a model the request body and request query *
 *                                                                                                  *
 * @author Victor Huerta <vhuertahnz@gmail.com>                                                     *
 ****************************************************************************************************/

import http from 'http';

/**
 * @param {Object}  Validator
 */
export default(validator) => (req, res, next) => {
  // Merge query string and body
  req.data = Object.assign({}, req.params, req.body);
  // Execute validator
  const valid = validator(req.data);
  console.log(`Schema JSON - ${JSON.stringify(req.data)}`);
  const { errors } = validator;

  if(!valid)
    return res.io({ code: 422, message: 'error.verify', data: { errors } });

  return next();
};