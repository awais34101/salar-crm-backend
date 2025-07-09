const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: String,
  category: String,
  quantity: Number,
  location: String, // warehouse or store
  technician: String,
  status: String,   // tested or repaired
  purchaseDate: Date,
  costPrice: Number,
  sellingPrice: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);
