// ── Home View Controller & Coordination ──
document.addEventListener('DOMContentLoaded', () => {

  // Category Chip Filters
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter || 'all';
      if (window.ParkMap && window.ParkMap.filterCategory) {
        window.ParkMap.filterCategory(filter);
      }
    });
  });

  // Search input with real-time map filtering
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value;
      debounceTimer = setTimeout(() => {
        if (window.ParkMap && window.ParkMap.searchLocations) {
          window.ParkMap.searchLocations(query);
        }
      }, 200);
    });
  }

  // Location selector click
  const locBar = document.querySelector('.location-bar');
  if (locBar) {
    locBar.style.cursor = 'pointer';
    locBar.addEventListener('click', () => {
      const city = prompt('Enter city or area to search (e.g. Vijay Nagar, MR 10, MG Road):', 'Vijay Nagar, Indore');
      if (city) {
        document.getElementById('current-city-label').textContent = city;
        if (window.ParkMap) window.ParkMap.searchLocations(city);
      }
    });
  }
});
