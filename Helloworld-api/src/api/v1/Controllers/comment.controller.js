import * as commentService from '../Services/comment.service.js';
import asyncHandler from '../../../utils/asyncHandler.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getAllComments();
  res.status(200).json(new ApiResponse(200, comments, 'All comments fetched successfully'));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const comments = await commentService.getCommentsByPostId(postId);
  res.status(200).json(new ApiResponse(200, comments, `Comments for post ${postId} fetched successfully`));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { content, authorId } = req.body;

  const commentPayload = { postId, authorId, text: content };
  console.log('Creating comment:', commentPayload);

  try {
    const newComment = await commentService.createComment(commentPayload);
    res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Error creating comment', error: error.message || error });
  }
});

