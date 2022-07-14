'use strict';

import { default as handler, methods } from '../handlers/ping_handler';

import { Router } from 'express';

const router = Router();

/**
 * Route to map:
 *  get: /welcome/
 */
router.get('/ping', handler[methods.GET_INDEX]);

export default router;
