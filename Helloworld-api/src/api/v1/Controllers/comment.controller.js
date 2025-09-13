import CommentService from '../Services/comment.service.js';
import { getProductById } from '../Services/post.service.js';

class CommentController {
 
  static getAll(req, res) {
    const comments = CommentService.getAll();
    res.json(comments);
  }

  static getByProductId(req, res) {
    const productId = parseInt(req.params.productId);
    const comments = CommentService.getByProductId(productId);
    res.json(comments);
  }

  static async create(req, res) {
    const productId = parseInt(req.params.productId);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    try {
      const product = await getProductById(productId);  

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const comment = CommentService.create(productId, text);
      res.status(201).json(comment); 
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default CommentController;
