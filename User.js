const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create the model
module.exports = mongoose.model('users', userSchema);


