// contact.js

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Form submission handler
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Show loading state on button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch('https://formspree.io/f/mqejwkpv', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });

        if (response.ok) {
          // Success — show green message and reset form
          formMessage.textContent = '✅ Thank you! Your message has been sent.';
          formMessage.className = 'form-message success';
          form.reset();
        } else {
          // Server returned an error
          formMessage.textContent = '❌ Something went wrong. Please try again.';
          formMessage.className = 'form-message error';
        }
      } catch (err) {
        // Network error
        formMessage.textContent = '❌ Network error. Please check your connection and try again.';
        formMessage.className = 'form-message error';
      } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        // Hide message after 6 seconds
        setTimeout(() => {
          formMessage.className = 'form-message';
        }, 6000);
      }
    });
  }
});
