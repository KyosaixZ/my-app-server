const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    jobTitle: String,
    phoneNumber: String,
    responseRate: Number,
    descMatchRate: Number,
    profile_pic: String
  },
  { timestamps: true, versionKey: false }
);


const employerModel = mongoose.model('employer', employerSchema);

module.exports = employerModel;