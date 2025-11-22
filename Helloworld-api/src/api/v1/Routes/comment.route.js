import { Router } from 'express';
import { getAllComments, createCommentForPost } from '../Controllers/comment.controller.js';
import { authMiddleware } from '../../../middleware/auth.middleware.js';

const router = Router();  

/**
 * @openapi
 * /api/v1/posts/{postId}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments for a post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments
 *
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a comment for a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
 */

router.post('/:postId/comments', authMiddleware, createCommentForPost);
router.get('/', getAllComments);

export default router;
