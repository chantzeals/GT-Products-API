import express from 'express';
import CommentController from '../Controllers/comment.controller.js'; 

const router = express.Router();

router.get('/comments', CommentController.getAll);
router.get('/posts/:postId/comments', CommentController.getByPostId);
router.post('/posts/:postId/comments', CommentController.create);

export default router;
