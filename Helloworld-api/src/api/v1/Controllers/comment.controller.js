import * as commentService from '../Services/comment.service.js';
import asyncHandler from '../../../utils/asyncHandler.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';

export const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  res.status(201).json(new ApiResponse(201, comment, 'Comment created successfully'));
});
