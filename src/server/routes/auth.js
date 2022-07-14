'use stric';


import { Router } from 'express';

import jwt from './../middlewares/passport_jwt_middleware';
import validation from './../middlewares/validation_middleware';
import TypeService from './../middlewares/type_method_middleware';
import ValidationService from './../../app/services/validation_service';
import { default as handler, methods } from './../handlers/auth_handler';

const router = Router();
/**
 * Login endpoint
 */
router.post(
  '/auth/login',
  TypeService('auth.login'),
  validation(ValidationService.auth.login),
  handler[methods.LOGIN]
);

/**
 * Verify token endpoint
 */
router.get(
  '/auth/verify_token',
  TypeService('auth.verify_token'),
  jwt,
  handler[methods.VERIFY_TOKEN]
);

/**
 * Logout endpoint
 */
router.get(
  '/auth/logout',
  TypeService('auth.logout'),
  jwt,
  handler[methods.LOGOUT]
);

export default router;
