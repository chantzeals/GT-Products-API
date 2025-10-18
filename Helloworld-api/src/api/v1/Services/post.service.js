import { ApiError } from '../../../utils/ApiError.js';  
import pool from '../../../config/db.js';  

export const getAllPost = async () => {
  const query = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.authorId,
      u.username AS authorUsername,
      u.email AS authorEmail
    FROM posts p
    JOIN users u ON p.authorId = u.id
  `;
  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new ApiError(500, 'Error fetching posts');
  }
};


export const getPostById = async (id) => {
  const query = `
    SELECT
      p.id,
      p.title,
      p.content,
      p.authorId,
      u.username AS authorUsername,
      u.email AS authorEmail
    FROM posts p
    JOIN users u ON p.authorId = u.id
    WHERE p.id = ?
  `;
  const [rows] = await pool.query(query, [id]);
  if (!rows[0]) {
    throw new ApiError(404, 'Post not found');
  }
  return rows[0];
};

export const createPost = async (postData, authorId) => {
  const { title, content } = postData;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new ApiError(400, 'Title is required and should be a non-empty string.');
  }

  if (!content || typeof content !== 'string' || content.trim() === '') {
    throw new ApiError(400, 'Content is required and should be a non-empty string.');
  }

  if (!authorId || !Number.isInteger(authorId) || authorId < 1) {
    throw new ApiError(400, 'A valid author ID is required.');
  }

  const query = 'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)';

  try {
    const [result] = await pool.query(query, [title, content, authorId]);
    
    const newPost = await getPostById(result.insertId);
    return newPost;
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid author ID. User does not exist.');
    }
    console.error('Error creating post:', error);
    throw new ApiError(500, 'Error creating new post');
  }
};

export const updatePost = async (id, postData) => {
    const { title, content } = postData;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new ApiError(400, 'Title is required and should be a non-empty string.');
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
        throw new ApiError(400, 'Content is required and should be a non-empty string.');
    }

    const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';

    try {
        const [result] = await pool.query(query, [title, content, id]);
        if (result.affectedRows === 0) {
            throw new ApiError(404, 'Post not found'); 
        }
        return { id, title, content };
    } catch (error) {
        throw new ApiError(500, 'Error updating post');
    }
};

export const deletePost = async (id) => {
    const query = 'DELETE FROM posts WHERE id = ?';

    try {
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows === 0) {
            throw new ApiError(404, 'Post not found');  
        }
        return true; 
    } catch (error) {
        throw new ApiError(500, 'Error deleting post');
    }
};

export const updatePartialPost = async (id, updateFields) => {
    const fields = [];
    const values = [];

    if (updateFields.title !== undefined) {
        if (typeof updateFields.title !== 'string' || updateFields.title.trim() === '') {
            throw new ApiError(400, 'Title should be a non-empty string.');
        }
        fields.push('title = ?');
        values.push(updateFields.title);
    }

    if (updateFields.content !== undefined) {
        if (typeof updateFields.content !== 'string' || updateFields.content.trim() === '') {
            throw new ApiError(400, 'Content should be a non-empty string.');
        }
        fields.push('content = ?');
        values.push(updateFields.content);
    }

    if (fields.length === 0) {
        throw new ApiError(400, 'No valid fields provided for update.');
    }

    const query = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    try {
        const [result] = await pool.query(query, values);
        if (result.affectedRows === 0) {
            throw new ApiError(404, 'Post not found');  
        }
        return { id, ...updateFields };
    } catch (error) {
        throw new ApiError(500, 'Error partially updating post');
    }
};
