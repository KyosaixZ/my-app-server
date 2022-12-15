const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freelanceSchema = new Schema(
  {
    name: String,
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


const FreelanceModel = mongoose.model('Freelance', freelanceSchema);

module.exports = FreelanceModel;