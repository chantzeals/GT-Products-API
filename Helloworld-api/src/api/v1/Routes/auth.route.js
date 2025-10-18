import { Router } from 'express';
import * as authController from '../Controllers/auth.controller.js';
import { validateRegistration } from '../../../middleware/validator.middleware.js';

const router = Router();

router.post('/register', validateRegistration, authController.registerUser);

export default router;