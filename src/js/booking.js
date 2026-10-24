/**
 * Bhavishya Darshan — Booking Form & WhatsApp Integration (Bilingual: EN / HI)
 * Handles DOB age calculation, guardian consent, WhatsApp link builder, and clipboard fallback.
 */
import { CONFIG, ageFromDob, priceFor, waLink, buildBookingMessage } from '../config.js';
import { I18N } from './i18n.js';
import { getLang } from './lang-controller.js';

export function initBookingForm() {
  const form = document.getElementById('consultation-form');
  const dobInput = document.getElementById('client-dob');
  const priceDisplay = document.getElementById('booking-computed-price');
  const guardianAlert = document.getElementById('guardian-consent-alert');
  const copyBtn = document.getElementById('copy-message-btn');
  const toast = document.getElementById('action-toast');
  const toastText = document.getElementById('toast-text');

  if (!form || !dobInput) return;

  function showToast(message, duration = 3500) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  function updateAgeAndPrice() {
    const dobVal = dobInput.value;
    const lang = getLang();
    const dict = I18N[lang];

    if (!dobVal) {
      if (priceDisplay) priceDisplay.textContent = `₹${CONFIG.price22Plus}`;
      if (guardianAlert) guardianAlert.classList.remove('visible');
      return;
    }

    const today = new Date();
    const dob = new Date(dobVal);

    if (dob > today) {
      dobInput.setCustomValidity(lang === 'en' ? "Date of birth cannot be in the future." : "जन्म तिथि भविष्य की नहीं हो सकती।");
      return;
    } else {
      dobInput.setCustomValidity("");
    }

    const age = ageFromDob(dobVal, today);
    const price = priceFor(age);

    if (priceDisplay) {
      const ageLabel = lang === 'en' ? `${age} years` : `${age} वर्ष`;
      priceDisplay.textContent = `₹${price} (${age > 0 ? ageLabel : ''})`;
    }

    if (guardianAlert) {
      if (age > 0 && age < 18) {
        guardianAlert.textContent = dict.booking.guardianAlert;
        guardianAlert.classList.add('visible');
      } else {
        guardianAlert.classList.remove('visible');
      }
    }
  }

  dobInput.addEventListener('input', updateAgeAndPrice);
  dobInput.addEventListener('change', updateAgeAndPrice);

  // Form submission: redirect to WhatsApp
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = getLang();
    const dict = I18N[lang];

    const name = document.getElementById('client-name')?.value.trim();
    const dob = dobInput.value;
    const dominantHand = document.getElementById('client-hand')?.value;
    const focusArea = document.getElementById('client-focus')?.value;
    const mode = document.getElementById('client-mode')?.value;
    const preferredTime = document.getElementById('client-time')?.value.trim();
    const note = document.getElementById('client-note')?.value.trim();

    if (!name) {
      alert(lang === 'en' ? "Please enter your full name." : "कृपया अपना नाम दर्ज करें।");
      document.getElementById('client-name')?.focus();
      return;
    }

    if (!dob) {
      alert(lang === 'en' ? "Please select your date of birth." : "कृपया अपनी जन्म तिथि दर्ज करें।");
      dobInput.focus();
      return;
    }

    const formData = {
      name,
      dob,
      dominantHand,
      focusArea,
      mode,
      preferredTime,
      note
    };

    const message = buildBookingMessage(formData, lang);
    const url = waLink(message);

    showToast(dict.booking.openWaToast);

    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = url;
    }
  });

  // Copy message fallback
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = getLang();
      const dict = I18N[lang];

      const name = document.getElementById('client-name')?.value.trim();
      const dob = dobInput.value;
      const dominantHand = document.getElementById('client-hand')?.value;
      const focusArea = document.getElementById('client-focus')?.value;
      const mode = document.getElementById('client-mode')?.value;
      const preferredTime = document.getElementById('client-time')?.value.trim();
      const note = document.getElementById('client-note')?.value.trim();

      const formData = {
        name: name || (lang === 'en' ? "[Your Name]" : "[नाम]"),
        dob: dob || (lang === 'en' ? "[YYYY-MM-DD]" : "[जन्म तिथि]"),
        dominantHand: dominantHand || (lang === 'en' ? "Right Hand" : "दायाँ हाथ"),
        focusArea: focusArea || (lang === 'en' ? "Comprehensive Life Reading" : "सम्पूर्ण जीवन"),
        mode: mode || (lang === 'en' ? "Online" : "ऑनलाइन"),
        preferredTime: preferredTime || (lang === 'en' ? "Flexible" : "सुविधाजनक समय"),
        note
      };

      const message = buildBookingMessage(formData, lang);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message)
          .then(() => {
            showToast(dict.booking.copySuccessToast);
          })
          .catch(() => {
            prompt(lang === 'en' ? "Copy the consultation message below:" : "कृपया नीचे दिया संदेश कॉपी करें:", message);
          });
      } else {
        prompt(lang === 'en' ? "Copy the consultation message below:" : "कृपया नीचे दिया संदेश कॉपी करें:", message);
      }
    });
  }

  // Update select options and texts when language changes
  window.addEventListener('languageChanged', () => {
    updateAgeAndPrice();
    const lang = getLang();
    const dict = I18N[lang];

    // Update form labels and options
    const handSelect = document.getElementById('client-hand');
    if (handSelect) {
      handSelect.options[0].text = dict.booking.handRight;
      handSelect.options[0].value = lang === 'en' ? "Right Hand" : "दायाँ हाथ (Right Hand)";
      handSelect.options[1].text = dict.booking.handLeft;
      handSelect.options[1].value = lang === 'en' ? "Left Hand" : "बायाँ हाथ (Left Hand)";
    }

    const focusSelect = document.getElementById('client-focus');
    if (focusSelect) {
      focusSelect.options[0].text = dict.booking.focusCareer;
      focusSelect.options[0].value = dict.booking.focusCareer;
      focusSelect.options[1].text = dict.booking.focusMarriage;
      focusSelect.options[1].value = dict.booking.focusMarriage;
      focusSelect.options[2].text = dict.booking.focusHealth;
      focusSelect.options[2].value = dict.booking.focusHealth;
      focusSelect.options[3].text = dict.booking.focusLife;
      focusSelect.options[3].value = dict.booking.focusLife;
    }

    const modeSelect = document.getElementById('client-mode');
    if (modeSelect) {
      modeSelect.options[0].text = dict.booking.modeOnline;
      modeSelect.options[0].value = dict.booking.modeOnline;
      modeSelect.options[1].text = dict.booking.modeInPerson;
      modeSelect.options[1].value = dict.booking.modeInPerson;
    }
  });

  // Pre-seed minimum/maximum valid date range for DOB (ages 5 to 105)
  const today = new Date();
  const maxYear = today.getFullYear() - 5;
  const minYear = today.getFullYear() - 105;
  dobInput.setAttribute('max', `${maxYear}-12-31`);
  dobInput.setAttribute('min', `${minYear}-01-01`);
}
