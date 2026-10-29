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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Reservation</span>
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
          <p>Copyright &copy; ${new Date().getFullYear()} La Casa Del Mofongo MD. All rights reserved. &bull; <a href="admin.html" style="color: #666666; text-decoration: none; font-size: 0.75rem;">Admin Portal</a></p>
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
      }, 5000);
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
    const galleryItems = Array.from(document.querySelectorAll('.gallery-grid .gallery-item, .responsive-tri-grid .gallery-item, .dishes-strip-grid img'));
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

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init3DEffects();
      initGalleryLightbox();
    });
  } else {
    init3DEffects();
    initGalleryLightbox();
  }
})();
