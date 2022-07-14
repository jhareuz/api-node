'use strict';

/************************************************
 * Mongoose model                               *
 *                                              *
 * @author ErickCervantes <erick.cervantesacosta.5@gmail.com> *
 ************************************************
 */

import CryptService from './../services/crypt_service';

import {get, set } from 'lodash';
import { default as mongoose, Schema } from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    lada: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    forgot_password: {
        type: Boolean,
        default: false
    },
    roles: {
        type: Array
    },
    extras:{
        type: Array
    },
    change_password:{
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active',
        required: true
    },
    created: {
        type: Number,
        default: (new Date()).getTime()
    },
    updated: {
        type: Number,
        default: (new Date()).getTime()
    }
}, { timestamps: false, collection: 'users' });

UserSchema.pre('save', function(next) {

    if (!this.password) return next();

    return new Promise(resolve => {
            resolve(CryptService.encrypt(this.password));
        })
        .then(encrypted => {
            this.password = encrypted;
            next();
        });
});

UserSchema.pre('update', function(next) {
    const path = '_update.$set.password';
    const password = get(this, path);
    if (password) {

        CryptService
            .encrypt(password)
            .then(encrypted => {
                set(this, path, encrypted);
                next();
            });
    } else {
        next();
    }
});

UserSchema.pre('findOneAndUpdate', function(next) {
    const path = '_update.$set.password';
    const password = get(this, path);
    if (password) {

        CryptService
            .encrypt(password)
            .then(encrypted => {
                set(this, path, encrypted);
                next();
            });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

/**
 * Export the schema and model
 */
export { UserSchema, User as default };