'use stric';

import { default as handler, methods } from '../handlers/auth_handler';
import { Router } from 'express';
import { validToken, validRole } from '../middlewares/authentication';

const router = Router();


router.post('/login',  handler[methods.LOGIN]);
router.get('/logout',  handler[methods.LOGOUT]);
// router.put('/forgot_password', handler[methods.FORGOT_PASSWORD]);


export default router;