// routes/uploadRoutes.js
// routes/uploadRoutes.js
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Uploads a file to the server
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */

const express = require('express');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload', uploadController.uploadFile);

module.exports = router;
