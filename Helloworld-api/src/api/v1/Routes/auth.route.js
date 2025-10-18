import { Router } from 'express';
import * as authController from '../Controllers/auth.controller.js';
import { validateRegistration, validateLogin } from '../../../middleware/validator.middleware.js';


const router = Router();

router.post('/register', validateRegistration, authController.registerUser);
router.post('/login', authController.loginUser); 

export default router;

