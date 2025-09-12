import { Router } from 'express';
import * as postValidator from '../validators/post.validator.js';
import * as productController from '../Controllers/post.controller.js';

const router = Router(); 

router.post('/', postValidator.createPostRules, productController.createProduct);
router.put('/:id', postValidator.updateValidationRules, productController.updateProduct);
router.patch('/:id', postValidator.updateValidationRules, productController.updatePartialProduct);

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

export default router;
