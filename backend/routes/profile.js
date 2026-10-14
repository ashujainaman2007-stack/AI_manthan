const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/profile
router.get('/', (req, res) => {
  res.json({
    success: true,
    user: store.user
  });
});

// POST /api/profile/vehicle (Add vehicle)
router.post('/vehicle', (req, res) => {
  const { name, plate, type = '4 Wheeler' } = req.body;
  if (!plate) {
    return res.status(400).json({ success: false, message: 'Vehicle plate is required' });
  }

  const newVehicle = {
    id: `v${Date.now()}`,
    name: name || 'My Vehicle',
    plate: plate.toUpperCase(),
    type,
    isDefault: false
  };

  store.user.vehicles.push(newVehicle);

  res.status(201).json({
    success: true,
    message: 'Vehicle added successfully',
    vehicle: newVehicle
  });
});

// PUT /api/profile/notifications
router.put('/notifications', (req, res) => {
  const { enabled } = req.body;
  store.user.notificationsEnabled = !!enabled;
  res.json({
    success: true,
    notificationsEnabled: store.user.notificationsEnabled
  });
});

module.exports = router;
