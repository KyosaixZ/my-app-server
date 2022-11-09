const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    role: String,
    email: String,
    password: String,
    jobTitle: String,
    phoneNumber: String,
    responseRate: Number,
    onTimeRate: Number,
    profile_pic: String
  },
  { timestamps: true, versionKey: false }
);


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;