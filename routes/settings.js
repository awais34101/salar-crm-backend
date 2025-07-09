import express from 'express';
import Setting from '../models/Setting.js';

const router = express.Router();

// Get all settings grouped by category
router.get('/', async (req, res) => {
  const settings = await Setting.find();
  const grouped = {};
  settings.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = {};
    grouped[s.category][s.key] = s.value;
  });
  res.json(grouped);
});

// Update a setting by key
router.put('/:key', async (req, res) => {
  const { key } = req.params;
  const { value, category } = req.body;

  const updated = await Setting.findOneAndUpdate(
    { key },
    { value, category },
    { upsert: true, new: true }
  );

  res.json(updated);
});

export default router;
