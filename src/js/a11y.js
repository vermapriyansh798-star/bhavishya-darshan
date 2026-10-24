/**
 * Bhavishya Darshan — Accessibility (a11y) Support Module
 * Ensures WCAG 2.1 AA compliance, visible focus, keyboard operability.
 */

export function initA11y() {
  // Handle skip to content link smoothly
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
      }
    });
  }

  // Detect keyboard user for high-contrast focus rings
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });

  window.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });
}
