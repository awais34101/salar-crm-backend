const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON from frontend

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Load and use inventory routes
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes);

// Load and use technician routes
const technicianRoutes = require('./routes/technicianRoutes');
app.use('/api/technician', technicianRoutes);

// Load and use transfer routes
const transferRoutes = require('./routes/transferRoutes');
app.use('/api/transfer', transferRoutes);

// Load and use customer routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customer', customerRoutes);

// Load and use sale routes
const saleRoutes = require('./routes/saleRoutes');
app.use('/api/sale', saleRoutes);

// Load and use auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Load and use dashboard routes
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Salar Al Rayhen CRM Backend Running ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
