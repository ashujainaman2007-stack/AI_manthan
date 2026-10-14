// ── ParkFlow Master Application Controller (Single App Router) ──
window.ParkFlowApp = (function () {

  // Supported Views
  const VIEWS = [
    'home',
    'detail',
    'slots',
    'confirmed',
    'bookings',
    'active',
    'payment',
    'history',
    'profile'
  ];

  // Navigation mapping to bottom tabs
  const NAV_TAB_MAP = {
    home: 'nav-home',
    bookings: 'nav-bookings',
    active: 'nav-bookings',
    confirmed: 'nav-bookings',
    history: 'nav-bookings',
    payment: 'nav-wallet',
    profile: 'nav-profile'
  };

  let currentView = 'home';
  let historyStack = ['home'];

  function navigateTo(viewName, data = null) {
    if (!VIEWS.includes(viewName)) {
      viewName = 'home';
    }

    currentView = viewName;

    // Save state if passed
    if (data) {
      if (data.lot) sessionStorage.setItem('currentLot', JSON.stringify(data.lot));
      if (data.slot) sessionStorage.setItem('selectedSlot', data.slot);
    }

    // Toggle active views
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetEl = document.getElementById(`view-${viewName}`);
    if (targetEl) {
      targetEl.classList.add('active');
    }

    // Update bottom nav highlighting
    document.querySelectorAll('.bottom-nav .nav-item').forEach(tab => tab.classList.remove('active'));
    const activeNavId = NAV_TAB_MAP[viewName];
    if (activeNavId) {
      const navItem = document.getElementById(activeNavId);
      if (navItem) navItem.classList.add('active');
    }

    // Update quick demo buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Reset scroll
    const viewport = document.querySelector('.app-view-viewport');
    if (viewport) viewport.scrollTop = 0;

    // If home view, refresh map rendering
    if (viewName === 'home' && window.ParkMap) {
      setTimeout(() => {
        window.ParkMap.invalidate();
      }, 150);
    }

    // If active view, ensure countdown timer is running
    if (viewName === 'active' && window.ActiveParking) {
      window.ActiveParking.startTimer();
    }

    // Update URL hash without reload
    if (window.location.hash !== `#/${viewName}`) {
      window.location.hash = `#/${viewName}`;
    }

    // Re-initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function handleHashRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase() || 'home';
    if (VIEWS.includes(hash)) {
      navigateTo(hash);
    } else {
      navigateTo('home');
    }
  }

  function init() {
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashRoute);

    // Initial route
    handleHashRoute();

    // Setup global live clock
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      document.querySelectorAll('.status-bar .time').forEach(el => {
        el.textContent = `${hours}:${minutes}`;
      });
    }
    updateClock();
    setInterval(updateClock, 30000);

    // Attach click listeners for [data-view-target]
    document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-view-target]');
      if (targetBtn) {
        e.preventDefault();
        const targetView = targetBtn.dataset.viewTarget;
        navigateTo(targetView);
      }
    });

    // Lucide Icons init
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  return {
    init: init,
    navigateTo: navigateTo,
    getCurrentView: () => currentView
  };
})();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  ParkFlowApp.init();

  // Initialize Map
  if (window.ParkMap) {
    window.ParkMap.init('leaflet-map');
  }
});

// ── Ripple effect on buttons ──────────────────
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-green, .btn-red, .btn-outline');
  if (!btn) return;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  ripple.style.cssText = `
    position:absolute;width:6px;height:6px;border-radius:50%;
    background:rgba(255,255,255,0.4);
    top:${e.clientY - rect.top - 3}px;left:${e.clientX - rect.left - 3}px;
    transform:scale(0);animation:ripple 0.5s ease-out forwards;pointer-events:none;
  `;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes ripple{to{transform:scale(30);opacity:0}}';
document.head.appendChild(rippleStyle);
