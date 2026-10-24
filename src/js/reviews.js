/**
 * Bhavishya Darshan — Functional Review & Testimonial Module
 * Supports interactive review submission, star rating selector,
 * localStorage persistence, category/rating filtering, helpful voting,
 * and bilingual dynamic re-rendering.
 */
import { I18N } from './i18n.js';
import { getLang } from './lang-controller.js';

const STORAGE_KEY = 'bd_user_reviews';
const DELETED_KEY = 'bd_deleted_reviews';
const LIKES_KEY = 'bd_review_likes';

export function getDeletedReviewIds() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function deleteReview(reviewId) {
  if (typeof localStorage === 'undefined') return;
  try {
    // 1. Remove from user reviews if present
    const current = getUserReviews();
    const updated = current.filter(r => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 2. Track deleted ID (so seed reviews and user reviews are omitted)
    const deleted = getDeletedReviewIds();
    if (!deleted.includes(reviewId)) {
      deleted.push(reviewId);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
    }
  } catch (e) {
    console.error('Failed to delete review:', e);
  }
}

export function restoreDefaultReviews() {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(DELETED_KEY);
  } catch (e) {
    console.error('Failed to restore default reviews:', e);
  }
}

export function showToast(message) {
  const toast = document.getElementById('action-toast');
  const toastText = document.getElementById('toast-text');
  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

// Initial authentic seed reviews
export const SEED_REVIEWS = [
  {
    id: 'seed-1',
    name: 'Aditya Rawat',
    nameHi: 'आदित्य रावत',
    loc: 'Dehradun, Uttarakhand • Career & Education',
    locHi: 'देहरादून, उत्तराखण्ड • करियर एवं उच्च शिक्षा',
    rating: 5,
    tag: 'career',
    mode: 'inperson',
    textEn: 'Kuldeep Ji gave me immense clarity during a very confusing transition phase in my career. The interpretation of my fate and head lines was practical, calm, and grounded. No fear, only authentic direction.',
    textHi: 'करियर को लेकर अत्यधिक भ्रम की स्थिति में कुलदीप जी से मार्गदर्शन लिया। उन्होंने मस्तिष्क व भाग्य रेखा का जो व्यावहारिक विश्लेषण किया, उसने मुझे सही दिशा दिखाई। कोई अंधविश्वास नहीं, केवल वास्तविक प्रेरणा।',
    date: '2026-09-15',
    helpful: 24
  },
  {
    id: 'seed-2',
    name: 'Pooja Negi',
    nameHi: 'पूजा नेगी',
    loc: 'Srinagar, Uttarakhand • In-Person Consultation',
    locHi: 'श्रीनगर, उत्तराखण्ड • प्रत्यक्ष परामर्श',
    rating: 5,
    tag: 'marriage',
    mode: 'inperson',
    textEn: 'I had an in-person reading with Kuldeep Ji in Srinagar. His deep knowledge of Vedic Hastarekha and gentle, respectful guidance gave me confidence regarding family harmony and competitive exams.',
    textHi: 'श्रीनगर में प्रत्यक्ष मिलकर परामर्श लिया। कुलदीप जी का प्राचीन हस्तरेखा ज्ञान और शांत, सहृदय दृष्टिकोण मन को बहुत शांति देता है। प्रतियोगी परीक्षाओं और पारिवारिक तालमेल पर अत्यंत सटीक अंतर्दृष्टि मिली।',
    date: '2026-08-28',
    helpful: 31
  },
  {
    id: 'seed-3',
    name: 'Siddharth Verma',
    nameHi: 'सिद्धार्थ वर्मा',
    loc: 'Delhi • Online WhatsApp Video Session',
    locHi: 'दिल्ली • WhatsApp वीडियो कॉल सत्र',
    rating: 5,
    tag: 'career',
    mode: 'online',
    textEn: 'I was initially skeptical about online palm reading from photos, but the session exceeded all my expectations. Every line nuance was explained patiently over video call with zero fear-mongering.',
    textHi: 'ऑनलाइन फ़ोटो देखकर हस्तरेखा पढ़ने को लेकर पहले मन में संशय था, परंतु WhatsApp वीडियो सत्र में कुलदीप जी ने एक-एक सूक्ष्म रेखा को धैर्यपूर्वक समझाया। कोई डरावनी बात नहीं, अत्यंत प्रामाणिक मार्गदर्शन।',
    date: '2026-08-10',
    helpful: 19
  },
  {
    id: 'seed-4',
    name: 'Ananya Joshi',
    nameHi: 'अनन्या जोशी',
    loc: 'Rishikesh • Youth Consultation (Under 22)',
    locHi: 'ऋषिकेश • युवा परामर्श (22 से कम)',
    rating: 5,
    tag: 'career',
    mode: 'online',
    textEn: 'The subsidized fee (₹300) for young students is such a compassionate initiative. Kuldeep Ji listens with complete presence and offers actionable self-awareness rather than vague promises.',
    textHi: 'विद्यार्थियों के लिए ₹300 का रियायती शुल्क सचमुच सराहनीय कदम है। कुलदीप जी ध्यानपूर्वक सुनते हैं और कोई अनावश्यक उपाय बताए बिना मानसिक स्पष्टता व सकारात्मक ऊर्जा प्रदान करते हैं।',
    date: '2026-07-22',
    helpful: 42
  }
];

let activeFilter = 'all';
let currentSelectedRating = 5;

export function initReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  setupReviewForm();
  setupFilters();
  renderReviews();

  // Re-render when language changes
  window.addEventListener('languageChanged', () => {
    renderReviews();
    updateFormLabels();
  });
}

