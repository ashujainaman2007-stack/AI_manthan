const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/locations?filter=car&search=vijay
router.get('/', (req, res) => {
  const { filter, search } = req.query;
  let result = [...store.locations];

  if (filter && filter !== 'all') {
    result = result.filter(loc => loc.categories.includes(filter.toLowerCase()));
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    result = result.filter(loc => 
      loc.name.toLowerCase().includes(q) || 
      loc.address.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /api/locations/:id
router.get('/:id', (req, res) => {
  const loc = store.locations.find(l => l.id === req.params.id);
  if (!loc) {
    return res.status(404).json({ success: false, message: 'Parking location not found' });
  }
  res.json({ success: true, data: loc });
});

module.exports = router;
