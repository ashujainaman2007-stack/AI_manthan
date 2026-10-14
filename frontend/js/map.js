// ── Interactive Leaflet Map Controller for Indore ──
window.ParkMap = (function () {
  let mapInstance = null;
  let markersLayer = null;
  let userMarker = null;
  let activeTileIndex = 0;
  let tileLayerInstance = null;

  // Default User Location: Vijay Nagar, Indore
  const USER_LOCATION = { lat: 22.7533, lng: 75.8937 };

  // Map Tile Providers
  const TILE_PROVIDERS = [
    {
      name: 'Clean Light',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: { maxZoom: 19, attribution: '© CartoDB © OpenStreetMap' }
    },
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: { maxZoom: 19, attribution: '© OpenStreetMap contributors' }
    },
    {
      name: 'Dark Mode',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      options: { maxZoom: 19, attribution: '© CartoDB' }
    }
  ];

  // Parking Lots in Indore
  const PARKING_LOTS = [
    {
      id: 'central-parking',
      name: 'Central Parking',
      address: 'Vijay Nagar, Indore',
      lat: 22.7533,
      lng: 75.8937,
      rating: 4.6,
      reviews: '120+',
      ratePerHour: 40,
      slotsAvailable: 20,
      totalSlots: 50,
      distance: '86m',
      categories: ['car', 'bike', 'ev', 'covered'],
      theme: 'green'
    },
    {
      id: 'phoenix-citadel',
      name: 'Phoenix Citadel Parking',
      address: 'MR 10 Junction, Indore',
      lat: 22.7665,
      lng: 75.8988,
      rating: 4.8,
      reviews: '340+',
      ratePerHour: 50,
      slotsAvailable: 38,
      totalSlots: 120,
      distance: '1.2km',
      categories: ['car', 'bike', 'covered', 'ev'],
      theme: 'orange'
    },
    {
      id: 'c21-mall',
      name: 'C21 Mall Parking',
      address: 'AB Road, Scheme 54, Indore',
      lat: 22.7485,
      lng: 75.8920,
      rating: 4.4,
      reviews: '95+',
      ratePerHour: 30,
      slotsAvailable: 14,
      totalSlots: 60,
      distance: '650m',
      categories: ['car', 'bike'],
      theme: 'blue'
    },
    {
      id: 'treasure-island',
      name: 'Treasure Island Parking',
      address: 'MG Road, South Tukoganj, Indore',
      lat: 22.7215,
      lng: 75.8790,
      rating: 4.5,
      reviews: '210+',
      ratePerHour: 40,
      slotsAvailable: 18,
      totalSlots: 80,
      distance: '3.4km',
      categories: ['car', 'bike', 'covered'],
      theme: 'green'
    },
    {
      id: 'brilliant-convention',
      name: 'Brilliant Convention Centre',
      address: 'Scheme 78, Vijay Nagar, Indore',
      lat: 22.7602,
      lng: 75.8845,
      rating: 4.7,
      reviews: '165+',
      ratePerHour: 50,
      slotsAvailable: 45,
      totalSlots: 150,
      distance: '1.8km',
      categories: ['car', 'bike', 'ev', 'covered'],
      theme: 'orange'
    }
  ];

  function initMap(containerId = 'leaflet-map') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
      console.warn('Leaflet not yet loaded, retrying...');
      setTimeout(() => initMap(containerId), 250);
      return;
    }

    // Avoid duplicate initialization
    if (mapInstance) {
      mapInstance.invalidateSize();
      return;
    }

    try {
      // Create map
      mapInstance = L.map(containerId, {
        center: [USER_LOCATION.lat, USER_LOCATION.lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      // Add Tile Layer
      setTileLayer(0);

      // Create Markers Layer
      markersLayer = L.layerGroup().addTo(mapInstance);

      // Add User Location Beacon
      addUserBeacon();

      // Render Parking Markers
      renderParkingMarkers(PARKING_LOTS);

      // Setup Floating Controls
      setupControls();

      // Trigger map resize after layout settlement
      setTimeout(() => {
        if (mapInstance) mapInstance.invalidateSize();
      }, 300);

    } catch (err) {
      console.error('Error initializing Leaflet map:', err);
    }
  }

  function setTileLayer(index) {
    if (!mapInstance) return;
    if (tileLayerInstance) {
      mapInstance.removeLayer(tileLayerInstance);
    }
    activeTileIndex = index % TILE_PROVIDERS.length;
    const provider = TILE_PROVIDERS[activeTileIndex];
    tileLayerInstance = L.tileLayer(provider.url, provider.options).addTo(mapInstance);
  }

  function addUserBeacon() {
    if (!mapInstance) return;
    const beaconIcon = L.divIcon({
      className: 'user-beacon-wrapper',
      html: `
        <div class="user-location-marker">
          <div class="user-beacon-wave"></div>
          <div class="user-beacon-center"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    userMarker = L.marker([USER_LOCATION.lat, USER_LOCATION.lng], {
      icon: beaconIcon,
      zIndexOffset: 500
    }).addTo(mapInstance);
  }

  function renderParkingMarkers(lots) {
    if (!markersLayer) return;
    markersLayer.clearLayers();

    lots.forEach((lot) => {
      const markerHtml = `
        <div class="custom-parking-marker" id="marker-${lot.id}">
          <div class="marker-pill">${lot.slotsAvailable} slots</div>
          <div class="marker-pin-body">
            <span>P</span>
          </div>
          <div class="marker-pin-shadow"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'parking-marker-wrap',
        html: markerHtml,
        iconSize: [40, 52],
        iconAnchor: [20, 50]
      });

      const marker = L.marker([lot.lat, lot.lng], { icon: customIcon });

      marker.on('click', () => {
        selectParkingLot(lot);
      });

      markersLayer.addLayer(marker);
    });
  }

  function selectParkingLot(lot) {
    if (!mapInstance) return;

    // Pan map smoothly to marker
    mapInstance.flyTo([lot.lat, lot.lng], 16, {
      animate: true,
      duration: 0.8
    });

    // Update active marker styling
    document.querySelectorAll('.custom-parking-marker').forEach(m => m.classList.remove('active-pin'));
    const el = document.getElementById(`marker-${lot.id}`);
    if (el) el.classList.add('active-pin');

    // Update the floating Nearby Card
    updateNearbyCard(lot);
  }

  function updateNearbyCard(lot) {
    const card = document.getElementById('nearby-card');
    if (!card) return;

    // Update thumb class
    const thumb = card.querySelector('.nearby-thumb');
    if (thumb) {
      thumb.className = `nearby-thumb nearby-thumb-${lot.theme || 'green'}`;
    }

    // Update name
    const nameEl = card.querySelector('.nearby-name');
    if (nameEl) {
      nameEl.innerHTML = `
        ${lot.name}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;margin-left:2px"><polyline points="9 18 15 12 9 6"/></svg>
      `;
    }

    // Update rating
    const ratingEl = card.querySelector('.nearby-rating');
    if (ratingEl) {
      ratingEl.innerHTML = `
        <svg viewBox="0 0 24 24" stroke="#FFB800" fill="#FFB800" stroke-width="1" style="width:13px;height:13px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        ${lot.rating} (${lot.reviews || '100+'})
      `;
    }

    // Update meta
    const metaEl = card.querySelector('.nearby-meta');
    if (metaEl) {
      metaEl.textContent = `₹${lot.ratePerHour}/hr · ${lot.slotsAvailable}/${lot.totalSlots} slots available`;
    }

    // Update distance
    const distEl = card.querySelector('.nearby-dist');
    if (distEl) {
      distEl.textContent = lot.distance || '100m';
    }

    // Save selection to session
    sessionStorage.setItem('currentLot', JSON.stringify(lot));

    // Flash card highlight
    card.style.transform = 'scale(1.02)';
    card.style.borderColor = 'var(--green)';
    setTimeout(() => {
      card.style.transform = 'scale(1)';
      card.style.borderColor = 'var(--border)';
    }, 250);
  }

  function setupControls() {
    // Recenter button
    const recenterBtn = document.getElementById('map-recenter-btn');
    if (recenterBtn && mapInstance) {
      recenterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mapInstance.flyTo([USER_LOCATION.lat, USER_LOCATION.lng], 15, {
          animate: true,
          duration: 0.8
        });
      });
    }

    // Layer toggle button
    const layerBtn = document.getElementById('map-layer-btn');
    if (layerBtn) {
      layerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setTileLayer(activeTileIndex + 1);
      });
    }

    // Zoom in
    document.getElementById('map-zoom-in')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (mapInstance) mapInstance.zoomIn();
    });

    // Zoom out
    document.getElementById('map-zoom-out')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (mapInstance) mapInstance.zoomOut();
    });
  }

  function filterCategory(category) {
    if (!category || category === 'all') {
      renderParkingMarkers(PARKING_LOTS);
    } else {
      const filtered = PARKING_LOTS.filter(l => l.categories.includes(category.toLowerCase()));
      renderParkingMarkers(filtered);
    }
  }

  function searchLocations(query) {
    if (!query) {
      renderParkingMarkers(PARKING_LOTS);
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = PARKING_LOTS.filter(l => 
      l.name.toLowerCase().includes(q) || 
      l.address.toLowerCase().includes(q)
    );
    renderParkingMarkers(matches);
    if (matches.length > 0 && mapInstance) {
      selectParkingLot(matches[0]);
    }
  }

  return {
    init: initMap,
    filterCategory: filterCategory,
    searchLocations: searchLocations,
    recenter: () => {
      if (mapInstance) mapInstance.flyTo([USER_LOCATION.lat, USER_LOCATION.lng], 15);
    },
    invalidate: () => {
      if (mapInstance) mapInstance.invalidateSize();
    }
  };
})();
