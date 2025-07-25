const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  citizenId: { type: String, required: true },

  newAddress: { type: String, required: true },
  temporaryAddress: { type: String }, // optional
  currentAddress: { type: String },   // optional

  vnidImage: { type: String, required: true }, // bắt buộc

}, {
  timestamps: true
});

module.exports = mongoose.model('Form', formSchema);
