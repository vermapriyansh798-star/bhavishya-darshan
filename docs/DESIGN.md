# DESIGN — Bhavishya Darshan

Direction: **Vedic Heritage, premium and cinematic.** Deep temple maroon and antique gold, manuscript elegance, slow confident motion. Not a crystal-ball or neon-astrology look.

## 1. Colour tokens
| Token | Hex | Use |
| :-- | :-- | :-- |
| `--maroon-950` | `#2A070B` | Page base, hero, footer |
| `--maroon-800` | `#3D0C11` | Dark sections, cards on dark |
| `--parchment` | `#FAF5EA` | Light sections |
| `--ivory` | `#F3E9D2` | Cards, FAQ, form |
| `--gold` | `#C59B27` | Lines, borders, dividers, highlights |
| `--gold-glow` | `#E8C65A` | Glow, active line, hover |
| `--saffron` | `#D9531E` | Primary buttons |
| `--ink` | `#1E1412` | Text on light |
| `--alabaster` | `#FDFBF7` | Text on dark |
| `--whatsapp` | `#25D366` | WhatsApp button only |

Gradients: maroon-950 → maroon-800 radial behind hero; gold hairline gradients for dividers. Contrast must pass WCAG AA (check gold on maroon for text, use alabaster for body text).

## 2. Typography (Devanagari first)
- Display / headings: **Tiro Devanagari Hindi** (serif) or Noto Serif Devanagari
- Body / UI: **Hind** or Noto Sans Devanagari
- Brand wordmark (Latin): **Cinzel**
- Scale (fluid, `clamp`): H1 3rem–6.5rem, H2 2rem–3.75rem, body 1rem–1.125rem, line-height 1.7 for Hindi body
- Devanagari needs extra line-height and no negative letter-spacing. Load fonts with `display=swap` and preload the two used weights.

## 3. Visual motifs
- Slow-rotating mandala watermark (SVG, 4–8% opacity) behind hero and explorer
- Gold corner brackets on cards and the portrait frame
- Lotus / Surya dividers between sections
- Floating gold dust particles in hero (canvas, capped count, paused when off-screen)
- Palm drawn as thin gold SVG strokes, never a photo of a hand

## 4. Motion system
Libraries: **Lenis** (smooth scroll) + **GSAP** with ScrollTrigger and SplitText.
Easing: `power3.out` for reveals, `expo.out` for hero, `none` for scrubbed scroll.
Rule: animate only `transform` and `opacity`; no layout-thrashing properties.

| Section | Motion |
| :-- | :-- |
| Preloader | Gold line draws a lotus / Om outline, then curtain wipe up (under 1.2s, skipped on repeat visit) |
| Hero | Headline split into lines/words, masked rise-in; palm outline strokes draw in (`stroke-dashoffset`); mandala slow rotate; gold dust; palm parallaxes on mouse (desktop) and scroll |
| About | Portrait reveals with a gold frame drawing around it; text lines fade-up; "5+ वर्ष" counter ticks up |
| Palm Explorer (signature) | **Pinned section.** As the user scrolls, the palm is scrubbed through Jeevan → Mastishk → Hridaya → Bhagya → Surya: the active line glows gold and draws along its path while the side panel text swaps. Tap/hover also works for free exploration. |
| Pricing | Cards rise with stagger; age toggle slides a gold pill and the price rolls (digit slot) between ₹300 and ₹500 |
| How it works | Three steps connected by a gold line that draws as you scroll; step icons pop in |
| Photo guide | Horizontal pinned scroll on desktop, swipe cards on mobile |
| FAQ | Accordion with smooth height and a rotating lotus icon |
| Booking | Fields fade in sequentially; CTA has a magnetic hover and gold shimmer sweep |
| Footer | Marquee of Sanskrit phrases, mandala fades in |

Global extras: scroll progress bar (gold, top), subtle grain overlay, magnetic buttons, custom cursor (desktop with fine pointer only), section-to-section background colour blends (maroon ↔ parchment) instead of hard cuts.

## 5. Reduced motion and performance rules
- `prefers-reduced-motion: reduce` → disable Lenis, scrubbing, parallax, particles and preloader; keep simple fades.
- Mobile: fewer particles, no custom cursor, no heavy pinned sequences beyond the explorer; test at 60fps on a mid-range Android.
- Use `will-change` sparingly, kill ScrollTriggers on resize/refresh safely, and pause canvas when the tab or section is off-screen.
- Images: WebP/AVIF, explicit width and height, lazy-load below the fold.

## 6. Components
Buttons (primary saffron, ghost gold, WhatsApp green), gold-bracket card, price card, age toggle, stepper, accordion, form field (large touch targets, 48px min), floating WhatsApp button (bottom-right, z-index 50), QR card, section divider, toast ("WhatsApp खुल रहा है…").

## 7. Layout
Mobile-first, single column, 12-column grid from 1024px, max content width 1200px, generous vertical rhythm (96–160px between sections on desktop).

## 8. Accessibility
Semantic landmarks, visible focus ring in gold, keyboard-operable explorer and accordion, alt text for the portrait and SVG `<title>`/`<desc>`, minimum 44px targets, never rely on colour alone for the active palm line (also change stroke width and label).

## 9. Portrait treatment
The supplied photo is a casual outdoor shot in a maroon shirt that suits the palette. Crop to 4:5, place inside the gold-bracket frame with a soft maroon vignette, and later replace it with a cleaner, plain-background portrait if possible.
