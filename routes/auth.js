const express = require('express');
const { PublicClientApplication } = require('@azure/msal-node');

const router = express.Router();

// Configuration
const clientId = '8a9f287f-a11e-4ef7-ad46-7080a61b307d';
const tenantId = '4191e260-cbf7-41b3-a676-fe8af9842ada';

// Create a MSAL PublicClientApplication
const pca = new PublicClientApplication({
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`
  }
});

// Define scopes for accessing resources
const scopes = ['offline_access', 'user.read']; // Add necessary scopes for your application

/**
 * @swagger
 * /auth/device:
 *   get:
 *     summary: Get device code for authentication
 *     description: |
 *       Initiates the authentication process by requesting a device code from Microsoft.
 *       The user can use this device code to authenticate on a separate device.
 *     responses:
 *       '200':
 *         description: Device code successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 device_code:
 *                   type: string
 *                   description: The device code to be used for authentication.
 *                 user_code:
 *                   type: string
 *                   description: The user code to be entered by the user during authentication.
 *                 verification_uri:
 *                   type: string
 *                   description: The verification URI where the user should enter the user code.
 *                 expires_in:
 *                   type: integer
 *                   description: The duration in seconds for which the device code is valid.
 *       '500':
 *         description: Internal server error
 */
// Route to get device code for authentication
// Route to get device code for authentication
router.get('/device', async (req, res) => {
    try {
      const deviceCodeRequest = {
        scopes: scopes,
        deviceCodeCallback: (response) => {
          // This function is called with the device code response
          // You can optionally handle the device code response here
          const codePattern = /enter the code ([^\s]+) to authenticate\./i;
          const match = response.message.match(codePattern);
          if (match && match[1]) {
            deviceCode = match[1]; // Extracted device code
          }
          
          // Send the device code as part of the response
          res.status(200).json({ code: deviceCode });
        }
      };
  
      await pca.acquireTokenByDeviceCode(deviceCodeRequest);
    } catch (error) {
      console.error('Error getting device code:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: APIs for authentication
 * 
 * /auth/accesstoken:
 *   get:
 *     summary: Get app-only access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successful response with access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token obtained for app-only authentication
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the internal server error
 */
// Route to get the app-only access token
const graphToken = require('./graphToken');

const settings = require('./appSettings');
function initializeGraph(settings) {
    graphToken.initializeGraphForAppOnlyAuth(settings);
  }
router.get('/accesstoken', async (req, res) => {
    try {
      initializeGraph(settings);
      // Get the app-only access token
      const accessToken = await graphToken.getAppOnlyTokenAsync();
  
      // Send the access token in the response
      res.json({ accessToken: accessToken });
    } catch (error) {
      console.error('Error getting access token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
