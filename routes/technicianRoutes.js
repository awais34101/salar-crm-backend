const express = require('express');
const router = express.Router();
const Technician = require('../models/Technician');

// ✅ Add new technician
router.post('/add', async (req, res) => {
  try {
    const tech = new Technician({ name: req.body.name });
    const saved = await tech.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Record test/repair activity
router.post('/activity/:id', async (req, res) => {
  try {
    const tech = await Technician.findById(req.params.id);
    if (!tech) return res.status(404).json({ message: 'Technician not found' });

    tech.activities.push({
      type: req.body.type,  // 'test' or 'repair'
      itemName: req.body.itemName,
    });

    await tech.save();
    res.json(tech);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get monthly report
router.get('/report/:id', async (req, res) => {
  try {
    const tech = await Technician.findById(req.params.id);
    if (!tech) return res.status(404).json({ message: 'Technician not found' });

    const thisMonth = new Date();
    const startOfMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);

    const monthlyActivities = tech.activities.filter(activity => {
      return new Date(activity.date) >= startOfMonth;
    });

    const testCount = monthlyActivities.filter(a => a.type === 'test').length;
    const repairCount = monthlyActivities.filter(a => a.type === 'repair').length;

    res.json({
      name: tech.name,
      month: thisMonth.toLocaleString('default', { month: 'long' }),
      testCount,
      repairCount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET all technicians (required for frontend dropdown)
router.get('/', async (req, res) => {
  try {
    const all = await Technician.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
