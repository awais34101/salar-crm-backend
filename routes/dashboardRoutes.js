const express = require('express');
const router = express.Router();

const Sale = require('../models/Sale');
const Inventory = require('../models/Inventory');
const Customer = require('../models/Customer');

router.get('/', async (req, res) => {
  try {
    const { start, end } = req.query;

    const startDate = start ? new Date(start) : new Date('2000-01-01');
    const endDate = end ? new Date(end) : new Date();

    const sales = await Sale.find({
      saleDate: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const totalSales = sales.length;

    // ✅ Calculate profit manually (if not stored in DB)
    const totalProfit = sales.reduce((sum, s) => {
      const profit = (s.salePrice - s.costPrice) * s.quantity;
      return sum + profit;
    }, 0);

    const totalInventoryItems = await Inventory.countDocuments();
    const totalCustomers = await Customer.countDocuments();

    res.json({
      totalSales,
      totalProfit,
      totalInventoryItems,
      totalCustomers,
      dateRange: {
        from: startDate.toISOString().split('T')[0],
        to: endDate.toISOString().split('T')[0]
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
