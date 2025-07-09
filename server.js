const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'https://salar-crm-frontend.vercel.app', // Only allow your live frontend
}));
app.use(express.json()); // Parse JSON bodies from frontend

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// ✅ Load and use all routes
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/technician', require('./routes/technicianRoutes'));
app.use('/api/transfer', require('./routes/transferRoutes'));
app.use('/api/customer', require('./routes/customerRoutes'));
app.use('/api/sale', require('./routes/saleRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes')); // ✅ New settings route added

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Salar Al Rayhen CRM Backend Running ✅');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
