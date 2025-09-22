import CommentService from '../Services/comment.service.js';
import { getPostById } from '../Services/post.service.js';

class CommentController {

  static getAll(req, res) {
    const comments = CommentService.getAll();
    res.json(comments);
  }

  static getByPostId(req, res) {
    const postId = parseInt(req.params.postId);
    const comments = CommentService.getByPostId(postId);
    res.json(comments);
  }

  static async create(req, res) {
    const postId = parseInt(req.params.postId);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    try {
      const post = await getPostById(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const comment = CommentService.create(postId, text);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default CommentController;
