// Detail page & view logic
document.addEventListener('DOMContentLoaded', () => {

  // Favourite toggle
  const favBtn = document.getElementById('fav-btn');
  let faved = false;
  favBtn?.addEventListener('click', () => {
    faved = !faved;
    favBtn.classList.toggle('faved', faved);
    alert(faved ? '❤️ Added to saved parking lots!' : 'Removed from saved lots');
  });

  // Duration → Price calculation
  const rates = { 2: 40, 4: 70, 6: 100, 12: 180 };
  const durSel = document.getElementById('duration-sel');
  const totalEl = document.getElementById('detail-total-amt') || document.getElementById('total-amt');

  durSel?.addEventListener('change', () => {
    const val = durSel.value;
    const price = rates[val] || 40;
    if (totalEl) totalEl.textContent = `₹${price}`;
    sessionStorage.setItem('duration', `${val} Hours`);
    sessionStorage.setItem('total', price);
  });

  // Arrival time selection
  const arrivalSel = document.getElementById('arrival-time');
  arrivalSel?.addEventListener('change', () => {
    sessionStorage.setItem('arrival', arrivalSel.value);
  });

  // Refresh lot details from session
  function refreshDetailsFromSession() {
    try {
      const raw = sessionStorage.getItem('currentLot');
      if (raw) {
        const lot = JSON.parse(raw);
        const nameEl = document.getElementById('dt-name');
        const ratingEl = document.getElementById('dt-rating');
        const distEl = document.getElementById('dt-dist');
        const addrEl = document.getElementById('dt-addr');

        if (nameEl) nameEl.textContent = lot.name;
        if (ratingEl) ratingEl.textContent = `${lot.rating} (${lot.reviews || '100+'} reviews)`;
        if (distEl) distEl.textContent = lot.distance || '850 m';
        if (addrEl) addrEl.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;color:var(--green)"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${lot.address}
        `;
      }
    } catch (e) {}
  }
  refreshDetailsFromSession();
  window.addEventListener('hashchange', refreshDetailsFromSession);
});
