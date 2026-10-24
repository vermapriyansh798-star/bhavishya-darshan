/**
 * Bhavishya Darshan — Language Controller
 * Manages English (Primary) and Hindi toggling with persistent state.
 */
import { I18N } from './i18n.js';

let currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('bd_lang')) || 'en'; // English as primary default

export function getLang() {
  return currentLang;
}

export function setLang(newLang) {
  if (newLang !== 'en' && newLang !== 'hi') return;
  currentLang = newLang;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('bd_lang', currentLang);
  }
  applyTranslations(currentLang);

  // Dispatch custom event so modules can react
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
  }
}

export function initLanguageController() {
  // Setup Language Switcher in Header
  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) setLang(targetLang);
    });
  });

  // Apply initial translations (English by default)
  applyTranslations(currentLang);
}

function applyTranslations(lang) {
  const dict = I18N[lang];
  if (!dict) return;

  // 1. Update HTML lang attribute & Title
  document.documentElement.setAttribute('lang', dict.langCode);
  document.title = dict.pageTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', dict.metaDescription);

  // 2. Update Toggle Buttons active state
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    const isCurrent = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isCurrent);
    btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
  });

  // 3. Update Elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getNestedValue(dict, key);
    if (val !== undefined) {
      el.textContent = val;
    }
  });

  // 4. Update Elements with data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = getNestedValue(dict, key);
    if (val !== undefined) {
      el.innerHTML = val;
    }
  });

  // 5. Update Elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = getNestedValue(dict, key);
    if (val !== undefined) {
      el.setAttribute('placeholder', val);
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
}
