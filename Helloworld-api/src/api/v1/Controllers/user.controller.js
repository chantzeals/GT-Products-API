import * as userService from '../Services/user.service.js'; 
import * as postService from '../Services/post.service.js'; 
import asyncHandler from '../../../utils/asyncHandler.js'; 
import { ApiResponse } from '../../../utils/ApiResponse.js';

export const createUser = asyncHandler(async (req, res) => { 
  const newUser = await userService.createUser(req.body);
  res.status(201).json(new ApiResponse(201, newUser, 'User created successfully'));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(new ApiResponse(200, users, 'All users fetched successfully'));
});

export const getPostsByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.getUserById(userId);  
    const posts = await userService.getPostsByAuthorId(userId);
    res.status(200).json(new ApiResponse(200, posts, `Posts for user ${userId} fetched successfully`));
  } catch (error) {
    console.error('Error in getPostsByUser:', error);
    throw error;  
  }
});


