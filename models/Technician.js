const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  activities: [
    {
      date: { type: Date, default: Date.now },
      type: { type: String, enum: ['test', 'repair'], required: true },
      itemName: String,
    }
  ]
});

module.exports = mongoose.model('Technician', technicianSchema);
