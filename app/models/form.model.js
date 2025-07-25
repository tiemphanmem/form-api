const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  oldAddress: { type: String, required: true },
  newAddress: { type: String, required: true },
  citizenId: { type: String, required: true },
  attr: [String],
  imageFront: String,
  imageBack: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Form', formSchema);
