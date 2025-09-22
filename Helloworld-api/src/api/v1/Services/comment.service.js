import pool from '../../../config/db.js';
import { ApiError } from '../../../utils/ApiError.js';

export async function getAllComments() {
  const [rows] = await pool.query('SELECT * FROM comments');
  return rows;
}

export async function getCommentsByPostId(postId) {
  const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
  return rows;
}

export const createComment = async ({ postId, authorId, text }) => {
  const query = `
    INSERT INTO comments (postId, authorId, content)
    VALUES (?, ?, ?)
  `;

  try {
    const [result] = await pool.query(query, [postId, authorId, text]);

    return {
      id: result.insertId,
      postId,
      authorId,
      text,
    };
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid postId or authorId.');
    }
    throw new ApiError(500, 'Error creating comment');
  }
};
