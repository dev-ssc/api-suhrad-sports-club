/**
 * @swagger
 * tags:
 *   name: One Drive APIs
 *   description: Azure related APIs
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Uploads a file to the server
 *     tags: [One Drive APIs]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - folderID
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               folderID:
 *                 type: string
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request. No file uploaded or missing folderID.
 *       500:
 *         description: Internal server error. Error handling file upload.
 */


const express = require('express');
const uploadController = require('../controllers/uploadController');

const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // Implement file filter logic if needed
        cb(null, true);
    }
}).fields([{ name: 'file' }, { name: 'folderID' }]);

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer error handling
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // Other error handling
            return res.status(500).json({ error: 'An unexpected error occurred.' });
        }

        // Both file and folderID fields are available in req.body
        const { file, folderID } = req.body;
        
        // Handle the file upload and folderID
        uploadController.uploadFile(req, res, folderID);
    });
});
module.exports = router;
