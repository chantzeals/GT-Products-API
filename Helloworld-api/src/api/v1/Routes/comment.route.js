import express from 'express';
import CommentController from '../Controllers/comment.controller.js'; 

const router = express.Router();

router.get('/comments', CommentController.getAll);
router.get('/products/:productId/comments', CommentController.getByProductId);
router.post('/products/:productId/comments', CommentController.create);

export default router;
