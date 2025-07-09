const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');
const Technician = require('../models/Technician');

// ✅ Add a new transfer
router.post('/add', async (req, res) => {
  try {
    const { itemName, quantity, to, technicianId, action } = req.body;

    // Save to transfer collection
    const transfer = new Transfer({
      itemName,
      quantity,
      to,
      technicianId,
      action
    });

    await transfer.save();

    // Also push activity to technician
    const technician = await Technician.findById(technicianId);
    technician.activities.push({
      type: action === 'tested' ? 'test' : 'repair',
      itemName
    });
    await technician.save();

    res.status(201).json({ message: 'Transfer recorded', transfer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all transfers
router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.find().populate('technicianId', 'name');
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
