const mongoose = require('mongoose');

// MongoDB options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the unsupported options from here
};

// Export a function to establish MongoDB connection
module.exports = function connectToDatabase(mongoURI) {
  mongoose.connect(mongoURI, options)
    .then(() => console.log('db connected'))
    .catch(err => console.error('db connection error:', err));
};


