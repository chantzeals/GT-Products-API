import { Router } from 'express';
import { body } from 'express-validator';
import * as productController from '../Controllers/post.controller.js';

const router = Router(); 
router.post(
  '/',
  [
    body('name')
      .exists().withMessage('Name is required')
      .isString().withMessage('Name must be a string')
      .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters')
      .trim(),
    body('price')
      .exists().withMessage('Price is required')
      .isNumeric().withMessage('Price must be a number'),
  ],
  productController.createProduct
);

const updateValidationRules = [
  body('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .trim(),
  body('price')
    .optional()
    .isNumeric().withMessage('Price must be a number'),
];

router.put('/:id', updateValidationRules, productController.updateProduct);
router.patch('/:id', updateValidationRules, productController.updatePartialProduct);

router.get('/', productController.getAllProduct);
router.post('/:id', productController.createProduct);
router.get('/:id', productController.getProductById);

router.delete('/:id', productController.deleteProduct);


export default router;
