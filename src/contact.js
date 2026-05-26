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

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real scenario, this is where you'd make a fetch request to a backend/service
      // For static demo purposes, we'll just show the success message
      
      formMessage.classList.add('success');
      form.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.classList.remove('success');
      }, 5000);
    });
  }
});
