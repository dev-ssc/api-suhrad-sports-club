// routes/fileRoutes.js
const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: One Drive APIs
 *   description: Azure related APIs
 * /files/{folderId}:
 *   get:
 *     summary: Get files by folder ID
 *     description: Retrieve files from SharePoint by folder ID
 *     tags: [One Drive APIs]
 *     parameters:
 *       - in: path
 *         name: folderId
 *         required: true
 *         description: ID of the folder to retrieve files from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *       500:
 *         description: Error retrieving files
 */
router.get('/files/:folderId', async (req, res) => {
    const folderId = req.params.folderId;
  
    try {
      const files = await fileController.getFilesByFolderId(folderId);
      res.json(files);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
