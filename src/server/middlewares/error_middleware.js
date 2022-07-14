'use strict';

import logger from './../../log';
import http from 'http';
import R from 'ramda'; 

/**
 * Labda function to pick just kind, path and message props from errors
 * @type {[type]}
 */
const mapErrorProps = R.map(err => {
  let picked = R.pick(['type', 'path'])(err);
  picked.key = err.context.key;
  return picked;
});

/**
 * Function to handle unknow errors
 * @param  {Object} req HttpRequest object
 * @param  {Object} res HttpResponse object
 */
const handleUnknowErrors = (req, res) => res.io({ code: 500 });

/**
 * Function to handle validation errors
 * @param  {Object} req HttpRequest object
 * @param  {Object} res HttpResponse object
 */
const handleValidationErrors = (err, req, res) => {
  const errors = mapErrorProps(err.details);
  return res.io({ code: 422, data: { errors } });
};

/**
 * Function to handle body request errors
 * @param  {Object} req HttpRequest object
 * @param  {Object} res HttpResponse object
 */
const handleParseBodyError = (req, res) => res.io({ code: 422, data: { detail: "Malformed body" } });

/**
 * Error handler middleare
 */
export default(err, req, res, next) => {
  console.log('err: ', err)
  switch(true) {
    case err.name === 'ValidationError':
      handleValidationErrors(err, req, res);
      break;
    case err instanceof SyntaxError:
      handleParseBodyError(req, res);
      break;
    default:
      logger.info('Unknow error', err.message);
      handleUnknowErrors(req, res);
      break;
  }
};
