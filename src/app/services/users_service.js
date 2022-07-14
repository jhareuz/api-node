'use strict';

/************************************************
 * User methods                                 *
 *                                              *
 * @author ErickCervantes <erick.cervantesacosta.5@gmail.com>             *
 ************************************************/

import User from '../model/user';
import Promise from 'bluebird';
import { isEmpty } from 'lodash';

/**
 * Custom error throwed by create user service when user isn`t insert row
 *
 * @class ErrorInsertUser
 * @extends {Error}
 */
class ErrorInsertUser extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}

/**
 * Custom error throwed by create user service when user isn`t update row
 *
 * @class ErrorUpdateUser
 * @extends {Error}
 */
class ErrorUpdateUser extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}

/**
 * Custom error throwed by find role default info service
 *
 * @class ErrorFindRoleDefault
 * @extends {Error}
 */
class ErrorFindRoleDefault extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 401;
    }
}

/**
 * Custom error throwed by find user
 *
 * @class ErrorFindUser
 * @extends {Error}
 */
class ErrorFindUser extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.code = 404;
    }
}

const service = {

/**
   * list info of user
   *
   *
   * @param   {obejct}  Info user
   * @returns {Promise} Promise than resolves if the refernece is valid
   */
 get_users(){
    return User.find( { status: 'active' } )
        .then((result)=>{
            return result;
        });
  },

/**
   * show info of user
   *
   *
   * @param   {obejct}  Info user
   * @returns {Promise} Promise than resolves if the refernece is valid
   */
 get_user(id){
    return User.find( { _id: id, status: 'active' } )
        .then((result)=>{
            if(result.length == 0)
              return Promise.reject(new ErrorFindUser('error.user_not_found'));
            return result[0];
        })
        .catch(error => {
            return Promise.reject(new ErrorFindUser(error.message));
        });
  },

/**
   * Create an user based on password and email
   *
   *
   * @param   {String}  email     User email
   * @param   {String}  password  User password
   * @returns {Promise} Promise than resolves if the user is created
   */
  create(userAcc, map=''){
    let user = new User({
      email: userAcc.email,
      password: userAcc.password,
      phone_number: userAcc.phoneNumber,
      lada: userAcc.lada,
      change_password: false,
      status: userAcc.status,
      country: userAcc.country,
      last_name: userAcc.lastName,
      first_name: userAcc.firstName,
      roles: userAcc.roles
    });

    return user.save()
      .then((result)=>{
          return result;
      })
      .catch(error => {
          return Promise.reject(new ErrorInsertUser(error.message));
      });
  },

  /**
   * Update user based on token user
   *
   *
   * @param   {String}  password         User password
   * @param   {String}  confirmPassword  User password
   * @returns {Promise} Promise than resolves if the user is updated
   */
    updatePassword(id,newPassword,confirmPassword){
        if (newPassword != confirmPassword)
            return Promise.reject(new ErrorUpdateUser('error.password_dont_match'))

        let userData = {
            $set: {
                password: newPassword,
                change_password: false
            }
        };
        const options = { new: true };
        return User.findByIdAndUpdate({ _id: id, change_password: true }, userData,options)
            .then(user => {
                if(isEmpty(user))
                    return Promise.reject(new ErrorUpdateUser('error.user_not_found'));
                return user
            })
            .catch(error => {
                return Promise.reject(new ErrorUpdateUser(error.message));
            });

    },

    /**
   * Update user based id
   *
   *
   * @param   {String}  args User args
   * @param   {String}  id   ID User
   * @returns {Promise} Promise than resolves if the user is updated
   */
     update(id,args){

        let userData = {
            $set: args
        };
        const options = { new: true };
        return User.findByIdAndUpdate({ _id: id, status: 'active' }, userData,options)
            .then(user => {
                if(isEmpty(user))
                    return Promise.reject(new ErrorUpdateUser('error.user_not_found'));
                return user
            })
            .catch(error => {
                return Promise.reject(new ErrorUpdateUser(error.message));
            });

    },

    /**
     * Delete user based on id user
     *
     *
     * @param   {String}  id     User Id
     * @returns {Promise} Promise than resolves if the user is delete
     */
    deleteUser(userId, map = '') {
        return User.findAndUpdate({ _id: userId }, { status: 'deleted' }, { new: true })
            .then(user => user)
            .catch(err => {
                //console.log(err);
                return Promise.reject(new ErrorUpdateUser('error.update_user'));
            });
    },

}

const instance = Object.create(service);

export {
    instance as
    default,
    ErrorInsertUser,
    ErrorUpdateUser,
    ErrorFindRoleDefault
};
