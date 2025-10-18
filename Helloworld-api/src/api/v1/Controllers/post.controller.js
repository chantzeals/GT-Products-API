import { validationResult } from 'express-validator'; 
import * as postService from '../Services/post.service.js'; 
import asyncHandler from '../../../utils/asyncHandler.js'; 
import { ApiResponse } from '../../../utils/ApiResponse.js';

export const getAllPost = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPost(); 
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
});

export const getPostById = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await postService.getPostById(postId);  
  if (!post) {
    return res.status(404).json(new ApiResponse(404, null, 'Post not found.'));
  }
  return res.json(new ApiResponse(200, post, 'Post retrieved successfully'));
});

export const createPost = asyncHandler(async (req, res) => {
  const authorId = req.user.id; 
  const postData = req.body;    

  const newPost = await postService.createPost(postData, authorId);
  res.status(201).json(new ApiResponse(201, newPost, "Post created successfully"));
});


export const updatePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiResponse(400, errors.array(), 'Validation errors'));
  }

  const postId = parseInt(req.params.id, 10);
  const updatedPost = await postService.updatePost(postId, req.body);  
  if (!updatedPost) {
    return res.status(404).json(new ApiResponse(404, null, 'Post not found.'));
  }

  return res.json(new ApiResponse(200, updatedPost, 'Post updated successfully'));
});

export const deletePost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const success = await postService.deletePost(postId);  
  if (!success) {
    return res.status(404).json(new ApiResponse(404, null, 'Post not found.'));
  }
  return res.status(204).send(); 
});

export const updatePartialPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiResponse(400, errors.array(), 'Validation errors'));
  }

  const updatedPost = await postService.updatePartialPost(id, updateFields); 
  if (!updatedPost) {
    return res.status(404).json(new ApiResponse(404, null, 'Post not found.'));
  }

  return res.json(new ApiResponse(200, updatedPost, 'Post partially updated successfully'));
});
