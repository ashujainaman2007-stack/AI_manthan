const express = require('express');
const router = express.Router();
const store = require('../data/store');

// POST /api/payment/verify
router.post('/verify', (req, res) => {
  const { method, amount, upiId, bookingId } = req.body;

  // Process transaction
  const txnId = `TXN-${Date.now().toString(36).toUpperCase()}`;

  // If there is an active booking, move it to history
  if (bookingId) {
    const bIndex = store.bookings.findIndex(b => b.id === bookingId);
    if (bIndex !== -1) {
      const b = store.bookings.splice(bIndex, 1)[0];
      store.history.unshift({
        id: b.id,
        venueName: b.venueName,
        address: b.address,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        timeRange: `${b.time} – Just now`,
        duration: b.duration,
        amount: amount || b.amount,
        status: 'completed',
        theme: 'green'
      });
    }
  }

  res.json({
    success: true,
    message: 'Payment verified and processed successfully',
    transactionId: txnId,
    method,
    amount,
    timestamp: new Date().toISOString()
  });
});

// POST /api/payment/apply-coupon
router.post('/apply-coupon', (req, res) => {
  const { code, amount } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code required' });
  }

  if (code.toUpperCase() === 'PARK10') {
    const discount = 5;
    const finalAmount = Math.max(0, (amount || 50) - discount);
    return res.json({
      success: true,
      code: 'PARK10',
      discount,
      finalAmount,
      message: '₹5 discount applied successfully!'
    });
  }

  res.status(400).json({
    success: false,
    message: 'Invalid coupon code. Try PARK10'
  });
});

module.exports = router;
