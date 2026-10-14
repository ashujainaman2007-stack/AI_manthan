# 🅿️ ParkFlow – Smart Parking Management System

> **Find. Reserve. Scan. Park.** A modern smart parking platform with real-time slot detection, interactive Leaflet map navigation, token QR generation, countdown timers, and full-featured checkout.

---

## 🚀 Quick Start

Start both frontend and backend API with one command:

```bash
npm start
```

Then open your browser at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Architecture

The codebase is organized into **`frontend/`** and **`backend/`** folders for coordination and separation of concerns:

```
SMARTparking/
├── frontend/                     # All Client-Side UI & App Code
│   ├── index.html                # Master Single App Layout (Hosts all 9 views seamlessly)
│   ├── css/                      # Modular Stylesheets per Screen
│   │   ├── base.css              # Universal design system, device shell, theme tokens
│   │   ├── map.css               # Leaflet map pins, pulses, controls, and floating cards
│   │   ├── home.css              # Home search, category chips, header
│   │   ├── detail.css            # Venue details, rate calculators, date/time pickers
│   │   ├── slots.css             # Floor levels and slot grid picker
│   │   ├── confirmed.css         # Confetti animation, dynamic QR pass
│   │   ├── bookings.css          # Bookings list, tab filters, cancel prompts
│   │   ├── active.css            # Live countdown timer & exit actions
│   │   ├── payment.css           # UPI/Card/Wallet checkout & coupon codes
│   │   ├── history.css           # Past sessions & receipts
│   │   └── profile.css           # Saved vehicles & user settings
│   ├── js/                       # Modular JavaScript Controllers
│   │   ├── app.js                # Core Single App Router (Hash routing, state sync)
│   │   ├── map.js                # Interactive Leaflet Map for Indore with custom pins
│   │   ├── home.js               # Category filter & search handling
│   │   ├── detail.js             # Rate calculations & date/time handling
│   │   ├── slots.js              # Slot selection & level switching
│   │   ├── confirmed.js          # QR code rendering & booking confirmation
│   │   ├── bookings.js           # Booking cards lifecycle & cancellations
│   │   ├── active.js             # Live countdown timer (hh:mm:ss)
│   │   ├── payment.js            # Payment validation & processing
│   │   ├── history.js            # Filter tabs & receipt views
│   │   └── profile.js            # Vehicle management & settings
│   └── pages/                    # Standalone page views (accessible individually)
│       ├── detail.html
│       ├── slots.html
│       ├── confirmed.html
│       ├── bookings.html
│       ├── active.html
│       ├── payment.html
│       ├── history.html
│       └── profile.html
│
├── backend/                      # Node.js + Express REST API Server
│   ├── server.js                 # Express server & static asset pipeline
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Server configuration (PORT=3000)
│   ├── data/
│   │   └── store.js              # In-memory store with real-world Indore lots
│   └── routes/
│       ├── locations.js          # GET /api/locations (Filter by category, search)
│       ├── slots.js              # GET /api/slots/:locationId (Live slot grid)
│       ├── bookings.js           # GET & POST /api/bookings (Create, cancel)
│       ├── payment.js            # POST /api/payment/verify, /api/payment/apply-coupon
│       └── profile.js            # GET & POST /api/profile (Vehicles, notifications)
│
├── package.json                  # Root runner script
└── README.md
```

---

## 🗺️ Interactive Map (Indore Pilot Lots)

The home screen features an interactive **Leaflet.js** map centered on **Vijay Nagar, Indore (`22.7533, 75.8937`)**:

1. **Custom Parking Markers**: Styled green pins with real-time available slot pill badges:
   - *Central Parking* (Vijay Nagar) – `20 slots available`
   - *Phoenix Citadel Parking* (MR 10 Junction) – `38 slots available`
   - *C21 Mall Parking* (AB Road) – `14 slots available`
   - *Treasure Island Parking* (MG Road) – `18 slots available`
   - *Brilliant Convention Centre* (Scheme 78) – `45 slots available`
2. **User Location Beacon**: Pulsing blue radar marker representing the driver's current position.
3. **Interactive Actions**:
   - Tapping any pin centers the map and dynamically updates the floating preview card with rates, ratings, and distance.
   - Recenter button (🎯) flies smoothly back to user location.
   - Map style toggle (🗺️) switches between Clean Light, OpenStreetMap, and Dark Mode.
   - Category chips (Car, Bike, EV, Covered) filter pins on the fly.
   - Search bar filters locations and automatically focuses matching parking lots.

---

## 📱 Single App Layout & 9 Unified Views

The application runs in a unified mobile device shell with smooth transitions, persistent status bar, bottom navigation, and URL hash routing (`#/home`, `#/detail`, `#/slots`, `#/confirmed`, `#/bookings`, `#/active`, `#/payment`, `#/history`, `#/profile`):

- **Home**: Map, category filters, search, and nearby card.
- **Details**: Photos, amenities, real-time availability breakdown, rate cards, date & duration picker.
- **Slots**: Floor selection (B1, B2, Ground), interactive slot picker with selection memory.
- **Confirmed**: Animated confetti, checkmark circle, QR entry pass, booking ID, directions.
- **Bookings**: Filter tabs (Upcoming, Active, Completed, Cancelled), cancellation dialogs.
- **Active**: Real-time hh:mm:ss countdown timer with exit button to payment.
- **Payment**: Summary breakdown, UPI (with VPA validation), Card (auto-formatting), Wallet, `PARK10` coupon code.
- **History**: Completed & cancelled past sessions with transaction receipts.
- **Profile**: Verified driver badge, savings statistics, vehicle registration manager.

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend status & version |
| `GET` | `/api/locations` | List parking lots (supports `?filter=` and `?search=`) |
| `GET` | `/api/locations/:id` | Get single parking lot details |
| `GET` | `/api/slots/:locationId` | Get live slot occupancy grid (`?level=b1`) |
| `POST` | `/api/slots/:locationId/select` | Reserve a parking slot |
| `GET` | `/api/bookings` | Retrieve user bookings & past history |
| `POST` | `/api/bookings` | Create new parking booking with QR data |
| `POST` | `/api/bookings/:id/cancel` | Cancel booking and issue refund |
| `POST` | `/api/payment/verify` | Process UPI / Card / Wallet payment |
| `POST` | `/api/payment/apply-coupon` | Apply promo discount (Code: `PARK10`) |
| `GET` | `/api/profile` | Get user profile and saved vehicles |
| `POST` | `/api/profile/vehicle` | Add new vehicle registration |
