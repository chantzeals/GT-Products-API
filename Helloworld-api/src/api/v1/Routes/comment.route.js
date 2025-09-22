import { Router } from 'express';
import * as commentController from '../Controllers/comment.controller.js';
import { validateComment } from '../../../middleware/validator.middleware.js';

const router = Router();  

router.get('/comments', commentController.getAllComments);

export default router;
