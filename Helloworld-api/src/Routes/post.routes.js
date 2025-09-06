import { Router } from 'express';
import * as productController from '../Controllers/post.controller.js';

const router = Router(); 

router.get('/', productController.getAllProduct);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id', productController.updatePartialProduct);

export default router;
