const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  skills:  { type: String, required: true },
  profile_picture: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
