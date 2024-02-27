// controllers/fileController.js
const axios = require('axios');
const config = require('../config/config');

const getFileById = async (id) => {
  const getUrl = `${config.siteUrl}/_api/web/lists/getbytitle('${config.libraryName}')/items(${id})`;

  try {
    const response = await axios.get(getUrl, {
      auth: {
        username: config.username,
        password: config.password,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving file:', error);
    throw new Error('Error retrieving file.');
  }
};

module.exports = {
  getFileById,
};
