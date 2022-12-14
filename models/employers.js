const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    descRate: Number,
    profile_pic: String
  },
  { timestamps: true, versionKey: false }
);


const EmployerModel = mongoose.model('Employer', employerSchema);

module.exports = EmployerModel;