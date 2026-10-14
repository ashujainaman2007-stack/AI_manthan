// In-memory data store for ParkFlow (Indore pilot lots)
const store = {
  locations: [
    {
      id: 'central-parking',
      name: 'Central Parking',
      address: 'Vijay Nagar, Indore, Madhya Pradesh 452010',
      lat: 22.7533,
      lng: 75.8937,
      rating: 4.6,
      reviewsCount: 128,
      distance: '86m',
      ratePerHour: 40,
      totalSlots: 50,
      availableSlots: 20,
      occupiedSlots: 25,
      reservedSlots: 5,
      categories: ['car', 'bike', 'ev', 'covered'],
      amenities: ['Covered', 'CCTV 24/7', 'Security Guard', 'EV Charging', 'Restrooms', 'Car Wash'],
      imageTheme: 'green',
      rates: [
        { duration: '2 Hours', price: 40 },
        { duration: '4 Hours', price: 70 },
        { duration: '6 Hours', price: 100 },
        { duration: '12 Hours', price: 180 }
      ]
    },
    {
      id: 'phoenix-citadel',
      name: 'Phoenix Citadel Parking',
      address: 'MR 10 Junction, Indore',
      lat: 22.7665,
      lng: 75.8988,
      rating: 4.8,
      reviewsCount: 340,
      distance: '1.2km',
      ratePerHour: 50,
      totalSlots: 120,
      availableSlots: 38,
      occupiedSlots: 74,
      reservedSlots: 8,
      categories: ['car', 'bike', 'covered', 'ev'],
      amenities: ['Covered Multi-level', 'Fast EV Charger', 'Valet', '24/7 CCTV'],
      imageTheme: 'orange',
      rates: [
        { duration: '2 Hours', price: 50 },
        { duration: '4 Hours', price: 90 },
        { duration: '6 Hours', price: 130 },
        { duration: '12 Hours', price: 220 }
      ]
    },
    {
      id: 'c21-mall',
      name: 'C21 Mall Parking',
      address: 'AB Road, Scheme 54, Indore',
      lat: 22.7485,
      lng: 75.8920,
      rating: 4.4,
      reviewsCount: 95,
      distance: '650m',
      ratePerHour: 30,
      totalSlots: 60,
      availableSlots: 14,
      occupiedSlots: 42,
      reservedSlots: 4,
      categories: ['car', 'bike'],
      amenities: ['Covered', 'Security', 'CCTV'],
      imageTheme: 'blue',
      rates: [
        { duration: '2 Hours', price: 30 },
        { duration: '4 Hours', price: 55 },
        { duration: '6 Hours', price: 80 },
        { duration: '12 Hours', price: 150 }
      ]
    },
    {
      id: 'treasure-island',
      name: 'Treasure Island Parking',
      address: 'MG Road, South Tukoganj, Indore',
      lat: 22.7215,
      lng: 75.8790,
      rating: 4.5,
      reviewsCount: 210,
      distance: '3.4km',
      ratePerHour: 40,
      totalSlots: 80,
      availableSlots: 18,
      occupiedSlots: 58,
      reservedSlots: 4,
      categories: ['car', 'bike', 'covered'],
      amenities: ['Underground', 'CCTV', 'Lift Access'],
      imageTheme: 'green',
      rates: [
        { duration: '2 Hours', price: 40 },
        { duration: '4 Hours', price: 75 },
        { duration: '6 Hours', price: 110 }
      ]
    },
    {
      id: 'brilliant-convention',
      name: 'Brilliant Convention Centre',
      address: 'Scheme 78, Part II, Vijay Nagar, Indore',
      lat: 22.7602,
      lng: 75.8845,
      rating: 4.7,
      reviewsCount: 165,
      distance: '1.8km',
      ratePerHour: 50,
      totalSlots: 150,
      availableSlots: 45,
      occupiedSlots: 98,
      reservedSlots: 7,
      categories: ['car', 'bike', 'ev', 'covered'],
      amenities: ['Spacious Outdoor & Covered', 'EV Fast Charger', 'VIP Valet', '24/7 Surveillance'],
      imageTheme: 'orange',
      rates: [
        { duration: '2 Hours', price: 50 },
        { duration: '4 Hours', price: 90 },
        { duration: '6 Hours', price: 130 }
      ]
    }
  ],

  slots: {
    'central-parking': {
      b1: [
        { id: 'A01', status: 'occupied' }, { id: 'A02', status: 'occupied' }, { id: 'A03', status: 'available' },
        { id: 'A04', status: 'occupied' }, { id: 'A05', status: 'available' }, { id: 'A06', status: 'occupied' },
        { id: 'A07', status: 'available' }, { id: 'A08', status: 'occupied' }, { id: 'A09', status: 'available' },
        { id: 'A10', status: 'occupied' }, { id: 'A11', status: 'available' }, { id: 'A12', status: 'selected' },
        { id: 'A13', status: 'available' }, { id: 'A14', status: 'reserved' },  { id: 'A15', status: 'available' },
        { id: 'A16', status: 'available' }, { id: 'A17', status: 'available' }, { id: 'A18', status: 'available' },
        { id: 'A19', status: 'available' }, { id: 'A20', status: 'available' }
      ],
      b2: [
        { id: 'B01', status: 'available' }, { id: 'B02', status: 'occupied' }, { id: 'B03', status: 'occupied' },
        { id: 'B04', status: 'available' }, { id: 'B05', status: 'available' }, { id: 'B06', status: 'reserved' },
        { id: 'B07', status: 'available' }, { id: 'B08', status: 'available' }, { id: 'B09', status: 'occupied' },
        { id: 'B10', status: 'occupied' }
      ],
      g: [
        { id: 'G01', status: 'reserved' }, { id: 'G02', status: 'occupied' }, { id: 'G03', status: 'available' },
        { id: 'G04', status: 'available' }, { id: 'G05', status: 'occupied' }, { id: 'G06', status: 'available' }
      ]
    }
  },

  bookings: [
    {
      id: 'PF-2026-9041',
      locationId: 'central-parking',
      venueName: 'Central Parking',
      address: 'Vijay Nagar, Indore',
      slot: 'A-12',
      floor: 'Basement 1',
      date: 'Tue, 10 Oct 2026',
      time: '10:00 AM',
      duration: '2 Hours',
      amount: 40,
      status: 'active',
      qrCodeData: 'PARKFLOW:PF-2026-9041:A12:INDORE',
      entryTime: '10:00 AM',
      expectedExit: '12:00 PM',
      remainingSeconds: 4815 // 1h 20m 15s
    },
    {
      id: 'PF-2026-8812',
      locationId: 'phoenix-citadel',
      venueName: 'Phoenix Mall Parking',
      address: 'Indore',
      slot: 'P-04',
      floor: 'Ground',
      date: 'Tomorrow, 11 Oct 2026',
      time: '02:00 PM',
      duration: '3 Hours',
      amount: 60,
      status: 'upcoming',
      qrCodeData: 'PARKFLOW:PF-2026-8812:P04:INDORE'
    }
  ],

  history: [
    {
      id: 'PF-2026-7210',
      venueName: 'Central Parking',
      address: 'Vijay Nagar, Indore',
      date: '10 Oct 2026',
      timeRange: '10:00 AM – 12:10 PM',
      duration: '2h 10m',
      amount: 50,
      status: 'completed',
      theme: 'green'
    },
    {
      id: 'PF-2026-6991',
      venueName: 'Phoenix Mall Parking',
      address: 'Indore',
      date: '8 Oct 2026',
      timeRange: '11:20 AM – 01:20 PM',
      duration: '2h',
      amount: 40,
      status: 'completed',
      theme: 'orange'
    },
    {
      id: 'PF-2026-5432',
      venueName: 'C21 Mall Parking',
      address: 'Indore',
      date: '5 Oct 2026',
      timeRange: '09:30 AM – 11:30 AM',
      duration: '2h',
      amount: 40,
      status: 'completed',
      theme: 'blue'
    }
  ],

  user: {
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    avatarInitials: 'RS',
    rating: 4.9,
    parkingsCompleted: 24,
    totalSaved: 980,
    vehicles: [
      { id: 'v1', name: 'Hyundai Creta', plate: 'MP 09 AB 1234', type: '4 Wheeler', isDefault: true },
      { id: 'v2', name: 'Royal Enfield Classic 350', plate: 'MP 09 CD 5678', type: '2 Wheeler', isDefault: false }
    ],
    notificationsEnabled: true
  }
};

module.exports = store;
