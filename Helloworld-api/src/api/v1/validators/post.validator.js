import { body } from 'express-validator';

const forbiddenWords = ['spam', 'advertisement'];

export const createPostRules = [
  body('product_name')  
    .exists().withMessage('Product name is required')
    .isString().withMessage('Product name must be a string')
    .isLength({ min: 5, max: 100 }).withMessage('Product name must be between 5 and 100 characters')
    .custom(value => {
      const lower = value.toLowerCase();
      for (const word of forbiddenWords) {
        if (lower.includes(word)) {
          throw new Error(`Product name cannot contain forbidden word: ${word}`);
        }
      }
      return true;  
    })
    .trim(),  
  body('price')
    .exists().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => {
      if (value <= 0) {
        throw new Error('Price must be a positive number');
      }
      return true;  
    }),
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
