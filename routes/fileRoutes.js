// routes/fileRoutes.js
const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();

/**
 * @swagger
 * /file/{id}:
 *   get:
 *     summary: Get file by ID
 *     description: Retrieve file data from SharePoint by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the file to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File data retrieved successfully
 *       500:
 *         description: Error retrieving file
 */
router.get('/file/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const fileData = await fileController.getFileById(fileId);
    res.json(fileData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
