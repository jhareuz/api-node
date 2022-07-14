'use strict';

export default {
  header: 'x-auth-token',
  secret: process.env.JWT_SECRET || 'tddDjg5zse$kpDndyecykuwc^4i8tprecgzhvn^kwyjxqrwgsXet^YHngjqufka,',
  auth: {
    expiresIn: parseInt(process.env.JWT_AUTH_EXPIRESIN) || 60 * 5 //  5 min for session
  },
  recovery: {
    expiresIn: process.env.JWT_RECOVERY_EXPIRESIN || 60 * 60 * 3  // 3 hours in seconds
  },
  refresh: {
    expiresIn: parseInt(process.env.JWT_AUTH_EXPIRESIN) || 60 * 60 * 24 * 3 // 3 days
  },
  active: {
    expiresIn: parseInt(process.env.JWT_ACTIVE) || 60 * 60 * 24 * 3 // 3 days 
  },
  logged: {
    expiresIn: parseInt(process.env.JWT_ACTIVE) || 60 * 60 * 12 // 12 hours
  }
  
};