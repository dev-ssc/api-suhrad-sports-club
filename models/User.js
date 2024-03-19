const mongoose = require('mongoose');
const { env } = require('../config/config');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String }
  },
  profilePicture: { type: String }
});

let users;
// Check the environment variable to determine which model to export
if (env === 'staging') {
  users = mongoose.model('users-new-staging', userSchema);
} else {
  users = mongoose.model('users-new', userSchema);
}

module.exports = users;
