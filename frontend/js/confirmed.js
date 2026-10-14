// Confirmed Page JS
document.addEventListener('DOMContentLoaded', () => {

  // Pull slot from session storage
  const slot = sessionStorage.getItem('selectedSlot') || 'A12';
  const confSlot = document.getElementById('conf-slot');
  if (confSlot) confSlot.textContent = slot.replace(/([A-Z])(\d+)/, '$1-$2');

  // Directions button
  document.getElementById('directions-btn')?.addEventListener('click', () => {
    // Open maps with coordinates for Vijay Nagar, Indore
    window.open('https://maps.google.com/?q=Vijay+Nagar,+Indore', '_blank');
  });

  // Live clock
  function tick() {
    const now = new Date();
    const el = document.querySelector('.status-bar .time');
    if (el) el.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  }
  tick(); setInterval(tick, 60000);
});
