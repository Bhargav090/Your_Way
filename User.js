const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const postSchema = new mongoose.Schema({
  p_img:String,
  p_name:String,
  p_description:String

});

const posts = mongoose.model('posts', postSchema);
const users = mongoose.model('users', userSchema);
    
    // Export models
    module.exports = {
        posts: posts,
        users: users
    };


