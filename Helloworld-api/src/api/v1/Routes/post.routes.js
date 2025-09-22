import { Router } from 'express';
import {
  createPostRules,
  updateValidationRules,
  validateComment
} from '../../../middleware/validator.middleware.js';

import * as postController from '../Controllers/post.controller.js';
import * as commentController from '../Controllers/comment.controller.js';

const router = Router();

router.post('/', createPostRules, postController.createPost);
router.put('/:id', updateValidationRules, postController.updatePost);
router.patch('/:id', updateValidationRules, postController.updatePartialPost);
router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostById);
router.delete('/:id', postController.deletePost);

router.post('/:postId/comments', validateComment, commentController.createCommentForPost);
router.get('/:postId/comments', commentController.getCommentsByPostId);

export default router;
