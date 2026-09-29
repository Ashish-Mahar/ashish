/* ═══════════════════════════════════════════════════════════
   SCRIPT.JS — Portfolio interactions
   ═══════════════════════════════════════════════════════════ */

/* ─── 1. TYPING EFFECT ─── */
(function () {
    const roles = [
      "AI Website Creator 💻",
      "Robotics Tutor 🤖",
      "Python Developer 🐍",
      "Cyber Security Enthusiast 🔐",
      "IoT Builder ⚡",
      "Student. Builder. Teacher. 🚀"
    ];
  
    const el = document.getElementById('typed');
    if (!el) return;
  
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseEnd = 0;
  
    function type() {
      const current = roles[roleIndex];
  
      if (!deleting) {
        el.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
          deleting = true;
          pauseEnd = Date.now() + 1400;
        }
      } else {
        el.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
  
      // Pause at end of typing
      if (pauseEnd && Date.now() < pauseEnd) {
        setTimeout(type, 100);
        return;
      }
      pauseEnd = 0;
  
      setTimeout(type, deleting ? 35 : 85);
    }
  
    type();
  })();
  
  /* ─── 2. MOBILE MENU ─── */
  (function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
  
    if (!hamburger || !navLinks) return;
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  })();
  
  /* ─── 3. ANIMATED STAT COUNTERS ─── */
  (function () {
    const stats = document.querySelectorAll('.stat h3[data-count]');
    if (!stats.length) return;
  
    function animateCount(el) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1600; // ms
      const start = performance.now();
  
      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
  
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    }
  
    // Trigger when stats bar enters viewport
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach(animateCount);
            observer.unobserve(statsBar);
          }
        });
      },
      { threshold: 0.3 }
    );
  
    observer.observe(statsBar);
  })();
  
  /* ─── 4. SKILL BAR ANIMATION ─── */
  (function () {
    const bars = document.querySelectorAll('.bar i');
    if (!bars.length) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
  
    bars.forEach((bar) => observer.observe(bar));
  })();
  
  /* ─── 5. SCROLL REVEAL ─── */
  (function () {
    // Auto-tag major sections & cards for reveal
    const targets = document.querySelectorAll(
      '.section-title, .section-sub, .about-text, .skills-box, .card, .workshop-box, .cta-card, .quick-contact, .info-grid > div'
    );
    if (!targets.length) return;
  
    targets.forEach((el) => el.classList.add('reveal'));
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  
    targets.forEach((el) => observer.observe(el));
  })();
  
  /* ─── 6. BACK TO TOP BUTTON ─── */
  (function () {
    const btn = document.getElementById('backTop');
    if (!btn) return;
  
    function toggleVisibility() {
      if (window.scrollY > 500) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }
  
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  })();
  
  /* ─── 7. AUTO YEAR IN FOOTER ─── */
  (function () {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();
  
  /* ─── 8. SMOOTH SCROLL FOR OLD BROWSERS ─── */
  (function () {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#' || id.length < 2) return;
  
        const target = document.querySelector(id);
        if (!target) return;
  
        e.preventDefault();
        const offset = 75; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  })();
  
  /* ─── 9. NAVBAR SHADOW ON SCROLL ─── */
  (function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
  
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 20) {
          navbar.style.boxShadow = '0 6px 25px rgba(0,0,0,0.15)';
        } else {
          navbar.style.boxShadow = 'none';
        }
      },
      { passive: true }
    );
  })();