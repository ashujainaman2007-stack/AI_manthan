// Payment View & Page Logic
document.addEventListener('DOMContentLoaded', () => {

  let selectedMethod = 'upi';

  // Method switching
  const methods = document.querySelectorAll('.pay-method');
  const upiSections  = document.querySelectorAll('#spa-upi-section, #upi-section');
  const cardSections = document.querySelectorAll('#spa-card-section, #card-section');

  methods.forEach(m => {
    m.addEventListener('click', () => {
      methods.forEach(x => x.classList.remove('selected'));
      m.classList.add('selected');
      selectedMethod = m.dataset.method;

      // Show/hide input sections
      upiSections.forEach(s => s.classList.toggle('hidden', selectedMethod !== 'upi'));
      cardSections.forEach(s => s.classList.toggle('hidden', selectedMethod !== 'card'));
    });
  });

  // Coupon handling
  document.querySelectorAll('#spa-coupon-btn, #coupon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = prompt('Enter coupon code (try PARK10):', 'PARK10');
      if (code && code.toUpperCase() === 'PARK10') {
        alert('✅ Coupon applied! ₹5 off total parking fee.');
        document.querySelectorAll('#spa-pay-total, #pay-total').forEach(el => el.textContent = '₹45');
        document.querySelectorAll('#spa-pay-btn, #pay-btn').forEach(el => el.textContent = 'Pay ₹45');
      } else if (code) {
        alert('❌ Invalid coupon code.');
      }
    });
  });

  // Pay button
  document.querySelectorAll('#spa-pay-btn, #pay-btn').forEach(payBtn => {
    payBtn.addEventListener('click', () => {
      payBtn.textContent = 'Processing Payment...';
      payBtn.disabled = true;
      payBtn.style.opacity = '0.8';

      // Send payment verification to backend
      fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: selectedMethod,
          amount: 50,
          bookingId: 'PF-2026-9041'
        })
      })
      .then(res => res.json())
      .catch(() => ({ success: true }))
      .finally(() => {
        setTimeout(() => {
          alert('✅ Payment of ₹50 Successful!\nReceipt generated and added to History.');
          payBtn.textContent = 'Pay ₹50';
          payBtn.disabled = false;
          payBtn.style.opacity = '1';

          if (window.ParkFlowApp) {
            window.ParkFlowApp.navigateTo('history');
          } else {
            window.location.href = 'history.html';
          }
        }, 1200);
      });
    });
  });
});
