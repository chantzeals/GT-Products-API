import { body } from 'express-validator';

export const createPostRules = [
  body('name')
    .exists().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 5, max: 100 }).withMessage('Name must be between 5 and 100 characters')
    .trim(),
  body('price')
    .exists().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number'),
];

export const updateValidationRules = [
  body('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .trim(),
  body('price')
    .optional()
    .isNumeric().withMessage('Price must be a number'),
];
