const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema(
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


const EmployerModel = mongoose.model('Employer', employerSchema);

module.exports = EmployerModel;