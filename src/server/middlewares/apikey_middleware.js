import config from '../../config';

export default (req, res, next) => {
  const auth = req.headers['x-api-key'];

  return config.security.apiKey === auth?
    next() :
    res.io({ code: 403, message: 'error.invalid_apikey' });
};