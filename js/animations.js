/* animations.js — Scroll reveal, counters, parallax */

const Animations = {
  observer: null,

  init() {
    this._initScrollReveal();
    this._initParallax();
  },

  _initScrollReveal() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Counter animation
          if (entry.target.hasAttribute('data-count')) {
            this.animateCounter(entry.target);
          }
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    this.observeReveal();
  },

  observeReveal() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      this.observer?.observe(el);
    });
    document.querySelectorAll('[data-count]').forEach(el => {
      this.observer?.observe(el);
    });
  },

  animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const start    = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  _initParallax() {
    const blobs = document.querySelectorAll('.hero-blob');
    if (!blobs.length) return;
    let ticking = false;
    document.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          blobs.forEach((blob, i) => {
            const rate = i === 0 ? 0.15 : -0.1;
            blob.style.transform = `translateY(${scrollY * rate}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  },

  // Stagger cards entrance on project list render
  staggerCards(containerId, delayStep = 80) {
    const cards = document.querySelectorAll(`#${containerId} .project-card`);
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.4s ease ${i * delayStep}ms, transform 0.4s ease ${i * delayStep}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  }
};

window.Animations = Animations;
