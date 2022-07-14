'use strict';

import config from '../../config';

import redis from './../../connections/redis';
import CryptService from './crypt_service';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import User from '../model/user';
import { isEmpty } from 'lodash';

Promise.promisifyAll(jwt);

/**
 * Custom error throwed by auth service when user isn`t found
 *
 * @class UserNotFound
 * @extends {Error}
 */
class UserNotFound extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}

/**
 * Custom error throwed by auth service when password user not match
 *
 * @class PasswordNotMatch
 * @extends {Error}
 */
class PasswordNotMatch extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}

/**
 * Custom error throwed by auth service when user isn`t active
 *
 * @class UserDeactivated
 * @extends {Error}
 */
class UserDeactivated extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}

/**
 * Custom error throwed by auth service when code not found
 *
 * @class CodeNotFound
 * @extends {Error}
 */
class CodeNotFound extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 403;
    }
}

/**
 * Custom error throwed by auth service when a token is not found
 *
 * @class UserDeactivated
 * @extends {Error}
 */
class TokenNotFound extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}
/**
 * Custom error throwed by Request Auth service
 *
 * @class ErrorServiceAuth
 * @extends {Error}
 */
class ErrorServiceAuth extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}

const service = {

 /**
  * Authenticate an user based on password and email,
  * also verify if the user is activated.
  *
  * @param   {String}  email     User email
  * @param   {String}  password  User password
  * @returns {Promise} Promise than resolves if the user is authenticated
  */
 authenticate(args, map) {
   const _this = this;

   return User
     .findOne({ "$or": [ { email: args.email }, { phone_number: args.phoneNumber} ] })
     .lean()
     // Verify user existence
     .then(user => {
       return user ? user : Promise.reject(new UserNotFound('error.user_not_found'))
      })
     // Verify user password
     .then(user => Promise.all([user, CryptService.verify(args.password, user.password || '')]))
     .then(([user, res]) => res ? user : Promise.reject(new PasswordNotMatch('error.bad_credentials')))
     .then(user => (user.status == 'active') ? user : Promise.reject(new UserDeactivated('error.user_deactivated')))
     .then(user => Promise.all([_this.assignLoggedToken(user),user]));
 },

 /**
  * Generate the recovery token and save it with the user
  *
  * @param {String} userId The user id
  * @returns Promise than resolves when the user was saved
  */
  assignLoggedToken(user) {
   let token;
   const expiresIn = config.jwt['auth'].expiresIn; // 24 hours
   return this
    .generateAuthToken({ user: user._id.toString() })
    .then(loggedToken => token = loggedToken)
    .then(() => redis.setAsync(`auth:logged:${token}`, JSON.stringify({Token: token,Uuid: user._id, TimeOut: expiresIn})))
    .then(() => redis.expireAsync(`auth:logged:${token}`, expiresIn))
    .then(() => redis.setAsync(`auth:user:${user._id.toString()}`, JSON.stringify({ user })))
    .then(() => redis.expireAsync(`auth:user:${user._id.toString()}`, expiresIn))
    .then(() => token);
  },

  /**
  * Returns an authentication token, with the specified payload
  *
  * @param   {Object} payload  Payload object
  * @returns {Promise} Promise than resolves in the generated token
  */
  generateAuthToken(payload = {}) {
    return this.generateToken('logged', payload);
  },

  /**
   * Returns a string jwt token with the specified type options
   *
   * @param   {String}  type     Token type
   * @param   {Object}  payload  Payload object
   * @returns {Promise} Promise than resolves in the generated token
   */
  generateToken(type, payload = {}) {
    return jwt.signAsync(payload, config.jwt.secret, config.jwt[type]);
  },

 /**
  * Logout token session with the specified token
  *
  * @param   {String} token  token param
  * @returns {Promise} Promise than resolves in the logout token
  */
 logout(token) {
   if(isEmpty(token)) {
     return Promise.reject(new TokenNotFound('error.token_is_required'));
   }

   return this.findLoggedToken(token)
     .then(user => {
       return user ? (redis.delAsync(`auth:user:${user._id}`), user) : Promise.reject(new UserNotFound())
      })
     .then(user => user ? (redis.delAsync(`auth:logged:${token}`), user) : Promise.reject(new TokenNotFound()));
 },

 findLoggedToken(token) {
  return redis
    .getAsync(`auth:logged:${token}`)
      .then(data => {
        console.log(data)
        let info = JSON.parse(data)
        if(!info)
          return Promise.resolve(null)
        let id = info.Uuid
        return redis.getAsync(`auth:user:${id}`)
      })
      .then(JSON.parse)
      .then(json => {
        return this.refreshToken(json.user._id, token)
      })
      .then(JSON.parse)
      .then(json => json ? json : Promise.resolve(null))
      .catch(error => {
        return Promise.resolve(error);
      })
 },

 /**
  * Create refresh token
  * 
  * @param {any} id 
  * @param {any} token 
  * @returns 
  */
  refreshToken(id, token) {
    const expiresIn = config.jwt['auth'].expiresIn; // 24 hours
    return redis.delAsync(`auth:logged:${token}`)
      .then(() => redis.setAsync(`auth:logged:${token}`, JSON.stringify({"Token":token,"Uuid":id,"TimeOut":expiresIn})))
      .then(() => redis.expireAsync(`auth:logged:${token}`, expiresIn))
      .then(() => redis.getAsync(`auth:user:${id}`))
      .then((user) => {redis.delAsync(`auth:user:${id}`); return user;})
      .then((user) => {redis.setAsync(`auth:user:${id}`, user); return user})
      .then((user) => {redis.expireAsync(`auth:user:${id}`, expiresIn); return user})
      //.then(() => token);
  },

}

const instance = Object.create(service);

export {
  instance as
  default,
  UserNotFound,
  PasswordNotMatch,
  UserDeactivated,
  TokenNotFound
};