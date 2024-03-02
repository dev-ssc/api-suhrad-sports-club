// controllers/fileController.js
const { Client } = require('@microsoft/microsoft-graph-client');
const graphToken = require('../utilities/graphToken');
const settings = require('../config/appSettings');
const { driveId } = require('../config/config');
// Function to fetch files based on folder ID from Microsoft Graph
const getFilesByFolderId = async (folderId) => {
    try {
        // Initialize Graph API client
        const client = await graphToken.initializeGraphForAppOnlyAuth(settings);

        // Path of the folder from which files need to be fetched
        const folderPath = `drives/${driveId}/items/${folderId}/children`;

        // Include the access token in the request headers
        const accessToken = await graphToken.getAppOnlyTokenAsync();
        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };

        // Make request to Microsoft Graph API to get files
        const response = await client
            .api(folderPath)
            .version('v1.0')
            .get();

        // Return the list of files in the response
        return response;
    } catch (error) {
        console.error('Error fetching files:', error);
        throw new Error('Error fetching files from Microsoft Graph');
    }
};

module.exports = {
    getFilesByFolderId
};
