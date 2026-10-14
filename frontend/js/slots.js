// Slot Selection logic
document.addEventListener('DOMContentLoaded', () => {

  let selectedSlot = 'A12';

  // Level tab switching
  const tabs = document.querySelectorAll('.level-tab');
  const levelNames = { b1: 'Basement 1', b2: 'Basement 2', g: 'Ground Floor' };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const floorEls = document.querySelectorAll('#spa-sel-slot-floor, #sel-slot-floor');
      floorEls.forEach(el => {
        el.textContent = levelNames[tab.dataset.level] || 'Basement 1';
      });
    });
  });

  // Slot click handling
  const slots = document.querySelectorAll('.slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      if (slot.classList.contains('occupied') || slot.classList.contains('reserved')) {
        alert('This slot is already occupied or reserved. Please choose an available green slot.');
        return;
      }

      // Deselect old
      const prev = document.querySelectorAll('.slot.selected');
      prev.forEach(p => {
        p.classList.remove('selected');
        p.classList.add('available');
      });

      // Select new
      slot.classList.remove('available');
      slot.classList.add('selected');
      selectedSlot = slot.dataset.slot || 'A12';

      // Update info bars
      const idEls = document.querySelectorAll('#spa-sel-slot-id, #sel-slot-id, #conf-slot-val, #conf-slot');
      idEls.forEach(el => {
        el.textContent = selectedSlot.replace(/([A-Z])(\d+)/, '$1-$2');
      });

      // Store in session
      sessionStorage.setItem('selectedSlot', selectedSlot);
    });
  });

  // Confirm button handler
  document.querySelectorAll('#confirm-slot-btn, #confirm-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      sessionStorage.setItem('selectedSlot', selectedSlot);
      if (window.ParkFlowApp) {
        window.ParkFlowApp.navigateTo('confirmed');
      }
    });
  });
});
