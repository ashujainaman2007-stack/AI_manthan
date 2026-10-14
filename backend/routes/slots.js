const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/slots/:locationId?level=b1
router.get('/:locationId', (req, res) => {
  const { locationId } = req.params;
  const level = req.query.level || 'b1';

  const locSlots = store.slots[locationId] || store.slots['central-parking'];
  const levelSlots = locSlots[level] || locSlots['b1'] || [];

  res.json({
    success: true,
    locationId,
    level,
    count: levelSlots.length,
    slots: levelSlots
  });
});

// POST /api/slots/:locationId/select
router.post('/:locationId/select', (req, res) => {
  const { locationId } = req.params;
  const { slotId, level = 'b1' } = req.body;

  if (!slotId) {
    return res.status(400).json({ success: false, message: 'slotId is required' });
  }

  res.json({
    success: true,
    message: `Slot ${slotId} selected successfully`,
    data: {
      locationId,
      level,
      slotId
    }
  });
});

module.exports = router;
