const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/bookings?status=active|upcoming|all
router.get('/', (req, res) => {
  const { status } = req.query;
  let items = store.bookings;

  if (status && status !== 'all') {
    items = items.filter(b => b.status === status);
  }

  res.json({
    success: true,
    count: items.length,
    bookings: items,
    history: store.history
  });
});

// POST /api/bookings (Create new booking)
router.post('/', (req, res) => {
  const { locationId, slot, date, time, duration, amount, vehiclePlate } = req.body;

  const loc = store.locations.find(l => l.id === locationId) || store.locations[0];
  const newId = `PF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: newId,
    locationId: loc.id,
    venueName: loc.name,
    address: loc.address,
    slot: slot || 'A-12',
    floor: 'Basement 1',
    date: date || 'Tue, 10 Oct 2026',
    time: time || '10:00 AM',
    duration: duration || '2 Hours',
    amount: amount || loc.ratePerHour,
    status: 'upcoming',
    vehiclePlate: vehiclePlate || 'MP 09 AB 1234',
    qrCodeData: `PARKFLOW:${newId}:${slot || 'A12'}:INDORE`,
    createdAt: new Date().toISOString()
  };

  store.bookings.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    booking: newBooking
  });
});

// POST /api/bookings/:id/cancel
router.post('/:id/cancel', (req, res) => {
  const index = store.bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  const cancelled = store.bookings.splice(index, 1)[0];
  cancelled.status = 'cancelled';
  store.history.unshift({
    id: cancelled.id,
    venueName: cancelled.venueName,
    address: cancelled.address,
    date: cancelled.date,
    timeRange: `${cancelled.time} (${cancelled.duration})`,
    duration: cancelled.duration,
    amount: cancelled.amount,
    status: 'cancelled',
    theme: 'red'
  });

  res.json({
    success: true,
    message: 'Booking cancelled successfully. Refund initiated.',
    cancelledBooking: cancelled
  });
});

module.exports = router;
