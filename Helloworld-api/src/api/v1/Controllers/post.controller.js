import { validationResult } from 'express-validator'; 
import * as productService from '../Services/post.service.js'; 
import asyncHandler from '../../../utils/asyncHandler.js'; 

export const getAllProduct = asyncHandler((req, res) => {
  const products = productService.getAllProduct();
  res.json(products);
});

export const getProductById = asyncHandler((req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = productService.getProductById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  res.json(product);
});

export const createProduct = asyncHandler((req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price } = req.body;
  const newProduct = productService.createProduct({ name, price });
  res.status(201).json(newProduct);
});

export const updateProduct = asyncHandler((req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const productId = parseInt(req.params.id, 10);
  const updatedProduct = productService.updateProduct(productId, req.body);
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  res.json(updatedProduct);
});

export const deleteProduct = asyncHandler((req, res) => {
  const productId = parseInt(req.params.id, 10);
  const success = productService.deleteProduct(productId);
  if (!success) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  res.status(204).send();
});

export const updatePartialProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updatedProduct = await productService.updatePartialProduct(id, updateFields);
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  res.json(updatedProduct);
});
