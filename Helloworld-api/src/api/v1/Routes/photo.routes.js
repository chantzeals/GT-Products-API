import { Router } from 'express';
import * as photoController from '../Controllers/photo.controller.js';
import { authMiddleware } from '../../../middleware/auth.middleware.js';
import upload from '../../../middleware/multer.middleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/photos/upload:
 *   post:
 *     tags:
 *       - Photos
 *     summary: Upload a photo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *       400:
 *         description: No file uploaded
 *
 * /api/v1/photos:
 *   get:
 *     tags:
 *       - Photos
 *     summary: List all photos for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User photos retrieved
 *
 * /api/v1/photos/{id}:
 *   delete:
 *     tags:
 *       - Photos
 *     summary: Delete a photo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Photo deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Photo not found
 */


router.use(authMiddleware);

router.get('/', photoController.getUserPhotos);
router.delete('/:id', photoController.deleteUserPhoto);

router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

export default router;