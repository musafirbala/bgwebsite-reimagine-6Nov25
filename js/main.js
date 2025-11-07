// Main JavaScript - Core Functionality
// File: main.js

(function() {
  'use strict';
  
  // =================================================================
  // MOBILE MENU TOGGLE
  // =================================================================
  
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (mobileMenu.classList.contains('active')) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // =================================================================
  // STICKY HEADER
  // =================================================================
  
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // =================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =================================================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#main-content') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // =================================================================
  // FORM VALIDATION & SUBMISSION
  // =================================================================
  
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      // If form has Formspree or other action, let it handle naturally
      const action = form.getAttribute('action');
      if (!action || action === '#') {
        e.preventDefault();
        console.log('Form submitted (no action configured)');
      }
    });
  });
  
  // =================================================================
  // SET ACTIVE NAV LINK
  // =================================================================
  
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
  
  // =================================================================
  // CONSOLE WELCOME MESSAGE
  // =================================================================
  
  console.log('%c👋 Welcome to Balaji Ganapathy\'s Portfolio', 'font-size: 16px; font-weight: bold; color: #0A7B83');
  console.log('%cBuilt with purpose, people & technology', 'font-size: 12px; color: #64748B');
  
})();
