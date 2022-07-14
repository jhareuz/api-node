'use strict';

import faker from 'faker';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

import redis from './../../../src/connections/redis';
import config from './../../../src/config';
import { default as AuthService, UserNotFound, TokenNotFound } from './../../../src/app/services/auth_service';
import CryptService from './../../../src/app/services/crypt_service';
import User from './../../../src/app/model/user';

Promise.promisifyAll(jwt);

describe.only('Auth', () => {

  describe('#updatePassword', () => {

    let recoveryToken, validEmail = faker.internet.email();

    before(() => {
      return(new User({ email: validEmail }))
        .save()
        .then(() => AuthService.recoverPassword(validEmail, faker.internet.url()))
        .then(token => recoveryToken = token);
    });

    it('should be rejected with NoTokenFound', () => {
      const promise = AuthService.resetPassword(faker.random.uuid(), faker.random.word());
      promise.should.be.a.Promise();
      promise.should.be.rejectedWith(TokenNotFound);
    });

    it('should be fulfilled with a password recovery token', () => {
      const newPassword = faker.random.word();
      const promise = AuthService.resetPassword(recoveryToken, newPassword);
      promise.should.be.a.fulfilled();

      return promise.then(result => {
        const cryptPromise = CryptService.verify(newPassword, result.password);
        cryptPromise.should.be.a.Promise();
        cryptPromise.should.be.fulfilledWith(true);
      });
    });

  });

  describe.only('#login', () => {

    it('should generate a new authentication', done => {
      let recoveryToken, validEmail = faker.internet.email();
      const promise = AuthService.authenticate('ivan@mail.com', 'simplex');
      promise.should.be.a.Promise();
      promise.should.be.a.fulfilled();
      promise
        .then(result => {
          console.log(result);
          done();
        })
        .catch(done);
    });

    
  

  });
  
});