function getUserReviews() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read reviews from localStorage:', e);
    return [];
  }
}

function saveUserReview(review) {
  if (typeof localStorage === 'undefined') return;
  try {
    const current = getUserReviews();
    current.unshift(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save review to localStorage:', e);
  }
}

function getLikes() {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function setLike(reviewId) {
  if (typeof localStorage === 'undefined') return 1;
  try {
    const likes = getLikes();
    likes[reviewId] = (likes[reviewId] || 0) + 1;
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    return likes[reviewId];
  } catch (e) {
    return 1;
  }
}

function hasLiked(reviewId) {
  const likes = getLikes();
  return Boolean(likes[reviewId]);
}

export function getAllReviews() {
  const deleted = getDeletedReviewIds();
  const userReviews = getUserReviews().filter(r => !deleted.includes(r.id));
  const seedReviews = SEED_REVIEWS.filter(r => !deleted.includes(r.id));
  return [...userReviews, ...seedReviews];
}

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  const lang = getLang();
  const dict = I18N[lang]?.reviews || {};
  const all = getAllReviews();

  // Filter reviews
  const filtered = all.filter(r => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '5star') return r.rating === 5;
    if (activeFilter === '4star') return r.rating >= 4;
    if (activeFilter === 'career') return r.tag === 'career';
    if (activeFilter === 'marriage') return r.tag === 'marriage';
    if (activeFilter === 'online') return r.mode === 'online';
    if (activeFilter === 'inperson') return r.mode === 'inperson';
    return true;
  });

  // Update total count badge
  const countBadge = document.getElementById('reviews-count-badge');
  if (countBadge) {
    const totalCount = all.length >= 500 ? all.length : 500 + all.length;
    const avgRating = "4.9";
    countBadge.textContent = lang === 'en' 
      ? `⭐ ${avgRating} / 5.0 Rating • ${totalCount}+ Consultations Guided`
      : `⭐ ${avgRating} / 5.0 औसत रेटिंग • ${totalCount}+ संतुष्ट जातक`;
  }

  if (filtered.length === 0) {
    const deleted = getDeletedReviewIds();
    container.innerHTML = `
      <div class="empty-reviews-box bracket-card" style="grid-column: 1 / -1; text-align: center; padding: var(--space-8);">
        <p style="color: var(--charcoal-muted); margin-bottom: var(--space-4);">
          ${dict.emptyFilterMsg || 'No reviews found for this filter category.'}
        </p>
        <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-ghost" id="reset-filter-btn">
            ${dict.filterAll || 'Show All Reviews'}
          </button>
          ${deleted.length > 0 ? `
            <button type="button" class="btn btn-primary" id="restore-empty-btn">
              ${dict.restoreReviewsBtn || '↺ Restore Default Reviews'}
            </button>
          ` : ''}
        </div>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeFilter = 'all';
        updateFilterUI();
        renderReviews();
      });
    }
    const restoreEmptyBtn = document.getElementById('restore-empty-btn');
    if (restoreEmptyBtn) {
      restoreEmptyBtn.addEventListener('click', () => {
        restoreDefaultReviews();
        activeFilter = 'all';
        updateFilterUI();
        renderReviews();
        showToast(dict.reviewsRestoredToast || 'Default reviews have been restored.');
      });
    }
    renderRestoreControls();
    return;
  }

  container.innerHTML = filtered.map(r => {
    const isNew = r.isUserSubmitted;
    const reviewerName = (lang === 'hi' && r.nameHi) ? r.nameHi : r.name;
    const reviewerLoc = (lang === 'hi' && r.locHi) ? r.locHi : r.loc;
    const reviewText = (lang === 'hi' && r.textHi) ? r.textHi : (r.text || r.textEn);
    const initials = reviewerName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    
    // Star display
    const starsHtml = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const liked = hasLiked(r.id);
    const likeCount = (r.helpful || 0) + (liked ? 1 : 0);

    return `
      <div class="review-card bracket-card ${isNew ? 'review-card-new' : ''}" data-review-id="${r.id}">
        <div class="review-card-top">
          <div class="review-stars" aria-label="${r.rating} out of 5 stars">${starsHtml}</div>
          <div class="review-card-top-actions">
            ${isNew ? `<span class="review-new-pill">${dict.newBadge || 'New'}</span>` : ''}
            <div class="review-action-holder" id="action-holder-${r.id}">
              <button type="button" class="review-delete-btn" data-delete-id="${r.id}" title="${dict.deleteReview || 'Delete Review'}" aria-label="${dict.deleteReview || 'Delete Review'}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                <span>${dict.deleteBtn || 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
        
        <p class="review-quote">${escapeHtml(reviewText)}</p>
        
        <div class="review-footer-row">
          <div class="review-author">
            <div class="author-avatar" aria-hidden="true">${initials}</div>
            <div class="author-meta">
              <div class="author-name">${escapeHtml(reviewerName)}</div>
              <div class="author-loc">${escapeHtml(reviewerLoc)}</div>
            </div>
          </div>
          
          <button type="button" class="review-helpful-btn ${liked ? 'liked' : ''}" data-like-id="${r.id}" ${liked ? 'disabled' : ''}>
            <span aria-hidden="true">👍</span>
            <span class="helpful-label">${dict.helpfulBtn || 'Helpful'}</span>
            <span class="helpful-count">(${likeCount})</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Wire up helpful buttons
  container.querySelectorAll('.review-helpful-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-like-id');
      if (id && !hasLiked(id)) {
        setLike(id);
        renderReviews();
      }
    });
  });

  // Wire up delete buttons with inline confirmation
  container.querySelectorAll('.review-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-delete-id');
      const holder = document.getElementById(`action-holder-${id}`);
      if (!holder) return;

      holder.innerHTML = `
        <div class="review-delete-confirm" role="alert">
          <span class="confirm-prompt">${dict.confirmDelete || 'Delete review?'}</span>
          <button type="button" class="btn-confirm-delete" data-confirm-id="${id}">
            ${dict.confirmYes || 'Yes, Delete'}
          </button>
          <button type="button" class="btn-cancel-delete" data-cancel-id="${id}">
            ${dict.confirmCancel || 'Cancel'}
          </button>
        </div>
      `;

      // Cancel button restores original delete icon
      const cancelBtn = holder.querySelector('.btn-cancel-delete');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          renderReviews();
        });
      }

      // Confirm button triggers smooth exit animation & deletion
      const confirmBtn = holder.querySelector('.btn-confirm-delete');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const card = container.querySelector(`[data-review-id="${id}"]`);
          if (card) {
            card.classList.add('review-card-deleting');
          }
          setTimeout(() => {
            deleteReview(id);
            renderReviews();
            showToast(dict.reviewDeletedToast || 'Review has been deleted.');
          }, 260);
        });
      }
    });
  });

  renderRestoreControls();
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.review-filter-pill');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.getAttribute('data-filter') || 'all';
      updateFilterUI();
      renderReviews();
    });
  });
}

