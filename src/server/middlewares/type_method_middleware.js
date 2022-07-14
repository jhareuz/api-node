'use strict';

import {isEmpty} from 'lodash';
/****************************************************************************************************
 * Factory to create type method a middleware  *
 *
 * @author ErickCervantes  <erick.cervantesacosta.5@gmail.com>
 ****************************************************************************************************/

import http from 'http';

/**
 * @param {Object}  Validator
 */
export default (typeMethod) => (req, res, next) => {
  if(isEmpty(typeMethod)) return res.io({code: 403});
  req.serviceMethodName=typeMethod;
  next();
};