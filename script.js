// ── NAVBAR scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE MENU ──
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.setAttribute('aria-expanded', menuOpen);
  mobileMenu.setAttribute('aria-hidden', !menuOpen);
  mobileMenu.style.display = menuOpen ? 'flex' : 'none';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
    mobileMenu.style.display = 'none';
  });
});

// ── SCROLL REVEAL (IntersectionObserver with safe fallback) ──
document.body.classList.add('js-animated');
const revealEls = document.querySelectorAll(
  '.service-card, .testimonial-card, .about-content, .area-card, .faq-item, .reveal'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '80px 0px' });

revealEls.forEach((el, i) => {
  el.dataset.delay = (i % 3) * 60;
  revealObserver.observe(el);
});

// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── SECURITY: Input sanitization ──
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML.trim();
}

// ── SECURITY: Rate limiting (localStorage-based) ──
const RATE_KEY    = 'bc_form_times';
const RATE_MAX    = 5;
const RATE_WINDOW = 30 * 60 * 1000; // 30 minutes

function isRateLimited() {
  try {
    const now = Date.now();
    let times = JSON.parse(localStorage.getItem(RATE_KEY) || '[]');
    times = times.filter(t => now - t < RATE_WINDOW);
    if (times.length >= RATE_MAX) return true;
    times.push(now);
    localStorage.setItem(RATE_KEY, JSON.stringify(times));
    return false;
  } catch {
    return false; // fail open — don't block if localStorage unavailable
  }
}

// ── CONVERSION TRACKING (Google Ads / GA4 / GTM) ──
window.dataLayer = window.dataLayer || [];
function trackConversion(eventName, params = {}) {
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params
  });
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// Track WhatsApp Clicks (Inbound quote initiation)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    trackConversion('contact_whatsapp', {
      event_category: 'Lead',
      event_label: link.getAttribute('data-service') || 'General WhatsApp CTA',
      transport_type: 'beacon'
    });
  });
});

// Track Direct Phone Call Clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    trackConversion('contact_phone', {
      event_category: 'Lead',
      event_label: 'Direct Call (083) 265-6019',
      transport_type: 'beacon'
    });
  });
});

// ── CONTACT FORM (Formsubmit.co AJAX) ──
const form       = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');
const submitBtn  = document.getElementById('form-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Reset banners
  successMsg.style.display = 'none';
  successMsg.setAttribute('aria-hidden', 'true');
  errorMsg.style.display   = 'none';
  errorMsg.setAttribute('aria-hidden', 'true');

  // Basic validation
  const name  = sanitize(document.getElementById('form-name').value);
  const email = sanitize(document.getElementById('form-email').value);

  if (!name || name.length < 2) {
    document.getElementById('form-name').focus();
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('form-email').focus();
    return;
  }

  // Rate limit check
  if (isRateLimited()) {
    errorMsg.textContent = '⚠️ Too many submissions. Please try again later or call us directly.';
    errorMsg.style.display = 'block';
    errorMsg.setAttribute('aria-hidden', 'false');
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').style.display = 'none';
  submitBtn.querySelector('.btn-loading').style.display = 'inline';

  try {
    const formData = new FormData(form);

    const response = await fetch('https://formsubmit.co/ajax/accounts@biancacleaners.co.za', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Fire lead conversion event
      trackConversion('generate_lead', {
        event_category: 'Form',
        event_label: 'Inbound Quote Form Submission',
        value: 1
      });

      // Show success
      submitBtn.style.display = 'none';
      successMsg.style.display = 'block';
      successMsg.setAttribute('aria-hidden', 'false');
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    // Show error
    errorMsg.style.display = 'block';
    errorMsg.setAttribute('aria-hidden', 'false');
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display = 'inline';
    submitBtn.querySelector('.btn-loading').style.display = 'none';
  }
});

// ── SMOOTH SCROLL for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

