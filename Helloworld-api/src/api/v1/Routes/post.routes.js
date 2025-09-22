import { Router } from 'express';
import * as postValidator from '../../../middleware/validator.middleware.js';
import * as postController from '../Controllers/post.controller.js';

const router = Router(); 

router.post('/', postValidator.createPostRules, postController.createPost);
router.put('/:id', postValidator.updateValidationRules, postController.updatePost);
router.patch('/:id', postValidator.updateValidationRules, postController.updatePartialPost);

router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostById);
router.delete('/:id', postController.deletePost);

export default router;
