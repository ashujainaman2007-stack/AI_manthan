const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const locationsRouter = require('./routes/locations');
const slotsRouter     = require('./routes/slots');
const bookingsRouter  = require('./routes/bookings');
const paymentRouter   = require('./routes/payment');
const profileRouter   = require('./routes/profile');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/locations', locationsRouter);
app.use('/api/slots',     slotsRouter);
app.use('/api/bookings',  bookingsRouter);
app.use('/api/payment',   paymentRouter);
app.use('/api/profile',   profileRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'ParkFlow Smart Parking Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static files
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendDir));

// Fallback to frontend index.html for SPA routing
app.get('*', (req, res) => {
  // If request is for an html page in pages/
  if (req.path.startsWith('/pages/')) {
    const pagePath = path.join(frontendDir, req.path);
    return res.sendFile(pagePath);
  }
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 ParkFlow Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/`);
  console.log(`📱 Frontend running from: ${frontendDir}`);
  console.log(`===============================================`);
});
