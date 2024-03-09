// Define your schema for Logs

  


  const mongoose = require('mongoose');

  const logSchema = new mongoose.Schema({
    id: String,
  test: String
  });

  // Create a Mongoose model using the schema
  const Logs = mongoose.model('logs', logSchema);

module.exports = Logs;
