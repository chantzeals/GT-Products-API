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
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }

  const postId = parseInt(req.params.postId, 10);
  const { content } = req.body; 

  const commentPayload = {
    postId,
    authorId: req.user.id,
    text: content
  };

  console.log('Creating comment:', commentPayload);

  const newComment = await commentService.createComment(commentPayload);

  res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
});


