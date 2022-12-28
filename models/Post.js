const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  contact: String,
  name: String,
  profile_pic: String,
});

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;