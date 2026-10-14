// Profile Page JS
document.addEventListener('DOMContentLoaded', () => {

  // Add Vehicle Prompt
  document.getElementById('add-vehicle-btn')?.addEventListener('click', () => {
    const plate = prompt('Enter Vehicle Registration Number (e.g., MP 09 XY 9999):');
    if (plate) {
      alert(`Vehicle "${plate.toUpperCase()}" added successfully!`);
    }
  });

  // Notifications Toggle
  const notifToggle = document.getElementById('notif-toggle');
  if (notifToggle) {
    let enabled = true;
    notifToggle.addEventListener('click', () => {
      enabled = !enabled;
      const badge = notifToggle.querySelector('.badge');
      if (badge) {
        badge.className = enabled ? 'badge badge-green' : 'badge badge-gray';
        badge.textContent = enabled ? 'Enabled' : 'Disabled';
      }
    });
  }

  // Help & Support
  document.getElementById('help-btn')?.addEventListener('click', () => {
    alert('ParkFlow Support Helpline:\n📞 1800-PARK-FLOW\n✉ support@parkflow.in\nAvailable 24x7');
  });

  // Logout
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
      alert('Logged out successfully.');
      window.location.href = '../index.html';
    }
  });

  // Live clock
  function tick() {
    const now = new Date();
    const el = document.querySelector('.status-bar .time');
    if (el) el.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  }
  tick(); setInterval(tick, 60000);
});
