'use strict'

import ping from './routes/ping';
import auth from './routes/auth'
import users from './routes/users'
import { Router } from 'express';

const router = Router();

/**
 * Route to map:
 *  get: /welcome/
 */
router.use('/', ping);
router.use('/', auth);
router.use('/', users);


export default router;