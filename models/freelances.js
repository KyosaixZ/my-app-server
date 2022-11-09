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


const freelanceModel = mongoose.model('freelance', freelanceSchema);

module.exports = freelanceModel;