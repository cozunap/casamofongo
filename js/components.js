/**
 * La Casa Del Mofongo - Shared Component Logic
 * Header sticky scroll, mobile navigation toggle & reservation handlers
 */

(function () {
  // 1. Render Header Placeholder
  const headerEl = document.getElementById('header-placeholder');
  let currentFile = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  if (!currentFile.includes('.')) {
    currentFile += '.html';
  }

  function getActive(page) {
    if (page === 'index.html' && (currentFile === '' || currentFile === 'index.html')) {
      return 'active';
    }
    return currentFile === page ? 'active' : '';
  }

  if (headerEl) {
    headerEl.innerHTML = `
      <header class="site-header" id="site-header">
        <div class="header-container">
          <a href="index.html" class="header-brand" aria-label="La Casa Del Mofongo">
            <img src="assets/images/logo.svg" alt="La Casa Del Mofongo Logo" class="header-logo-img">
          </a>

          <nav class="nav-menu" aria-label="Main Menu">
            <a href="index.html" class="nav-link ${getActive('index.html')}">Home</a>
            <a href="menu.html" class="nav-link ${getActive('menu.html')}">Menu</a>
            <a href="about.html" class="nav-link ${getActive('about.html')}">About Us</a>
            <a href="gallery.html" class="nav-link ${getActive('gallery.html')}">Our Gallery</a>
            <a href="contact.html" class="nav-link ${getActive('contact.html')}">Contact</a>
          </nav>

          <a href="tel:+12408633750" class="nav-reservation-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Reservation: (240) 863-3750</span>
          </a>

          <button class="mobile-menu-btn" id="mobile-toggle" aria-label="Open Navigation Menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="mobile-nav-drawer" id="mobile-drawer">
          <a href="index.html" class="${getActive('index.html')}">Home</a>
          <a href="menu.html" class="${getActive('menu.html')}">Menu</a>
          <a href="about.html" class="${getActive('about.html')}">About Us</a>
          <a href="gallery.html" class="${getActive('gallery.html')}">Our Gallery</a>
          <a href="contact.html" class="${getActive('contact.html')}">Contact</a>
          <a href="tel:+12408633750" style="color: var(--color-primary-light); font-weight: 700;">Reservation: (240) 863-3750</a>
        </div>
      </header>
    `;

    // Sticky Scroll Behavior
    const headerNav = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        headerNav.classList.add('is-sticky');
      } else {
        headerNav.classList.remove('is-sticky');
      }
    });

    // Mobile Toggle
    const toggleBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        drawer.classList.toggle('is-open');
      });
    }
  }

  // 2. Render Footer Placeholder
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) {
    footerEl.innerHTML = `
      <footer class="site-footer">
        <div class="footer-top">
          <div class="footer-top-container">
            <div class="footer-brand">
              <img src="assets/images/logo.svg" alt="La Casa Del Mofongo Logo" class="footer-logo-img">
              <p style="color: #ffffff; font-weight: 700; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.08em;">
                La Casa Del Mofongo MD
              </p>
            </div>

            <div class="footer-col">
              <h4>LOCATION</h4>
              <p>9441 Georgia Ave</p>
              <p>Silver Spring, MD 20910, USA</p>
              <p style="margin-top: 0.5rem;"><a href="tel:+12408633750">(240) 863-3750</a></p>
            </div>

            <div class="footer-col">
              <h4>OPENING HOURS</h4>
              <p>MON-THU 11am - 10pm</p>
              <p>FRI-SUN 11am - 2am</p>
              <p style="margin-top: 0.5rem; font-size: 0.85rem; opacity: 0.9;">Great cocktails &bull; Happy hour food &bull; Kids' menu</p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>Copyright &copy; ${new Date().getFullYear()} La Casa Del Mofongo MD. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  // 3. Simple Form Handlers
  const forms = document.querySelectorAll('form[data-ajax-form]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = form.querySelector('.form-success-msg');
      if (successMsg) {
        successMsg.style.display = 'block';
      }
      form.reset();
      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
      }, 5000);
    });
  });
})();
