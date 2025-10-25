import { Router } from 'express';
import * as photoController from '../Controllers/photo.controller.js';
import { authMiddleware } from '../../../middleware/auth.middleware.js';
import upload from '../../../middleware/multer.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', photoController.getUserPhotos);
router.delete('/:id', photoController.deleteUserPhoto);

router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

export default router;