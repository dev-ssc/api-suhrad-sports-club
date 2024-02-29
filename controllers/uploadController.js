const fs = require('fs');
const multer = require('multer');
const { Client } = require('@microsoft/microsoft-graph-client');
const config = require('../config/config');
const graph = require('../routes/graphToken');
const settings = require('../routes/appSettings');
const upload = require('../multerConfig'); // Import Multer configuration

// Initialize Graph API for app-only authentication

const uploadFile = async (req, res) => {
    try {
        // Initialize Graph API for app-only authentication
        const appclient = await graph.initializeGraphForAppOnlyAuth(settings);

        // Multer middleware parses the file upload and stores it in req.file
        upload.single('file')(req, res, async function(err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, error: err.message });
            } else if (err) {
                return res.status(500).json({ success: false, error: 'Error handling file upload' });
            }

            const file = req.file; // Access the uploaded file from the request
            
            if (!file) {
                return res.status(400).json({ success: false, error: 'No file uploaded' });
            }

            const fileName = file.originalname;
            const fileData = fs.readFileSync(file.path);

            // Create folder if it doesn't exist
            const folderName = 'test';
            const folderPath = `/me/drive/items/${folderName}`;

            // Include the access token in the request headers
            const accessToken = await graph.getAppOnlyTokenAsync();
            console.log("token",accessToken)
             // Assuming this function retrieves the access token
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            };
            try{
                const driveItem = {
                    name: 'New Folder',
                    folder: { },
                    '@microsoft.graph.conflictBehavior': 'rename'
                  };
                  await appclient.api('/me/drive/root/children').headers(headers).post(driveItem);
               // await appclient.api(folderPath).headers(headers).post();

            }catch(err){
               console.log("error in atit",err) 
            }

            // Upload file to the created folder
            const uploadPath = `${folderPath}/${fileName}:/content`;
            
            const uploadResponse = await appclient.api(uploadPath).headers(headers).post(fileData);

            // Send success response
            res.json({ success: true, message: 'File uploaded successfully' });
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, error: 'Error uploading file.' });
    }
};
  

module.exports = {
  uploadFile,
};
