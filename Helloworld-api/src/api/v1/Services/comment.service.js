import pool from '../../../config/db.js';
import { ApiError } from '../../../utils/ApiError.js';

export const createComment = async ({ postId, authorId, content }) => {
  const query = `
    INSERT INTO comments (postId, authorId, content)
    VALUES (?, ?, ?)
  `;

  try {
    const [result] = await pool.query(query, [postId, authorId, content]);

    return {
      id: result.insertId,
      postId,
      authorId,
      content,
    };
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid postId or authorId.');
    }
    throw new ApiError(500, 'Error creating comment');
  }
};
