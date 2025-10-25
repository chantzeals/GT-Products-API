import { Router } from 'express';
import {
  createPostRules,
  updateValidationRules,
  validateComment,
  validatePost
} from '../../../middleware/validator.middleware.js';

import * as postController from '../Controllers/post.controller.js';
import * as commentController from '../Controllers/comment.controller.js';
import { authMiddleware } from '../../../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createPostRules, postController.createPost);
router.put('/:id', authMiddleware, updateValidationRules, postController.updatePost);
router.patch('/:id', authMiddleware, updateValidationRules, postController.updatePartialPost);
router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostById);
router.delete('/:id', authMiddleware, postController.deletePost);

router.post('/:postId/comments', validateComment, commentController.createCommentForPost);
router.get('/:postId/comments', commentController.getCommentsByPostId);

router.put('/:id', authMiddleware, validatePost, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

export default router;
