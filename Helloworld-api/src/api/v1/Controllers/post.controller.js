import { validationResult } from 'express-validator'; 
import * as productService from '../Services/post.service.js'; 
import asyncHandler from '../../../utils/asyncHandler.js'; 
import { ApiResponse } from '../../../utils/ApiResponse.js';


export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await productService.getAllProduct(); 
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products retrieved successfully"));
});


export const getProductById = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = await productService.getProductById(productId);  
  if (!product) {
    return res.status(404).json(new ApiResponse(404, null, 'Product not found.'));
  }
  return res.json(new ApiResponse(200, product, 'Product retrieved successfully'));
});


export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiResponse(400, errors.array(), 'Validation errors'));
  }

  try {
    const newProduct = await productService.createProduct(req.body);
    return res.status(201).json(new ApiResponse(201, newProduct, 'Product created successfully'));
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json(new ApiResponse(500, null, 'Internal server error'));
  }
};


export const updateProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiResponse(400, errors.array(), 'Validation errors'));
  }

  const productId = parseInt(req.params.id, 10);
  const updatedProduct = await productService.updateProduct(productId, req.body);  
  if (!updatedProduct) {
    return res.status(404).json(new ApiResponse(404, null, 'Product not found.'));
  }

  return res.json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const success = await productService.deleteProduct(productId);  
  if (!success) {
    return res.status(404).json(new ApiResponse(404, null, 'Product not found.'));
  }
  return res.status(204).send(); 
});

export const updatePartialProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiResponse(400, errors.array(), 'Validation errors'));
  }

  const updatedProduct = await productService.updatePartialProduct(id, updateFields); 
  if (!updatedProduct) {
    return res.status(404).json(new ApiResponse(404, null, 'Product not found.'));
  }

  return res.json(new ApiResponse(200, updatedProduct, 'Product partially updated successfully'));
});
