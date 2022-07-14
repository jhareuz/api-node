'use strict';

import http from 'http';
import config from './../../config';
import logger from './../../log';

/**
 * Maps the http codes vs the sended status from the controller
 *
 * @param  {Number} [status=200] response status
 * @return {Object}              result object with httpCode property and message
 */
const httpCodes = (code = 200) => {
  code = parseInt(code) || 500;

  let result = {
    status: 'error',
    httpCode: code,
    message: http.STATUS_CODES[code]
  };

  if(code >= 200 && code < 300)
    result.status = 'success';

  return result;
};

/**
 * Method than resolves the response
 *
 * @param {Object} req           http request object
 * @param {Object} res           http response object
 * @param {Number} [status=200]  response status
 * @param {Object | Array} data  response data
 */
const IO = (req, res, { code = 200, message, data }) => {
  const { map } = req;
  //logger.local.info(map,`Sending response status: ${code}, message: ${message}, data: ${JSON.stringify(data, null, 2)}`);
  //logger.remote.info(map,`Sending response status: ${code}, message: ${message}, data: ${JSON.stringify(data, null, 2)}`);

  let result = httpCodes(code);

  let response = {
    object: req.serviceMethodName || config.service.msAuth.name,
    code: result.httpCode,
    status: result.status,
    message: message || result.message,
    request: Date.now(),
    url: req.originalUrl
  };

  if(data) response = Object.assign(response, data);

  res.statusMessage = result.message;
  res
    .status(result.httpCode, result.message)
    .json(response);
};

/**
 * Add the IO method to the response object
 */
export default(req, res, next) => {
  res.io = IO.bind(IO, req, res);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Cache-Control");
  next();
};
