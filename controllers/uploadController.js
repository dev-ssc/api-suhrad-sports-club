// controllers/uploadController.js
const fs = require('fs');
const multer = require('multer');
const axios = require('axios');
const config = require('../config/config');

const upload = multer({ dest: 'uploads/' });

const uploadFile = (req, res) => {
  const file = req.file;
  const uploadUrl = `${config.siteUrl}/_api/web/lists/getbytitle('${config.libraryName}')/RootFolder/Files/Add(overwrite=true)`;
  const fileData = fs.readFileSync(file.path);

  axios.post(uploadUrl, fileData, {
    auth: {
      username: config.username,
      password: config.password,
    },
  })
    .then(response => {
      const sharepointId = response.data.d.ID;
      console.log('SharePoint ID:', sharepointId);
      res.json({ success: true, sharepointId }); // Send ID as part of response
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      res.status(500).json({ success: false, error: 'Error uploading file.' }); // Send error message in response
    });
};

module.exports = {
  uploadFile,
};
