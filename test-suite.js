/**
 * Automated Verification Test Suite for Bhavishya Darshan (Bilingual: EN / HI)
 */
import fs from 'fs';
import path from 'path';
import { CONFIG, ageFromDob, priceFor, waLink, buildBookingMessage } from './src/config.js';
import { I18N } from './src/js/i18n.js';

console.log("=================================================");
console.log("BHAVISHYA DARSHAN — BILINGUAL TEST SUITE (EN/HI)");
console.log("=================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Facts & Configuration
console.log("1. FACTS & CONFIGURATION:");
assert(CONFIG.brand === "भविष्य दर्शन", "Brand is भविष्य दर्शन");
assert(CONFIG.readerName === "कुलदीप ढौंडियाल", "Reader name is कुलदीप ढौंडियाल");
assert(CONFIG.experienceYears === 5, "Experience is 5 years");
assert(CONFIG.priceUnder22 === 300, "Under 22 price is 300");
assert(CONFIG.price22Plus === 500, "22+ price is 500");
assert(CONFIG.whatsappNumber === "919149261672", "WhatsApp number is 919149261672");
assert(CONFIG.social.email === "kuldeepdhoundiyal299@gmail.com", "Email is kuldeepdhoundiyal299@gmail.com");
assert(CONFIG.social.linkedin.includes("linkedin.com/in/kuldeep-dhoundiyal-258a48278"), "LinkedIn URL is configured");
assert(CONFIG.locations.includes("श्रीनगर, उत्तराखण्ड"), "Includes श्रीनगर, उत्तराखण्ड");
assert(CONFIG.locationDetails === "श्रीनगर, उत्तराखण्ड", "Address in config is श्रीनगर, उत्तराखण्ड");

// 2. Pricing & DOB Boundary Logic
console.log("\n2. PRICING & DOB BOUNDARY LOGIC:");
const refDate = new Date("2026-10-24T12:00:00Z");

const age21 = ageFromDob("2005-01-01", refDate);
assert(age21 === 21, `2005-01-01 calculates to age 21 (got ${age21})`);
assert(priceFor(age21) === 300, `Age 21 price is ₹300 (got ${priceFor(age21)})`);

const ageBirthdayToday = ageFromDob("2004-10-24", refDate);
assert(ageBirthdayToday === 22, `Birthday today calculates to age 22 (got ${ageBirthdayToday})`);
assert(priceFor(ageBirthdayToday) === 500, `Birthday today price is ₹500 (got ${priceFor(ageBirthdayToday)})`);

const ageBirthdayTomorrow = ageFromDob("2004-10-25", refDate);
assert(ageBirthdayTomorrow === 21, `Birthday tomorrow calculates to age 21 (got ${ageBirthdayTomorrow})`);
assert(priceFor(ageBirthdayTomorrow) === 300, `Birthday tomorrow price is ₹300 (got ${priceFor(ageBirthdayTomorrow)})`);

assert(priceFor(25) === 500, "Age 25 is ₹500");

// 3. Bilingual WhatsApp Messages (English & Hindi)
console.log("\n3. BILINGUAL WHATSAPP MESSAGING:");
const sampleClient = {
  name: "Aryan",
  dob: "2009-05-10",
  dominantHand: "Right Hand",
  focusArea: "Career, Education & Finance",
  mode: "Online Consultation",
  preferredTime: "5 PM"
};

// English Message (Primary)
const msgEn = buildBookingMessage(sampleClient, 'en');
assert(msgEn.includes("Bhavishya Darshan — Palmistry Consultation Request"), "English message header correct");
assert(msgEn.includes("₹300"), "English message price ₹300");
assert(msgEn.includes("Guardian Consent"), "English minor consent included");

// Hindi Message (User preferred)
const msgHi = buildBookingMessage({ ...sampleClient, name: "आर्यन", dominantHand: "दायाँ हाथ" }, 'hi');
assert(msgHi.includes("भविष्य दर्शन — हस्तरेखा परामर्श अनुरोध"), "Hindi message header correct");
assert(msgHi.includes("₹300"), "Hindi message price ₹300");
assert(msgHi.includes("अभिभावक सहमति"), "Hindi minor consent included");

// 4. URL Encoding
console.log("\n4. URL ENCODING & LINKS:");
const linkEn = waLink(msgEn);
assert(linkEn.startsWith(`https://wa.me/${CONFIG.whatsappNumber}?text=`), "WhatsApp English link formatted");
assert(decodeURIComponent(linkEn.split('text=')[1]) === msgEn, "English text roundtrips cleanly");

const linkHi = waLink(msgHi);
assert(decodeURIComponent(linkHi.split('text=')[1]) === msgHi, "Devanagari text roundtrips cleanly");

// 5. i18n Dictionary Integrity
console.log("\n5. I18N DICTIONARY INTEGRITY:");
assert(CONFIG.upiId === "kuldeepdhoundiyal299@oksbi", "UPI ID is kuldeepdhoundiyal299@oksbi");
assert(!!I18N.en && !!I18N.hi, "Both EN and HI dictionaries exist");
assert(I18N.en.nav.about === "About" && I18N.hi.nav.about === "परिचय", "Nav translations exist");
assert(I18N.en.nav.reviews === "Reviews" && I18N.hi.nav.reviews === "समीक्षाएँ", "Nav reviews translated");
assert(I18N.en.lines.jeevan.name === "Life Line" && I18N.hi.lines.jeevan.name === "जीवन रेखा", "Lines translated");
assert(I18N.en.pricing.card1Title === "Youth Reading" && I18N.hi.pricing.card1Title === "युवा परामर्श", "Pricing translated");
assert(!!I18N.en.reviews && !!I18N.hi.reviews, "Reviews dictionary exists in EN and HI");
assert(!!I18N.en.upi && !!I18N.hi.upi, "UPI dictionary exists in EN and HI");

assert(!!I18N.en.reviews.deleteReview && !!I18N.hi.reviews.deleteReview, "Review delete button translated in EN & HI");
assert(!!I18N.en.reviews.confirmDelete && !!I18N.hi.reviews.confirmDelete, "Review delete confirmation translated in EN & HI");
assert(!!I18N.en.reviews.reviewDeletedToast && !!I18N.hi.reviews.reviewDeletedToast, "Review deleted toast translated in EN & HI");
assert(!!I18N.en.reviews.restoreReviewsBtn && !!I18N.hi.reviews.restoreReviewsBtn, "Restore default reviews translated in EN & HI");

// 6. HTML & Assets Check
console.log("\n6. HTML STRUCTURE & ASSETS CHECK:");
const htmlContent = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
assert(htmlContent.includes('<html lang="en"'), "HTML has primary lang='en'");
assert(htmlContent.includes('viewport-fit=cover'), "Viewport contains viewport-fit=cover for iOS safe areas");
assert(htmlContent.includes('apple-mobile-web-app-capable'), "Apple mobile web app capable meta tag present");
assert(htmlContent.includes('apple-touch-icon'), "Apple touch icon link present");
assert(htmlContent.includes('name="theme-color" content="#F5EBDD"'), "Sandalwood theme color meta tag present");
assert(htmlContent.includes('format-detection'), "Format detection meta tag present");
assert(htmlContent.includes('class="lang-switcher"'), "Language switcher present in header");
assert(htmlContent.includes('src="/src/assets/img/kuldeep-portrait.jpg"'), "Portrait image referenced");
assert(!htmlContent.includes('class="upi-payment-card"'), "Payment card is removed from HTML");
assert(!htmlContent.includes('id="copy-upi-btn"'), "Copy UPI button is removed from HTML");
assert(htmlContent.includes('linkedin.com/in/kuldeep-dhoundiyal-258a48278'), "LinkedIn profile link present in HTML");
assert(htmlContent.includes('Srinagar, Uttarakhand'), "Srinagar, Uttarakhand present in HTML");

// Functional Review Components in HTML
assert(htmlContent.includes('id="reviews-container"'), "Reviews container present");
assert(htmlContent.includes('id="reviews-restore-wrap"'), "Restore reviews container present in HTML");
assert(htmlContent.includes('id="toggle-review-form-btn"'), "Write review toggle button present");
assert(htmlContent.includes('id="user-review-form"'), "Review submission form present");
assert(htmlContent.includes('class="star-rating-selector"'), "Star rating selector present");
assert(htmlContent.includes('class="review-filter-pill"'), "Review filter pills present");

const portraitExists = fs.existsSync(path.resolve('./src/assets/img/kuldeep-portrait.jpg'));
assert(portraitExists, "kuldeep-portrait.jpg exists in assets directory");

const requiredIds = [
  'scroll-progress',
  'preloader',
  'hero',
  'about',
  'palm-explorer',
  'pricing',
  'how-it-works',
  'photo-guide',
  'reviews',
  'reviews-restore-wrap',
  'faq',
  'qr-section',
  'booking',
  'footer',
  'floating-whatsapp-btn'
];

requiredIds.forEach(id => {
  assert(htmlContent.includes(`id="${id}"`), `HTML contains section id #${id}`);
});

// 7. REVIEW DELETION & RESTORATION MODULE TESTS
console.log("\n7. REVIEW DELETION & RESTORATION LOGIC:");
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
};

const { getAllReviews, deleteReview, restoreDefaultReviews, SEED_REVIEWS } = await import('./src/js/reviews.js');

const initialCount = getAllReviews().length;
assert(initialCount === SEED_REVIEWS.length, `Initial reviews count matches seed count (${initialCount})`);

// Delete seed-1
deleteReview('seed-1');
const afterDeleteSeed = getAllReviews();
assert(afterDeleteSeed.length === initialCount - 1, `Review count decremented after delete (${afterDeleteSeed.length})`);
assert(!afterDeleteSeed.some(r => r.id === 'seed-1'), "Deleted review 'seed-1' is excluded from getAllReviews");

// Restore default reviews
restoreDefaultReviews();
const afterRestore = getAllReviews();
assert(afterRestore.length === initialCount, `Review count restored to initial (${afterRestore.length})`);
assert(afterRestore.some(r => r.id === 'seed-1'), "'seed-1' successfully restored");

console.log("\n=================================================");
console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log("=================================================");

if (failed > 0) {
  process.exit(1);
}
