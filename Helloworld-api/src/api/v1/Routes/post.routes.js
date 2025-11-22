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
/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: List of posts
 *
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post retrieved
 *       404:
 *         description: Post not found
 *
 *   put:
 *     tags:
 *       - Posts
 *     summary: Update a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 *
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 */


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
