const fs = require('fs');
const { Client } = require('@microsoft/microsoft-graph-client');
const config = require('../config/config');
const graph = require('../utilities/graphToken');
const settings = require('../config/appSettings');

const uploadFile = async (req, res, folderID) => {
    try {
        console.log("folderid", folderID);
        // Initialize Graph API for app-only authentication
        const appclient = await graph.initializeGraphForAppOnlyAuth(settings);

        const files = req.files; // Access the uploaded files from the request

        if (!files || !files.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        const file = files.file[0]; // Access the first uploaded file
        const fileName = file.originalname;
        const fileData = fs.readFileSync(file.path);

        // Construct the folder path
        const folderPath = `/drives/${config.driveId}/items/${folderID}:`;

        // Include the access token in the request headers
        const accessToken = await graph.getAppOnlyTokenAsync();
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        };

        try {
            // Upload file to the specified folder
            const uploadPath = `${folderPath}/${fileName}:/content`;
            console.log("upload path", uploadPath);
            const uploadResponse = await appclient.api(uploadPath).put(fileData);

            // Send success response
            res.json({ success: true, message: 'File uploaded successfully' });
        } catch (err) {
            console.log("Error:", err);
            res.status(500).json({ success: false, error: 'Error uploading file.' });
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, error: 'Error uploading file.' });
    }
};

module.exports = {
    uploadFile,
};
