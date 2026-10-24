# TRD — Bhavishya Darshan

## 1. Stack
- **Build:** Vite + vanilla JavaScript (ES modules), output is plain static files (`dist/`)
- **Styling:** Hand-written CSS with custom properties (tokens from DESIGN.md); no CSS framework
- **Motion:** GSAP (ScrollTrigger, SplitText) and Lenis, installed via npm and bundled
- **Graphics:** Inline SVG (palm, mandala, lotus), small canvas for gold dust
- **QR:** Pre-generated static PNG/SVG in `/assets/qr/`; optional `qrcode` library for on-page QR
- **Hosting:** Vercel, Netlify, GitHub Pages or Cloudflare Pages. No server runtime.

## 2. Project structure
```
/
├─ index.html
├─ vite.config.js
├─ src/
│  ├─ config.js          # all editable content and numbers
│  ├─ main.js
│  ├─ styles/ (tokens.css, base.css, sections.css, motion.css)
│  ├─ js/ (smooth-scroll.js, animations.js, palm-explorer.js, pricing.js, booking.js, qr.js, a11y.js)
│  └─ assets/ (svg/, img/, fonts/, qr/)
├─ public/ (favicon, og-image.jpg, robots.txt, sitemap.xml)
└─ docs/ (PRD.md, DESIGN.md, TRD.md, TASK.md)
```

## 3. Single config file
```javascript
// src/config.js
export const CONFIG = {
  brand: "भविष्य दर्शन",
  readerName: "कुलदीप ढौंडियाल",
  whatsappNumber: "91XXXXXXXXXX", // country code + number, no +, spaces or dashes
  experienceYears: 5,
  locations: ["श्रीनगर", "ऑनलाइन"],
  priceUnder22: 300,
  price22Plus: 500,
  ageThreshold: 22,
  social: { instagram: "", youtube: "", email: "" }
};
```

## 4. Pricing logic
```javascript
export function ageFromDob(dobStr, today = new Date()) {
  const dob = new Date(dobStr);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}
export const priceFor = (age) =>
  age < CONFIG.ageThreshold ? CONFIG.priceUnder22 : CONFIG.price22Plus;
```
Validate DOB: not in the future, age 5–110. Show the computed price before sending. Under 18 → show the guardian-consent note.

## 5. WhatsApp link builder
```javascript
export function waLink(text = "") {
  const base = `https://wa.me/${CONFIG.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
```
- Booking message built from form values (Hindi), including price tier and mode.
- Floating button uses a short greeting only.
- Always `target="_blank" rel="noopener noreferrer"`.
- Fallback: if the popup is blocked, show a "संदेश कॉपी करें" button and the visible number.
- QR codes encode `waLink(greeting)`. Keep text short for scannability; test on Android and iPhone.

## 6. Scroll and animation architecture
- One Lenis instance; `lenis.on('scroll', ScrollTrigger.update)` and GSAP ticker drives Lenis.
- `gsap.matchMedia()` for desktop, mobile and reduced-motion variants.
- Palm explorer: pinned ScrollTrigger with a scrubbed timeline; each line is an SVG path with its length measured at runtime for `stroke-dashoffset`.
- Canvas particles: `requestAnimationFrame`, particle cap (desktop 60, mobile 20), paused via IntersectionObserver.
- Refresh ScrollTrigger after fonts and images load.

## 7. Performance budget
- LCP under 2.5s on mid-range mobile over 4G; CLS under 0.05; INP under 200ms
- JS under 200KB gzipped, CSS under 40KB gzipped (excluding fonts)
- Fonts: subset, `font-display: swap`, preload only the used weights
- Images: WebP/AVIF with width/height, portrait in two sizes (480w, 960w)
- Animate transform and opacity only; no layout properties

## 8. SEO and sharing
- `<html lang="hi">`, title and meta description in Hindi, canonical URL
- Open Graph and Twitter card with a 1200×630 image
- JSON-LD `Person` plus `ProfessionalService` with area served and languages
- `robots.txt`, `sitemap.xml`, favicon set, theme-color `#2A070B`
- Target keywords: हस्तरेखा शास्त्र, पामिस्ट्री श्रीनगर उत्तराखंड, ऑनलाइन हस्तरेखा परामर्श

## 9. Accessibility and compatibility
- WCAG 2.1 AA, keyboard and screen-reader pass on form, accordion and explorer
- Support latest 2 versions of Chrome, Safari, Firefox, Edge; Android 9+ and iOS 15+
- Works without JS for core content and the plain WhatsApp link

## 10. Privacy and security
- No data stored or transmitted by the site; the booking form only builds a WhatsApp link in the browser
- Optional privacy-friendly analytics (Plausible or Umami) with events: `cta_click`, `form_submit`, `wa_float_click`, `qr_download`
- If Google Analytics is used, add a cookie notice
- Security headers via host config (CSP, `X-Content-Type-Options`, `Referrer-Policy`)
- Privacy note on the page explaining that DOB and palm photos are shared only in WhatsApp and used only for the reading

## 11. Testing matrix
| Area | Check |
| :-- | :-- |
| Booking | Form → WhatsApp opens with correct text on Android, iPhone, desktop |
| Pricing | 21 → ₹300, 22 → ₹500, birthday-today edge cases |
| Hindi | Devanagari encoding survives `encodeURIComponent` and appears correctly in WhatsApp |
| Motion | 60fps scroll on mid-range Android; reduced-motion mode works |
| Lighthouse | Performance 90+, Accessibility 95+, SEO 95+ on mobile |
| QR | Scans from screen and print on multiple phones |

## 12. Deployment
`npm run build` → deploy `dist/` to the chosen static host, attach domain, force HTTPS, verify OG image with a link-preview test.
