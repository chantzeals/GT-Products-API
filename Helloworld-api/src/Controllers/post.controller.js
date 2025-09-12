import { validationResult } from 'express-validator'; 
import * as productService from '../Services/post.service.js';



export const getAllProduct = (req, res) => {
    const products = productService.getAllProduct();
    res.json(products);
};

export const getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = productService.getProductById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
};


export const createProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price } = req.body;
  const newProduct = productService.createProduct({ name, price });
  res.status(201).json(newProduct);
};



export const updateProduct = (req, res) => {
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
};


export const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const success = productService.deleteProduct(productId);
    if (!success) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(204).send();
};


export async function updatePartialProduct(req, res) {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const updatedProduct = await productService.updatePartialProduct(id, updateFields); 
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

