/**
 * Bhavishya Darshan — Pricing Module (Bilingual: EN / HI)
 * Handles live age pricing and dynamic language switching.
 */
import { CONFIG } from '../config.js';
import { I18N } from './i18n.js';
import { getLang } from './lang-controller.js';

let isUnder22Active = true;

export function initPricing() {
  const toggleContainer = document.querySelector('.age-toggle-container');
  const btnUnder22 = document.getElementById('toggle-under22');
  const btn22Plus = document.getElementById('toggle-22plus');
  const priceDisplay = document.getElementById('dynamic-price-number');
  const priceDesc = document.getElementById('dynamic-price-desc');
  const priceDuration = document.getElementById('dynamic-price-duration');
  const selectButtons = document.querySelectorAll('.select-plan-btn');

  if (!toggleContainer || !btnUnder22 || !btn22Plus) return;

  function updatePriceState(isUnder22, animate = true) {
    isUnder22Active = isUnder22;
    toggleContainer.classList.toggle('switched', !isUnder22);
    btnUnder22.classList.toggle('active', isUnder22);
    btn22Plus.classList.toggle('active', !isUnder22);
    btnUnder22.setAttribute('aria-pressed', isUnder22 ? 'true' : 'false');
    btn22Plus.setAttribute('aria-pressed', !isUnder22 ? 'true' : 'false');

    const targetPrice = isUnder22 ? CONFIG.priceUnder22 : CONFIG.price22Plus;
    const lang = getLang();
    const dict = I18N[lang];

    const targetDesc = isUnder22 
      ? dict.pricing.card1Sub
      : dict.pricing.card2Sub;
    const targetDuration = isUnder22 
      ? dict.pricing.card1Duration 
      : dict.pricing.card2Duration;

    if (priceDisplay) {
      if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        priceDisplay.style.transform = 'translateY(-15px)';
        priceDisplay.style.opacity = '0';
        setTimeout(() => {
          priceDisplay.textContent = targetPrice;
          priceDisplay.style.transform = 'translateY(15px)';
          setTimeout(() => {
            priceDisplay.style.transform = 'translateY(0)';
            priceDisplay.style.opacity = '1';
          }, 30);
        }, 180);
      } else {
        priceDisplay.textContent = targetPrice;
      }
    }

    if (priceDesc) priceDesc.textContent = targetDesc;
    if (priceDuration) priceDuration.textContent = targetDuration;

    // Highlight featured card
    const cardUnder = document.getElementById('price-card-under22');
    const cardAdult = document.getElementById('price-card-adult');
    if (cardUnder && cardAdult) {
      cardUnder.classList.toggle('featured', isUnder22);
      cardAdult.classList.toggle('featured', !isUnder22);
    }
  }

  btnUnder22.addEventListener('click', () => updatePriceState(true, true));
  btn22Plus.addEventListener('click', () => updatePriceState(false, true));

  // Connect "Select Consultation" buttons to smooth scroll to booking form
  selectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planTier = btn.getAttribute('data-tier'); // 'under22' or '22plus'
      const dobInput = document.getElementById('client-dob');
      
      if (dobInput && !dobInput.value) {
        const currentYear = new Date().getFullYear();
        if (planTier === 'under22') {
          dobInput.value = `${currentYear - 20}-01-01`;
        } else {
          dobInput.value = `${currentYear - 26}-01-01`;
        }
        dobInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      if (window.lenisScrollTo) {
        window.lenisScrollTo('#booking', -60);
      } else {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });



  // Re-apply on language change
  window.addEventListener('languageChanged', () => {
    updatePriceState(isUnder22Active, false);
  });

  // Initial state
  updatePriceState(true, false);
}
