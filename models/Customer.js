const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  balance: { type: Number, default: 0 }, // money due or credit
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
