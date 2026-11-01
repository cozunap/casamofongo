/**
 * La Casa Del Mofongo - Shared Component Logic
 * Header sticky scroll, mobile navigation toggle & reservation handlers
 */

(function () {
  // Check if we are in Spanish version
  const isSpanish = window.location.pathname.startsWith('/es/') || window.location.pathname === '/es';
  const basePath = isSpanish ? '/es/' : '';
  const assetPrefix = isSpanish ? '../' : '';

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

  // Localized Navigation Labels
  const labels = isSpanish ? {
    home: 'Inicio',
    menu: 'Menú',
    about: 'Nosotros',
    gallery: 'Galería',
    contact: 'Contacto',
    reservation: 'Reservación',
    location: 'UBICACIÓN',
    hours: 'HORARIO DE ATENCIÓN',
    serviceArea: 'ÁREAS DE SERVICIO',
    monThu: 'LUN-JUE 11am - 10pm',
    friSun: 'VIE-DOM 11am - 2am',
    features: 'Cócteles de primera &bull; Platos de Happy Hour &bull; Menú infantil',
    areas: 'Silver Spring &bull; Takoma Park &bull; Bethesda &bull; Wheaton &bull; Hyattsville &bull; College Park &bull; Washington D.C.',
    rights: 'Todos los derechos reservados.',
    developed: 'Diseñado y Desarrollado por'
  } : {
    home: 'Home',
    menu: 'Menu',
    about: 'About Us',
    gallery: 'Our Gallery',
    contact: 'Contact',
    reservation: 'Reservation',
    location: 'LOCATION',
    hours: 'OPENING HOURS',
    serviceArea: 'AREAS SERVED',
    monThu: 'MON-THU 11am - 10pm',
    friSun: 'FRI-SUN 11am - 2am',
    features: 'Great cocktails &bull; Happy hour food &bull; Kids\' menu',
    areas: 'Silver Spring &bull; Takoma Park &bull; Bethesda &bull; Wheaton &bull; Hyattsville &bull; College Park &bull; Washington D.C.',
    rights: 'All rights reserved.',
    developed: 'Designed and Developed by'
  };

  if (headerEl) {
    headerEl.innerHTML = `
      <header class="site-header" id="site-header">
        <div class="header-container">
          <a href="${basePath}index.html" class="header-brand" aria-label="La Casa Del Mofongo">
            <img src="${assetPrefix}assets/images/logo.svg" alt="La Casa Del Mofongo Logo" class="header-logo-img">
          </a>

          <nav class="nav-menu" aria-label="Main Menu">
            <a href="${basePath}index.html" class="nav-link ${getActive('index.html')}">${labels.home}</a>
            <span class="nav-divider" aria-hidden="true">|</span>
            <a href="${basePath}menu.html" class="nav-link ${getActive('menu.html')}">${labels.menu}</a>
            <span class="nav-divider" aria-hidden="true">|</span>
            <a href="${basePath}about.html" class="nav-link ${getActive('about.html')}">${labels.about}</a>
            <span class="nav-divider" aria-hidden="true">|</span>
            <a href="${basePath}gallery.html" class="nav-link ${getActive('gallery.html')}">${labels.gallery}</a>
            <span class="nav-divider" aria-hidden="true">|</span>
            <a href="${basePath}contact.html" class="nav-link ${getActive('contact.html')}">${labels.contact}</a>
          </nav>

          <a href="tel:+12408633750" class="nav-reservation-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>${labels.reservation}</span>
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
          <a href="${basePath}index.html" class="${getActive('index.html')}">${labels.home}</a>
          <a href="${basePath}menu.html" class="${getActive('menu.html')}">${labels.menu}</a>
          <a href="${basePath}about.html" class="${getActive('about.html')}">${labels.about}</a>
          <a href="${basePath}gallery.html" class="${getActive('gallery.html')}">${labels.gallery}</a>
          <a href="${basePath}contact.html" class="${getActive('contact.html')}">${labels.contact}</a>
          <a href="tel:+12408633750" style="color: var(--color-primary-light); font-weight: 700;">${labels.reservation}: (240) 863-3750</a>
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

  // 1.5 Header Logo Size Safety
  const headerLogo = document.querySelector('.header-logo-img');
  if (headerLogo) {
    headerLogo.style.height = '90px';
  }

  // 2. Render Footer Placeholder
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) {
    footerEl.innerHTML = `
      <footer class="site-footer">
        <div class="footer-top">
          <div class="footer-top-container">
            <div class="footer-brand">
              <img src="${assetPrefix}assets/images/logo.svg" alt="La Casa Del Mofongo Logo" class="footer-logo-img">
            </div>

            <div class="footer-col">
              <h4>${labels.location}</h4>
              <p>9441 Georgia Ave</p>
              <p>Silver Spring, MD 20910, USA</p>
              <p style="margin-top: 0.5rem;"><a href="tel:+12408633750">(240) 863-3750</a></p>
            </div>

            <div class="footer-col">
              <h4>${labels.hours}</h4>
              <p>${labels.monThu}</p>
              <p>${labels.friSun}</p>
              <p style="margin-top: 0.5rem; font-size: 0.85rem; opacity: 0.9;">${labels.features}</p>
            </div>

            <div class="footer-col">
              <h4>${labels.serviceArea}</h4>
              <p style="font-size: 0.85rem; line-height: 1.6; opacity: 0.95;">${labels.areas}</p>
              <p style="margin-top: 0.5rem; font-size: 0.82rem; opacity: 0.85;">Montgomery County &bull; DMV Area</p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>Copyright &copy; ${new Date().getFullYear()} La Casa Del Mofongo MD. ${labels.rights} &bull; ${labels.developed} <a href="https://cozuna.com" target="_blank" rel="noopener noreferrer">cozuna.com</a></p>
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

  // 4. Hero Slider Implementation
  const heroSlider = document.getElementById('home-hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = heroSlider.querySelectorAll('.hero-slider-dots .dot');
    const prevBtn = document.getElementById('hero-slider-prev');
    const nextBtn = document.getElementById('hero-slider-next');
    let currentSlide = 0;
    let slideTimer = null;

    function goToSlide(index) {
      if (!slides.length) return;
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function startAutoplay() {
      stopAutoplay();
      slideTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 6500);
    }

    function stopAutoplay() {
      if (slideTimer) clearInterval(slideTimer);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startAutoplay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startAutoplay();
      });
    });

    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', startAutoplay);

    // Initial start
    startAutoplay();
  }

  // 5. Global 3D Interactive Container Animations
  function init3DEffects() {
    // 3D Reveal on Scroll
    const targetCards = document.querySelectorAll(
      '.menu-card, .feature-card, .gallery-item, .combo-card, .contact-info-card, .reservation-card, .story-grid > div'
    );

    targetCards.forEach(el => {
      el.classList.add('reveal-3d');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    targetCards.forEach(el => observer.observe(el));

    // Interactive 3D Cursor Tilt for Desktop Cards
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      targetCards.forEach(card => {
        card.setAttribute('data-tilt-3d', 'true');

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -16;
          const rotateY = ((x - centerX) / centerX) * 16;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(15px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }
  }

  // 6. Interactive Lightbox Gallery Slider
  function initGalleryLightbox() {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item, .responsive-tri-grid .gallery-item, .dishes-carousel-slide img, .dishes-strip-grid img'));
    if (!galleryItems.length) return;

    // Create Modal DOM
    let lightbox = document.getElementById('gallery-lightbox-modal');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'gallery-lightbox-modal';
      lightbox.className = 'lightbox-modal';
      lightbox.innerHTML = `
        <button class="lightbox-close-btn" aria-label="Close Lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button class="lightbox-arrow prev" aria-label="Previous Image">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="lightbox-arrow next" aria-label="Next Image">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div class="lightbox-content">
          <img src="" alt="" class="lightbox-img">
          <div class="lightbox-caption"></div>
          <div class="lightbox-counter"></div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const modalImg = lightbox.querySelector('.lightbox-img');
    const modalCaption = lightbox.querySelector('.lightbox-caption');
    const modalCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close-btn');
    const prevBtn = lightbox.querySelector('.lightbox-arrow.prev');
    const nextBtn = lightbox.querySelector('.lightbox-arrow.next');

    // Collect all image sources
    const imagesData = galleryItems.map(item => {
      const img = item.tagName.toLowerCase() === 'img' ? item : item.querySelector('img');
      return {
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') || 'La Casa Del Mofongo Caribbean Cuisine' : ''
      };
    }).filter(d => d.src);

    let currentIndex = 0;

    function showImage(index) {
      if (!imagesData.length) return;
      currentIndex = (index + imagesData.length) % imagesData.length;
      const data = imagesData[currentIndex];

      modalImg.style.opacity = '0';
      modalImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        modalImg.src = data.src;
        modalImg.alt = data.alt;
        modalCaption.textContent = data.alt;
        modalCounter.textContent = `${currentIndex + 1} / ${imagesData.length}`;
        modalImg.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
      }, 150);
    }

    function openLightbox(index) {
      showImage(index);
      lightbox.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    // Attach click to each gallery item
    galleryItems.forEach((item, idx) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(idx);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Keyboard navigation (Escape, Left, Right)
    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // Mobile Swipe Gesture Support
    let touchStartX = 0;
    let touchEndX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) showImage(currentIndex + 1); // swipe left
      if (touchEndX > touchStartX + 50) showImage(currentIndex - 1); // swipe right
    }, { passive: true });
  }

  // 7. Dishes Continuous Carousel Slider Controller
  function initDishesCarousel() {
    const track = document.getElementById('dishes-carousel-track');
    const prevBtn = document.getElementById('dishes-prev-btn');
    const nextBtn = document.getElementById('dishes-next-btn');
    if (!track) return;

    let autoScrollTimer = null;
    let isPaused = false;

    function getScrollStep() {
      const slide = track.querySelector('.dishes-carousel-slide');
      return slide ? slide.offsetWidth * 2 : 300;
    }

    function scrollNext() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      }
    }

    function scrollPrev() {
      if (track.scrollLeft <= 10) {
        track.scrollTo({ left: track.scrollWidth - track.clientWidth, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollNext();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollPrev();
      });
    }

    // Auto scroll every 3.5 seconds
    function startAutoScroll() {
      if (autoScrollTimer) clearInterval(autoScrollTimer);
      autoScrollTimer = setInterval(() => {
        if (!isPaused) {
          scrollNext();
        }
      }, 3500);
    }

    track.addEventListener('mouseenter', () => { isPaused = true; });
    track.addEventListener('mouseleave', () => { isPaused = false; });
    track.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    track.addEventListener('touchend', () => {
      setTimeout(() => { isPaused = false; }, 2000);
    }, { passive: true });

    startAutoScroll();
  }

  // 8. FAQ Accordion Controller
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Run initialization
  
  // 6. Proximity / GPS Smart Map Card (Mounted Exclusively on top of Google Map)
  function initProximityWidget() {
    const mapWrapper = document.querySelector('.map-container-wrapper');
    if (!mapWrapper) {
      // If there is no map on this page (e.g. Menu, About, Gallery), do not render
      return;
    }

    // Remove legacy static floating card if present to avoid duplicate overlays
    const legacyCard = mapWrapper.querySelector('.map-floating-card');
    if (legacyCard) {
      legacyCard.remove();
    }

    const LAT_REST = 39.0095285;
    const LNG_REST = -77.0402504;

    const isApple = /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
    const appleMapsUrl = 'https://maps.apple.com/?daddr=9441+Georgia+Ave,+Silver+Spring,+MD+20910';
    const googleMapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=9441+Georgia+Ave,+Silver+Spring,+MD+20910';
    const directMapUrl = isApple ? appleMapsUrl : googleMapsUrl;

    const t = isSpanish ? {
      title: '¿Cerca de Nosotros?',
      desc: '9441 Georgia Ave &bull; Estacionamiento gratis',
      btnDirections: 'Cómo Llegar',
      btnCalc: 'Calcular distancia',
      milesAway: '¡Estás a solo {dist} mi!',
      farAway: '¡Visítanos hoy en Silver Spring!',
      denied: 'Ubicación desactivada'
    } : {
      title: 'In the Neighborhood?',
      desc: '9441 Georgia Ave &bull; Free parking on-site',
      btnDirections: 'Get Directions',
      btnCalc: 'Calculate distance',
      milesAway: "You're only {dist} mi away!",
      farAway: 'Visit us today in Silver Spring!',
      denied: 'Location unavailable'
    };

    const widget = document.createElement('div');
    widget.className = 'proximity-widget';
    widget.setAttribute('role', 'region');
    widget.setAttribute('aria-label', t.title);
    widget.innerHTML = `
      <div class="proximity-content">
        <div class="proximity-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="proximity-text-wrap">
          <h4 class="proximity-title" id="prox-title">${t.title}</h4>
          <p class="proximity-desc" id="prox-desc">${t.desc}</p>
        </div>
      </div>
      <div class="proximity-actions">
        <a href="${directMapUrl}" target="_blank" rel="noopener noreferrer" class="proximity-btn-maps">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          <span>${t.btnDirections}</span>
        </a>
        <button class="proximity-btn-calc" id="prox-calc-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="12 8 8 12 12 16 12 8"></polygon>
          </svg>
          <span id="prox-calc-label">${t.btnCalc}</span>
        </button>
      </div>
    `;

    mapWrapper.insertBefore(widget, mapWrapper.firstChild);

    // Distance calculation on click
    const calcBtn = widget.querySelector('#prox-calc-btn');
    calcBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        document.getElementById('prox-desc').textContent = t.denied;
        calcBtn.style.display = 'none';
        return;
      }

      calcBtn.disabled = true;
      document.getElementById('prox-calc-label').textContent = '...';

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          
          // Haversine formula in miles
          const R = 3958.8; // Earth radius in miles
          const dLat = (lat - LAT_REST) * Math.PI / 180;
          const dLng = (lng - LNG_REST) * Math.PI / 180;
          const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(LAT_REST * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * 
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;

          const titleEl = document.getElementById('prox-title');
          const descEl = document.getElementById('prox-desc');

          if (distance <= 5.0) {
            titleEl.textContent = t.milesAway.replace('{dist}', distance.toFixed(1));
            descEl.innerHTML = '9441 Georgia Ave &bull; ' + (distance <= 1.5 ? (isSpanish ? '¡Llegas en 3 minutos!' : '3 min drive!') : (isSpanish ? '¡Llegas en minutos!' : 'Minutes away!'));
          } else {
            titleEl.textContent = t.farAway;
            descEl.innerHTML = t.desc;
          }
          calcBtn.style.display = 'none';
        },
        () => {
          // If user denies permission, keep elegant fallback
          calcBtn.style.display = 'none';
        },
        { timeout: 8000, maximumAge: 60000 }
      );
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init3DEffects();
      initGalleryLightbox();
      initDishesCarousel();
      initFAQAccordion();
      initProximityWidget();
    });
  } else {
    init3DEffects();
    initGalleryLightbox();
    initDishesCarousel();
    initFAQAccordion();
    initProximityWidget();
  }
})();
