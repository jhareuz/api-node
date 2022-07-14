'use stric';

import { default as AuthService, UserNotFound, PasswordNotMatch, UserDeactivated } from './../../app/services/auth_service';

/**
 * Constant to map methods names and make it more clear
 *
 * @type {Object}
 */
export const methods = {
  LOGIN: 'login',
  VERIFY_TOKEN: 'verifyToken',
  LOGOUT: 'logout'
};

/**
 * Handlers methods
 *
 * @type {Object}
 */
export default {
  /**
   * Login endpoint method
   *
   * @param {Object}   req    HttpRequest object
   * @param {Object}   res    HttpResponse object
   * @param {Function} next   Callback function to chain objects
   */
  [methods.LOGIN]: (req, res, next) => {
    const { map } = req;
    return AuthService.authenticate(req.body, map)
      .then(result => {
        res.io({
          code: 200,
          data: {
            message: 'success.login',
            data: {
              token: result.shift(),
              user: result.shift()
            }
          }
        });
      })
      .catch(err => {
          const { message } = err;
          let code = 404;
          if(err instanceof UserNotFound || err instanceof PasswordNotMatch)
            code = 401;
          if(err instanceof UserDeactivated)
            code = 403;
          return res.io({ code, data: { message } });
                
      });           
  },

  [methods.VERIFY_TOKEN]: (req, res, next) =>{
    return res.io({
      code: 200,
      data: {
        message: 'success.verify_token',
        data:{
          user: req.user
        }
      }
    })
  },

  [methods.LOGOUT]: (req, res, next) =>{
    AuthService.logout(req.headers['x-auth-token'])
    .then(result => res.io({ code: 200, message: 'success.logout' }))
    .catch(err => {
        return res.io({ code: 422, message: 'error.logout' });
    });
  }

};