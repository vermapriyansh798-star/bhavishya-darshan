/**
 * Bhavishya Darshan (भविष्य दर्शन) — Main Application Entrypoint
 */
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import './styles/motion.css';

import { CONFIG, waLink } from './config.js';
import { initLanguageController } from './js/lang-controller.js';
import { initSmoothScroll } from './js/smooth-scroll.js';
import { initAnimations } from './js/animations.js';
import { initPalmExplorer } from './js/palm-explorer.js';
import { initPricing } from './js/pricing.js';
import { initBookingForm } from './js/booking.js';
import { initQRCode } from './js/qr.js';
import { initReviews } from './js/reviews.js';
import { initA11y } from './js/a11y.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accessibility initialization
  initA11y();

  // 2. Initialize Language Controller (English primary, Hindi on user preference)
  initLanguageController();

  // 3. Initialize smooth scrolling engine
  initSmoothScroll();

  // 4. Initialize visual animations, preloader, gold dust
  initAnimations();

  // 5. Initialize signature Palm Explorer
  initPalmExplorer();

  // 6. Initialize dynamic pricing and age toggle
  initPricing();

  // 7. Initialize booking form and WhatsApp builder
  initBookingForm();

  // 8. Initialize scannable QR code generator
  initQRCode();

  // 9. Initialize functional reviews & testimonials system
  initReviews();

  // 10. Configure Floating WhatsApp Button
  const floatWaBtn = document.getElementById('floating-whatsapp-btn');
  if (floatWaBtn) {
    floatWaBtn.href = waLink(CONFIG.greetings.quickQuestion);
  }

  // 9. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (window.lenisScrollTo) {
            window.lenisScrollTo(targetId, -60);
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  console.log(`%c 🚩 भविष्य दर्शन (Bhavishya Darshan) — हस्तरेखा परामर्श | कुलदीप ढौंडियाल `, 'background: #2A070B; color: #E8C65A; font-size: 14px; padding: 6px; border: 1px solid #C59B27;');
});
