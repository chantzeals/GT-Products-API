import { body } from 'express-validator';

const forbiddenWords = ['spam', 'advertisement'];

export const createPostRules = [
  body('title')
    .exists().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5, max: 255 }).withMessage('Title must be between 5 and 255 characters')
    .custom(value => {
      const lower = value.toLowerCase();
      for (const word of forbiddenWords) {
        if (lower.includes(word)) {
          throw new Error(`Title cannot contain forbidden word: ${word}`);
        }
      }
      return true;
    })
    .trim(),

  body('content')
    .exists().withMessage('Content is required')
    .isString().withMessage('Content must be a string')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long')
    .trim(),
];

export const updateValidationRules = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 5, max: 255 }).withMessage('Title must be between 5 and 255 characters')
    .custom(value => {
      if (!value) return true; 
      const lower = value.toLowerCase();
      for (const word of forbiddenWords) {
        if (lower.includes(word)) {
          throw new Error(`Title cannot contain forbidden word: ${word}`);
        }
      }
      return true;
    })
    .trim(),

  body('content')
    .optional()
    .isString().withMessage('Content must be a string')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long')
    .trim(),
];
