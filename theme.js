/* ═══════════════════════════════════════════════════════════
   THEME.JS — Dark / Light theme controller
   ─────────────────────────────────────────────────────────
   • Auto-detects device theme on first visit
   • Remembers user's manual choice (localStorage)
   • Toggle button switches between modes
   • Listens for system theme changes
   ═══════════════════════════════════════════════════════════ */

   (function () {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('themeToggle');
    const STORAGE_KEY = 'ashish-portfolio-theme';
  
    /* ─── Get current theme from <html data-theme="..."> ─── */
    function getCurrentTheme() {
      return root.getAttribute('data-theme') || 'dark';
    }
  
    /* ─── Apply theme + save preference ─── */
    function setTheme(theme) {
      root.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
  
      // Update mobile browser address bar color
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', theme === 'dark' ? '#0a0e1a' : '#f8fafc');
  
      // Update toggle button accessibility label
      if (toggleBtn) {
        toggleBtn.setAttribute(
          'aria-label',
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
      }
    }
  
    /* ─── Toggle on button click ─── */
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    }
  
    /* ─── React to system theme change (only if user never chose manually) ─── */
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', (e) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    });
  
    /* ─── Keyboard shortcut: press "T" to toggle theme (bonus) ─── */
    document.addEventListener('keydown', (e) => {
      // Ignore if typing inside an input or textarea
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
  
      if (e.key === 't' || e.key === 'T') {
        setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
      }
    });
  
    /* ─── Make sure button label is correct on load ─── */
    setTheme(getCurrentTheme());
  
  })();