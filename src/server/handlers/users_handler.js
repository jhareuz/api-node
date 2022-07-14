'use stric';

import UserService from './../../app/services/users_service';
import {get } from 'lodash';

export const methods = {
    REGISTER: 'register',
    INDEX: 'index',
    SHOW: 'show',
    UPDATE_PASSWORD: 'updatePassword',
    UPDATE: 'update'
};

/**
 * Handler methods
 *
 * @type {Object}
 */
export default {

    [methods.INDEX]: (req, res, next) => {
        UserService.get_users()
            .then((user)=> {
                return res.io({
                    code: 200,
                    message: 'success.get_users',
                    data: {user}
                });
            })
            .catch(err => {
                return res.io({
                    code: err.code || 422,
                    message: err.message || 'error.get_users'
                }); 
            });       
    },
    

    [methods.SHOW]: (req, res, next) => {
        let id = get(req, 'params.id');
        console.log(id)
        UserService.get_user(id)
            .then((user)=> {
                return res.io({
                    code: 200,
                    message: 'success.get_users',
                    data: {user}
                });
            })
            .catch(err => {
                return res.io({
                    code: err.code || 422,
                    message: err.message || 'error.get_users'
                }); 
            });       
    },


    [methods.REGISTER]: (req, res, next) => {
        const { map } = req;
        UserService.create(req.data, map)
        .then(user => user)
        .then(()=> {
            return res.io({
                code: 200,
                message: 'success.create'
            });
        })
        .catch(err => {
             console.log(JSON.stringify(err,null,2));
            // console.log(err.message);
            return res.io({
              code: err.code || 422,
              message: err.message || 'error.create'
            }); 
          });       
    },

    [methods.UPDATE_PASSWORD]: (req, res, next) => {
        const { map } = req;
        let id = get(req, 'params.id');
        UserService.updatePassword(id,req.data.password,req.data.passwordConfirm)
            .then((user)=> {
                return res.io({
                    code: 200,
                    message: 'success.update_password',
                    data: {user}
                });
            })
            .catch(err => {
                console.log(JSON.stringify(err,null,2));
                return res.io({
                    code: err.code || 422,
                    message: err.message || 'error.get_users'
                }); 
            });       
    },

    [methods.UPDATE]: (req, res, next) => {
        const { map } = req;
        let id = get(req, 'params.id');
        UserService.update(id,req.body)
            .then((user)=> {
                return res.io({
                    code: 200,
                    message: 'success.update',
                    data: {user}
                });
            })
            .catch(err => {
                return res.io({
                    code: err.code || 422,
                    message: err.message || 'error.get_users'
                }); 
            });       
    }
};