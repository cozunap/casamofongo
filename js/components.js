/**
 * La Casa Del Mofongo - Shared Components & Enhancements
 * Multi-page Navigation, Footer, Language Detection & Countdown Timer
 * Location: Silver Spring, Maryland (DMV Area)
 */

(function () {
  // 1. Language Detection & i18n Dictionary
  const userLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
  const isSpanish = userLang.startsWith('es');

  const i18n = {
    es: {
      brandSub: 'Comida Caribeña & Latina Casera • Maryland',
      navHome: 'Inicio',
      navMenuSneak: 'Especialidades',
      navLocations: 'Ubicación & Horario',
      navContact: 'Contacto',
      navVIP: 'Acceso VIP',
      rights: 'Todos los derechos reservados.',
      locationSummary: '9441 Georgia Ave, Silver Spring, MD 20910, Estados Unidos',
      openHours: 'Abierto todos los días • Cierra a las 10:00 PM',
      phone: '+1 240-863-3750'
    },
    en: {
      brandSub: 'Homestyle Caribbean & Latin Fare • Maryland',
      navHome: 'Home',
      navMenuSneak: 'Specialties',
      navLocations: 'Location & Hours',
      navContact: 'Contact',
      navVIP: 'VIP Access',
      rights: 'All rights reserved.',
      locationSummary: '9441 Georgia Ave, Silver Spring, MD 20910, United States',
      openHours: 'Open daily • Closes 10:00 PM',
      phone: '+1 240-863-3750'
    }
  };

  const texts = isSpanish ? i18n.es : i18n.en;

  // Determine active link based on current pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  function getActiveClass(page) {
    if (page === 'index.html' && (currentPath === '' || currentPath === 'index.html')) {
      return 'active';
    }
    return currentPath === page ? 'active' : '';
  }

  // 2. Render Site Header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a href="index.html" class="brand-logo" aria-label="La Casa Del Mofongo Home">
            <div class="brand-emblem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <div>
              La Casa Del <span class="highlight">Mofongo</span>
              <span class="brand-tagline-sub">${texts.brandSub}</span>
            </div>
          </a>

          <nav class="nav-links" aria-label="Main Navigation">
            <a href="index.html" class="nav-link ${getActiveClass('index.html')}">${texts.navHome}</a>
            <a href="menu.html" class="nav-link ${getActiveClass('menu.html')}">${texts.navMenuSneak}</a>
            <a href="locations.html" class="nav-link ${getActiveClass('locations.html')}">${texts.navLocations}</a>
            <a href="contact.html" class="nav-link ${getActiveClass('contact.html')}">${texts.navContact}</a>
          </nav>

          <a href="#vip-notify" class="nav-cta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>${texts.navVIP}</span>
          </a>

          <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Toggle navigation menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="mobile-menu-drawer" id="mobile-drawer">
          <a href="index.html" class="${getActiveClass('index.html')}">${texts.navHome}</a>
          <a href="menu.html" class="${getActiveClass('menu.html')}">${texts.navMenuSneak}</a>
          <a href="locations.html" class="${getActiveClass('locations.html')}">${texts.navLocations}</a>
          <a href="contact.html" class="${getActiveClass('contact.html')}">${texts.navContact}</a>
          <a href="#vip-notify" class="nav-cta" style="text-align: center; justify-content: center; margin-top: 0.5rem;">${texts.navVIP}</a>
        </div>
      </header>
    `;

    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const drawer = document.getElementById('mobile-drawer');
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        drawer.classList.toggle('is-open');
      });
    }
  }

  // 3. Render Shared Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-about">
            <div class="brand-logo" style="margin-bottom: 0.75rem;">
              La Casa Del <span class="highlight">Mofongo</span>
            </div>
            <p>
              Homestyle Caribbean &amp; Latin fare, such as mashed plantains &amp; pork chops, in a comfortable welcoming space with TVs. Disfruta de happy hour, cocteles artesanales y menú infantil en Silver Spring, MD.
            </p>
          </div>

          <div class="footer-col">
            <h4>Navegación</h4>
            <ul class="footer-links">
              <li><a href="index.html">${texts.navHome}</a></li>
              <li><a href="menu.html">${texts.navMenuSneak}</a></li>
              <li><a href="locations.html">${texts.navLocations}</a></li>
              <li><a href="contact.html">${texts.navContact}</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Ubicación &amp; Contacto</h4>
            <ul class="footer-links">
              <li><strong>Dirección:</strong> 9441 Georgia Ave, Silver Spring, MD 20910</li>
              <li><strong>Teléfono:</strong> <a href="tel:+12408633750" style="color: var(--color-gold);">+1 240-863-3750</a></li>
              <li><strong>Horario:</strong> Abierto &bull; Cierra a las 10:00 PM</li>
              <li style="color: var(--color-gold-light); font-size: 0.85rem; margin-top: 0.25rem;">Happy hour food &bull; Cocteles &bull; Menú infantil</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} La Casa Del Mofongo. ${texts.rights}</p>
          <p style="color: var(--color-gold-light);">9441 Georgia Ave, Silver Spring, MD 20910 &bull; United States</p>
        </div>
      </footer>
    `;
  }

  // 4. Live Countdown to Grand Digital Launch
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 28);
    targetDate.setHours(18, 0, 0, 0);

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 5. VIP Lead Notification Form Handling
  const leadForms = document.querySelectorAll('form[data-lead-form]');
  leadForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const feedback = form.parentElement.querySelector('.form-feedback') || form.querySelector('.form-feedback');
      const input = form.querySelector('input[type="email"]');

      if (input && input.value) {
        if (feedback) {
          feedback.textContent = isSpanish 
            ? '¡Gracias! Te notificaremos de primero sobre el lanzamiento web, promociones de happy hour y pedidos online.' 
            : 'Thank you! We will notify you first regarding our web launch, happy hour specials, and online ordering.';
          feedback.classList.add('is-visible');
        }
        input.value = '';
        setTimeout(() => {
          if (feedback) feedback.classList.remove('is-visible');
        }, 5000);
      }
    });
  });
})();