function updateFilterUI() {
  document.querySelectorAll('.review-filter-pill').forEach(btn => {
    const isCurrent = btn.getAttribute('data-filter') === activeFilter;
    btn.classList.toggle('active', isCurrent);
    btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
  });
}

function setupReviewForm() {
  const toggleBtn = document.getElementById('toggle-review-form-btn');
  const formWrap = document.getElementById('review-form-wrapper');
  const form = document.getElementById('user-review-form');
  const starBtns = document.querySelectorAll('.star-rating-btn');
  const toast = document.getElementById('action-toast');
  const toastText = document.getElementById('toast-text');

  if (!toggleBtn || !formWrap || !form) return;

  // 1. Toggle Form Visibility
  toggleBtn.addEventListener('click', () => {
    const isExpanded = formWrap.classList.toggle('visible');
    toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    const lang = getLang();
    const dict = I18N[lang]?.reviews || {};
    toggleBtn.innerHTML = isExpanded 
      ? `<span>${dict.closeFormBtn || '✕ Close Form'}</span>`
      : `<span>${dict.writeReviewBtn || '✍️ Write a Review'}</span>`;
    
    if (isExpanded) {
      const nameInput = document.getElementById('reviewer-name');
      if (nameInput) nameInput.focus();
    }
  });

  // 2. Interactive Star Rating Selector
  function updateStars(rating) {
    currentSelectedRating = rating;
    starBtns.forEach(btn => {
      const starVal = parseInt(btn.getAttribute('data-star') || '5', 10);
      btn.classList.toggle('active', starVal <= rating);
      btn.setAttribute('aria-checked', starVal === rating ? 'true' : 'false');
    });
  }

  starBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = parseInt(btn.getAttribute('data-star') || '5', 10);
      updateStars(val);
    });

    btn.addEventListener('mouseenter', () => {
      const hoverVal = parseInt(btn.getAttribute('data-star') || '5', 10);
      starBtns.forEach(b => {
        const v = parseInt(b.getAttribute('data-star') || '5', 10);
        b.classList.toggle('hovered', v <= hoverVal);
      });
    });

    btn.addEventListener('mouseleave', () => {
      starBtns.forEach(b => b.classList.remove('hovered'));
    });
  });

  // 3. Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('reviewer-name');
    const locInput = document.getElementById('reviewer-loc');
    const focusSelect = document.getElementById('reviewer-focus');
    const textInput = document.getElementById('reviewer-text');

    const name = nameInput ? nameInput.value.trim() : '';
    const loc = locInput ? locInput.value.trim() : '';
    const tag = focusSelect ? focusSelect.value : 'career';
    const text = textInput ? textInput.value.trim() : '';

    if (!name || !text) {
      if (nameInput && !name) nameInput.focus();
      else if (textInput) textInput.focus();
      return;
    }

    const newReview = {
      id: 'rev-' + Date.now(),
      name: name,
      nameHi: name,
      loc: loc || 'Uttarakhand / Online',
      locHi: loc || 'उत्तराखण्ड / ऑनलाइन',
      rating: currentSelectedRating,
      tag: tag,
      mode: loc.toLowerCase().includes('in-person') || loc.toLowerCase().includes('श्रीनगर') ? 'inperson' : 'online',
      text: text,
      textEn: text,
      textHi: text,
      date: new Date().toISOString().split('T')[0],
      helpful: 1,
      isUserSubmitted: true
    };

    saveUserReview(newReview);
    renderReviews();

    // Reset Form
    form.reset();
    updateStars(5);
    formWrap.classList.remove('visible');
    toggleBtn.setAttribute('aria-expanded', 'false');

    const lang = getLang();
    const dict = I18N[lang]?.reviews || {};
    toggleBtn.innerHTML = `<span>${dict.writeReviewBtn || '✍️ Write a Review'}</span>`;

    // Show Toast
    if (toast && toastText) {
      toastText.textContent = dict.thankYouToast || 'Thank you! Your review has been published.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    // Scroll to the new review smoothly
    const newCard = document.querySelector(`[data-review-id="${newReview.id}"]`);
    if (newCard) {
      newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function renderRestoreControls() {
  const restoreWrap = document.getElementById('reviews-restore-wrap');
  if (!restoreWrap) return;

  const lang = getLang();
  const dict = I18N[lang]?.reviews || {};
  const deleted = getDeletedReviewIds();

  if (deleted.length > 0) {
    restoreWrap.innerHTML = `
      <button type="button" class="reviews-restore-btn" id="restore-default-reviews-btn">
        <span aria-hidden="true">↺</span>
        <span>${dict.restoreReviewsBtn || 'Restore Default Reviews'}</span>
      </button>
    `;
    const restoreBtn = document.getElementById('restore-default-reviews-btn');
    if (restoreBtn) {
      restoreBtn.addEventListener('click', () => {
        restoreDefaultReviews();
        renderReviews();
        showToast(dict.reviewsRestoredToast || 'Default reviews have been restored.');
      });
    }
  } else {
    restoreWrap.innerHTML = '';
  }
}

function updateFormLabels() {
  const lang = getLang();
  const dict = I18N[lang]?.reviews || {};
  const toggleBtn = document.getElementById('toggle-review-form-btn');
  const formWrap = document.getElementById('review-form-wrapper');

  if (toggleBtn && formWrap) {
    const isExpanded = formWrap.classList.contains('visible');
    toggleBtn.innerHTML = isExpanded 
      ? `<span>${dict.closeFormBtn || '✕ Close Form'}</span>`
      : `<span>${dict.writeReviewBtn || '✍️ Write a Review'}</span>`;
  }
  renderRestoreControls();
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

