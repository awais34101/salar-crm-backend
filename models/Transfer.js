const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  from: { type: String, enum: ['warehouse'], default: 'warehouse' },
  to: { type: String, enum: ['store'], required: true },
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' },
  action: { type: String, enum: ['tested', 'repaired'], required: true },
  transferDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transfer', transferSchema);
