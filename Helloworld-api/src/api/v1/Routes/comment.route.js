import { Router } from 'express';
import * as commentController from '../Controllers/comment.controller.js';
import { createCommentRules, validate } from '../../../middleware/validator.middleware.js';

const router = Router();

router.post('/comments', createCommentRules, validate, commentController.createComment);

export default router;
