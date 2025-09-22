let comments = [];
let nextId = 1;

class CommentService {
  static getAll() {
    return comments;
  }

  static getByPostId(postId) {
    return comments.filter(comment => comment.postId === postId);
  }

  static create(postId, text) {
    const comment = {
      id: nextId++,
      text,
      postId
    };
    comments.push(comment);
    return comment;
  }
}

export default CommentService;
