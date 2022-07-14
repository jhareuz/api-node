'use strict';

import { default as handler, methods } from '../handlers/users_handler';
import validation from './../middlewares/validation_middleware';
import ValidationService from './../../app/services/validation_service';
import jwt from './../middlewares/passport_jwt_middleware';

import { Router } from 'express';

const router = Router();


router.post(
    '/users',
    validation(ValidationService.user.create),
    handler[methods.REGISTER]
);

router.get(
    '/users',
    jwt,
    handler[methods.INDEX]
);

router.get(
    '/users/:id',
    jwt,
    handler[methods.SHOW]
);

router.put(
    '/users/:id',
    validation(ValidationService.user.update),
    jwt,
    handler[methods.UPDATE]
);

router.put(
    '/users/:id/password',
    validation(ValidationService.user.update_password),
    jwt,
    handler[methods.UPDATE]
);

export default router;
