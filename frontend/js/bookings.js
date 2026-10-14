// Bookings Page JS
document.addEventListener('DOMContentLoaded', () => {

  // Filter tab switching
  const tabs = document.querySelectorAll('.bk-tab');
  const sections = document.querySelectorAll('.bk-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      // Show/hide sections
      sections.forEach(sec => {
        if (filter === 'upcoming' || filter === 'active') {
          sec.style.display = sec.dataset.section === filter ? 'block' : 'none';
        } else if (filter === 'completed') {
          sec.style.display = 'none'; // demo: no completed items shown
          showEmpty('No completed bookings yet.');
        } else if (filter === 'cancelled') {
          sec.style.display = 'none'; // demo: no cancelled items shown
          showEmpty('No cancelled bookings.');
        } else {
          sec.style.display = 'block';
        }
      });

      if (filter === 'upcoming' || filter === 'active') {
        removeEmpty();
      }
    });
  });

  // Show all by default
  sections.forEach(s => s.style.display = 'block');

  function showEmpty(msg) {
    removeEmpty();
    const el = document.createElement('div');
    el.id = 'empty-msg';
    el.style.cssText = 'text-align:center;padding:40px 20px;color:var(--text-3);font-size:14px;font-weight:500';
    el.innerHTML = `
      <div style="font-size:44px;margin-bottom:10px">📋</div>
      <div>${msg}</div>
      <a href="history.html" style="display:inline-block;margin-top:14px;padding:8px 16px;background:var(--green);color:#fff;border-radius:20px;text-decoration:none;font-weight:600;font-size:12px">View Full History →</a>
    `;
    document.getElementById('bk-list')?.appendChild(el);
  }
  function removeEmpty() {
    document.getElementById('empty-msg')?.remove();
  }

  // Cancel booking
  document.getElementById('bk-cancel-1')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to cancel this booking?')) {
      const card = document.getElementById('bk-central');
      card.style.opacity = '0.4';
      card.style.pointerEvents = 'none';
      alert('Booking cancelled successfully. Refund will be processed within 3-5 business days.');
    }
  });

  // Directions
  document.getElementById('bk-dir-1')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open('https://maps.google.com/?q=Central+Parking+Vijay+Nagar+Indore', '_blank');
  });

  // Live clock
  function tick() {
    const now = new Date();
    const el = document.querySelector('.status-bar .time');
    if (el) el.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  }
  tick(); setInterval(tick, 60000);
});
