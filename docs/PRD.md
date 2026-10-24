# PRD — Bhavishya Darshan (भविष्य दर्शन)

Single-page static website for **Kuldeep Dhoundiyal**, a Hastarekha (palmistry) practitioner. Supersedes PROJECT.md where they differ.

## 1. Goal
Turn visitors into WhatsApp booking conversations. Premium, trustworthy, Hindi-first, fully static (no backend, no database).

## 2. Confirmed facts
| Item | Value |
| :-- | :-- |
| Brand | Bhavishya Darshan (भविष्य दर्शन) |
| Reader | Kuldeep Dhoundiyal |
| Experience | 5 years (show as "5+ वर्षों का अनुभव") |
| Language | Hindi (site copy in Devanagari) |
| Availability | Shri Nagar (in person) and online |
| Pricing | ₹300 for clients below 22 years, ₹500 for clients 22 and above |

Do **not** show invented numbers (palms analysed, client counts) or testimonials until real ones exist.

## 3. Audience
- Young adults (students, job seekers) in Uttarakhand and across India, mostly on phones, comfortable with WhatsApp and UPI.
- Families seeking guidance on career, marriage and general direction.

## 4. Offering (simplified from the old 3-tier plan)
One consultation, priced by age:
- **22 से कम: ₹300**
- **22 और उससे अधिक: ₹500**

Modes: in person (Shri Nagar) or online (WhatsApp call/video, palm photos shared in chat).
Focus areas selectable by client: करियर और धन / विवाह और रिश्ते / स्वास्थ्य और ऊर्जा / सम्पूर्ण जीवन.

## 5. Functional requirements
| # | Requirement |
| :-- | :-- |
| F1 | Hero with brand, tagline, primary CTA "परामर्श बुक करें" and secondary CTA "रेखाएँ जानें" |
| F2 | About section: reader photo, name, 5+ years, ethical philosophy (no fear, no death or medical predictions) |
| F3 | Interactive palm explorer: Jeevan, Mastishk, Hridaya, Bhagya, Surya lines and mounts, scroll-driven and tap/hover |
| F4 | Pricing section with an age toggle (22 से कम / 22+) that shows the matching price live |
| F5 | How it works: 3 steps (details, palm photos on WhatsApp, payment and session) |
| F6 | Palm photo guide: daylight, both hands, flat and relaxed |
| F7 | FAQ accordion |
| F8 | Booking form: name, date of birth (required, used to apply the right price), dominant hand, focus area, mode (in person / online), preferred day and time, optional note |
| F9 | "WhatsApp पर भेजें" opens `wa.me` with a pre-filled Hindi message including price tier |
| F10 | Floating WhatsApp button: plain quick-question chat with a short greeting |
| F11 | QR code section (desktop visitors scan to open WhatsApp) plus downloadable printable QR for cards and social |
| F12 | Disclaimer and privacy note; footer with contact and location |
| F13 | Hindi `lang="hi"`, SEO meta, Open Graph image |

## 6. Business rules
- Age is derived from date of birth at submit time. Under 22 → ₹300, else ₹500.
- Under 18: show a short note that a parent or guardian should be present and consent to sharing palm photos.
- No payment on the site. Payment (UPI) is shared by the reader inside WhatsApp.
- Palm photos are sent only inside WhatsApp; nothing is uploaded to the site.

## 7. Content rules
- Tone: calm, respectful, practical. Guidance and self-awareness, never fear.
- Required disclaimer: readings are traditional guidance for reflection, not medical, legal or financial advice.
- A short Jeevan Rekha note: line length reflects vitality, not lifespan.

## 8. Non-goals
Backend, user accounts, online payments, uploads on the site, blog, multi-language toggle (Hindi only for launch).

## 9. Success metrics
- WhatsApp click-through from CTA and form (tracked as events)
- Form completion rate
- Lighthouse mobile: Performance 90+, Accessibility 95+, SEO 95+
- Smooth scroll animation at 60fps on a mid-range Android phone

## 10. Open items (need answers from the reader)
1. WhatsApp number (use Business app if possible)
2. Session durations
3. UPI ID and payment QR
4. Working days, hours and time zone
5. Exact city name and address in Shri Nagar for in-person sessions
6. Instagram, YouTube and email links, if any
7. His story in his own words (Hindi, 4–6 lines) and any teachers, lineage or certificates
8. Whether he sells gemstones or remedies, or explicitly does not
9. Refund and reschedule rules
10. A cleaner portrait photo (the current photo works as a first version)
