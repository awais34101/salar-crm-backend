const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  costPrice: { type: Number, required: true },  // from inventory
  salePrice: { type: Number, required: true },
  total: { type: Number },
  profit: { type: Number },
  saleDate: { type: Date, default: Date.now }
});

// Auto-calculate total and profit before saving
saleSchema.pre('save', function (next) {
  this.total = this.salePrice * this.quantity;
  this.profit = (this.salePrice - this.costPrice) * this.quantity;
  next();
});

module.exports = mongoose.model('Sale', saleSchema);
