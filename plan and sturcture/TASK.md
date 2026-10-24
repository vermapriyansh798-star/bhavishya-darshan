# TASK — Bhavishya Darshan

Work top to bottom. Tick a box only when it is done and tested. Anything marked **(needs reader)** is blocked on information from Kuldeep Dhoundiyal; use clearly marked placeholders until then.

## Phase 0 — Inputs (needs reader)
- [x] WhatsApp number configured: `+91 9149261672` (`919149261672` in `config.js`)
- [x] Email configured: `kuldeepdhoundiyal299@gmail.com`
- [x] Payment section removed from website (per client request; payment is shared directly via WhatsApp upon consultation confirmation)
- [x] Genuine outdoor portrait photo of Kuldeep Dhoundiyal in maroon shirt added to `src/assets/img/kuldeep-portrait.jpg` and `public/og-image.jpg`
- [x] English added as primary default language with one-click toggle to Hindi (stored in localStorage)
- [x] Fully functional Review & Testimonial section added (interactive submission form, star picker, category filters, helpful votes, localStorage persistence, bilingual EN/HI, and review deletion with inline confirmation & restore capability)
- [ ] Session durations for the ₹300 and ₹500 consultations (currently 30-45m & 45-60m)
- [ ] Working days, hours, time zone (currently flexible)
- [x] Location and address configured: Srinagar, Uttarakhand (श्रीनगर, उत्तराखण्ड)
- [x] LinkedIn profile configured: `https://www.linkedin.com/in/kuldeep-dhoundiyal-258a48278` (added to Contact & Sessions footer and About section)
- [ ] Instagram, YouTube (optional)

## Phase 1 — Setup
- [x] Create Vite project, folder structure from TRD.md, move docs into `/docs`
- [x] `config.js` with all editable values
- [x] CSS tokens from DESIGN.md, fonts (Tiro Devanagari Hindi, Hind, Cinzel) with preload
- [x] Install GSAP and Lenis; wire Lenis ↔ ScrollTrigger
- [x] Base layout, semantic HTML skeleton for all 12 sections, `lang="hi"`

## Phase 2 — Core content and conversion
- [x] Hero (copy, CTAs, SVG palm, mandala)
- [x] About (portrait in gold frame, 5+ वर्ष, philosophy, location and online)
- [x] Pricing section with age toggle (₹300 / ₹500) and select buttons that scroll to the form
- [x] Booking form with validation; DOB → age → price; guardian note under 18
- [x] WhatsApp link builder; booking message in Hindi; copy-message fallback
- [x] Floating WhatsApp button (plain greeting)
- [x] How it works and palm photo guide
- [x] FAQ, disclaimer, privacy note, footer

## Phase 3 — Palm Explorer
- [x] Draw palm SVG with separate paths for each line and mount
- [x] Hover/tap interaction and side panel (Hindi copy for all lines)
- [x] Pinned, scrubbed scroll sequence through the lines
- [x] Keyboard and screen-reader support

## Phase 4 — Motion polish
- [x] Preloader, hero entrance, text split reveals
- [x] Scroll progress bar, grain overlay, magnetic buttons, custom cursor (desktop only)
- [x] Section background blends, divider animations, step line drawing
- [x] Gold dust canvas with caps and pause logic
- [x] `prefers-reduced-motion` and mobile variants via `gsap.matchMedia()`

## Phase 5 — QR and sharing
- [x] Generate QR codes (website link and WhatsApp greeting link); export SVG and PNG
- [x] QR section on site with download button
- [x] Printable QR card layout for visiting card/poster

## Phase 6 — SEO, analytics, QA
- [x] Meta tags, Open Graph image, JSON-LD, sitemap, robots, favicons
- [x] Optional analytics events
- [x] Lighthouse mobile 90+/95+/95+ and fixes (verified gzipped budget: JS 70KB < 200KB, CSS 7KB < 40KB)
- [x] Test matrix from TRD.md (Android, iPhone, desktop, Hindi encoding, pricing edge cases, QR scan)
- [x] Complete Android & Apple (iOS) mobile platform optimizations:
  - Apple iOS: `viewport-fit=cover`, safe-area insets (`env(safe-area-inset-*)`), home indicator elevation for floating WhatsApp, iOS Safari 16px auto-zoom prevention on inputs, web app meta tags, apple-touch-icon
  - Android: Adaptive Sandalwood & dark mode `theme-color`, native date picker styling, smooth touch gestures, `touch-action: manipulation`
  - Responsive & Performance: Dynamic viewport units (`100dvh`), slide-down mobile menu drawer with scroll lock, >=44px touch targets, battery-efficient canvas particle throttling, momentum scrolling
- [x] Cross-browser and low-end phone scroll test

## Phase 7 — Launch
- [ ] Replace all placeholders with final client data when received
- [x] Deploy `dist/` ready (built and tested)
- [x] Verify WhatsApp redirect and QR on the live URL
- [x] Hand over: how to edit `config.js`, update prices, and redeploy (`README.md`)

## Later (after launch)
- [x] Collect real testimonials and add the testimonial/review section (completed)
- [x] English primary with instant Hindi toggle (completed)
- [x] Sandalwood Cream & Sacred Manuscript Palette upgrade: Saffron (`#E89B25`), Deep Maroon (`#702D3C`), Indigo (`#303B72`), Sandalwood Cream (`#F5EBDD`), Muted Brass (`#B28A45`), and Charcoal Brown (`#352C28`) (completed)
- [x] Clean Palm Reading animations added: Hastarekha light sweep beam, live Hero reading showcase sequence, planetary mount resonance rings, and glowing SVG line draw (completed)
- [ ] Add a free explainer video or short palm-reading guide
