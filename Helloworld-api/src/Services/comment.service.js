let comments = [];
let nextId = 1;

class CommentService {
  static getAll() {
    return comments;
  }

  static getByProductId(productId) {
    return comments.filter(comment => comment.productId === productId);
  }

  static create(productId, text) {
    const comment = {
      id: nextId++,
      text,
      productId
    };
    comments.push(comment);
    return comment;
  }
}

export default CommentService;
