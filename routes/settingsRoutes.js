const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Get all settings grouped by category
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    const grouped = {};
    settings.forEach(s => {
      if (!grouped[s.category]) grouped[s.category] = {};
      grouped[s.category][s.key] = s.value;
    });
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a setting by key
router.put('/:key', async (req, res) => {
  const { key } = req.params;
  const { value, category } = req.body;

  try {
    const updated = await Setting.findOneAndUpdate(
      { key },
      { value, category },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
