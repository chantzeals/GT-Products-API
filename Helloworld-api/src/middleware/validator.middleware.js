import { body, validationResult } from 'express-validator';

const forbiddenWords = ['spam', 'advertisement'];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

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


  handleValidationErrors,
];

export const validatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required.'),

  handleValidationErrors,
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

  handleValidationErrors,
];

export const validateComment = [
  body('content')
    .isString().withMessage('Content must be a string.')
    .isLength({ min: 1 }).withMessage('Comment cannot be empty.'),

  body('authorId')
    .isInt({ min: 1 }).withMessage('A valid author ID is required.'),

  handleValidationErrors,
];

export const validateRegistration = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.'),

  body('email')
    .isEmail()
    .withMessage('A valid email is required.')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),

  handleValidationErrors,
];


export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('A valid email is required.')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required.'),

  handleValidationErrors,
];
