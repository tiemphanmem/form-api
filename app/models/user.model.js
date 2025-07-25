const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userCode: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  citizenId: { type: String, required: true, unique: true },
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
