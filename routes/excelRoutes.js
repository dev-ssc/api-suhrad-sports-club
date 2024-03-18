const { exportDataExcel, exportDataToGoogleSheet } = require("../controllers/exportController");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/exportDataExcel:
 *   get:
 *     summary: Export user data to Excel
 *     tags: [EXCEL]
 *     description: Export user data along with associated tournaments to an Excel file.
 *     responses:
 *       '200':
 *         description: Successful operation. Excel file will be downloaded.
 *       '500':
 *         description: Internal server error.
 */
router.get('/exportDataExcel', async (req, res) => {
    try {
        await exportDataExcel(req, res); // Invoke the exportDataExcel function
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/exportDataGoogleSheet:
 *   get:
 *     summary: Export user data to Excel
 *     tags: [EXCEL]
 *     description: Export user data along with associated tournaments to an Excel file.
 *     responses:
 *       '200':
 *         description: Successful operation. Excel file will be downloaded.
 *       '500':
 *         description: Internal server error.
 */
router.get('/exportDataGoogleSheet', async (req, res) => {
    try {
        await exportDataToGoogleSheet(req, res); // Invoke the exportDataExcel function
        res.status(200).json({ message: 'Data exported to Google Sheets successfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;