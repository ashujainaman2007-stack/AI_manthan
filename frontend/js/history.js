// Parking History Page JS
document.addEventListener('DOMContentLoaded', () => {

  // Tab Filtering (All / Completed / Cancelled)
  const tabs = document.querySelectorAll('.hist-tab');
  const cards = document.querySelectorAll('.hist-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.hf; // 'all', 'completed', 'cancelled'

      cards.forEach(card => {
        const status = card.dataset.status;
        if (filter === 'all' || status === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.2s ease-in-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Re-init Lucide if present
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
