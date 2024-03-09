const mongoose = require('mongoose');

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

const users = mongoose.model('users', userSchema); // Using lowercase 'users' for model name

module.exports = users;
