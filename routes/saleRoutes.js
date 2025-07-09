const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Customer = require('../models/Customer');

// ✅ Add a new sale
router.post('/add', async (req, res) => {
  try {
    const { customerId, itemName, quantity, costPrice, salePrice } = req.body;

    const sale = new Sale({
      customerId,
      itemName,
      quantity,
      costPrice,
      salePrice
    });

    const saved = await sale.save();

    // Optionally, update customer balance
    const customer = await Customer.findById(customerId);
    customer.balance += saved.total; // assuming all unpaid
    await customer.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('customerId', 'name');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
