// Animations - Intersection Observer for Scroll Effects
(function() {
  'use strict';
  
  // Fade-in animation on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with .fade-in class
  document.querySelectorAll('.fade-in, .metric-card, .content-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Counter Animation for Numbers
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  // Observe metric cards for counter animation
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const value = entry.target.querySelector('.metric-value[data-count]');
        if (value && !value.classList.contains('counted')) {
          value.classList.add('counted');
          animateCounter(value);
        }
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.metric-card').forEach(card => {
    metricsObserver.observe(card);
  });
  
})();
