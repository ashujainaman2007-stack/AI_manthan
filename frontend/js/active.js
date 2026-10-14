// Active Parking JS – Live Countdown Timer
document.addEventListener('DOMContentLoaded', () => {

  // Start timer from 1h 20m 15s
  let totalSeconds = (1 * 3600) + (20 * 60) + 15;

  function updateTimer() {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      document.getElementById('t-hours').textContent = '00';
      document.getElementById('t-mins').textContent  = '00';
      document.getElementById('t-secs').textContent  = '00';
      // Redirect to payment when time runs out
      setTimeout(() => { window.location.href = 'payment.html'; }, 1000);
      return;
    }
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    document.getElementById('t-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('t-mins').textContent  = String(m).padStart(2, '0');
    document.getElementById('t-secs').textContent  = String(s).padStart(2, '0');

    // Flash red when under 10 minutes
    const numEls = document.querySelectorAll('.t-num, .t-colon');
    if (totalSeconds < 600) {
      numEls.forEach(el => el.style.color = 'var(--red)');
      document.querySelector('.timer-card').style.background = 'var(--red-light)';
      document.querySelector('.timer-card').style.borderColor = '#f5c6c3';
      document.querySelector('.timer-label').style.color = 'var(--red)';
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);

  // Directions
  document.getElementById('act-dir-btn')?.addEventListener('click', () => {
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
