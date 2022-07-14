'use strict';

/**
 *
 */
import config from './../../config'
import { default as AuthService } from './../../app/services/auth_service';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export default() => {
  /**
   * Authentication with User and Password
   * 
   * @author ErickCervantes <erick.cervantesacosta.5@gmail.com>
   */
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  }, (req, email, password, done) => {
    const { map } = req;
    AuthService.authenticate(email, password, req.trans, map)
    .then(user => done(null, user))
    .catch(done);
  }));

  // Authentication with JWT
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader(config.jwt.header),
    secretOrKey: config.jwt.secret,
    passReqToCallback: true,
    session: false
  }, (req, payload, done) => {
    let user
    const token = req.get(config.jwt.header);
    AuthService.findLoggedToken(token)
      .then(result => {
        if(!result) {
          done(null, false);
          return;
        }
        user = result.user
        done(null, user);
      })
      .catch(error => {
        return error;
      })
  }));

  return passport.initialize();
};