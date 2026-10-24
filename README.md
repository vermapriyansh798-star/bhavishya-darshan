# 🚩 भविष्य दर्शन (Bhavishya Darshan)

> **हस्तरेखा में छिपा आपके जीवन का सच्चा मार्गदर्शन**  
> प्रामाणिक वैदिक हस्तरेखा परामर्श — **कुलदीप ढौंडियाल** (5+ वर्षों का अनुभव)  
> श्रीनगर (गढ़वाल), उत्तराखण्ड एवं सम्पूर्ण भारत में ऑनलाइन परामर्श।

---

## 🌟 अवलोकन (Overview)

**भविष्य दर्शन** एक आधुनिक, उच्च-स्तरीय (cinematic), देवनागरी-प्रथम (Hindi-first), सिंगल-पेज वेबसाइट है जिसे हस्तरेखा विशेषज्ञ कुलदीप ढौंडियाल के लिए तैयार किया गया है। इसका प्राथमिक उद्देश्य आगंतुकों को विश्वासपूर्ण अनुभव प्रदान कर WhatsApp बुकिंग वार्तालाप में बदलना है।

- **Bilingual Experience**: **English as Primary Default** (`en`), with instant one-click toggle to **हिन्दी (Hindi)**. User preference is saved in `localStorage`.
- **Vedic Heritage Design**: Deep Temple Maroon (`#2A070B`), Antique Gold (`#C59B27`), Glowing Gold (`#E8C65A`), Sacred Saffron (`#D9531E`), and Warm Sacred Parchment (`#FAF5EA`).
- **Devanagari & Latin Typography**: Tiro Devanagari Hindi (headings), Hind (body with generous 1.75 line-height), and Cinzel (brand wordmark).
- **Signature Palm Explorer**: Interactive and scrubbed scroll deep dive into Life line, Head line, Heart line, Fate line, Sun line, and 6 planetary mounts.
- **Dynamic Live Pricing**: **₹300** for seekers below 22 years, **₹500** for seekers 22 years and above.
- **WhatsApp Integration**: Form submits pre-formatted bilingual consultation requests (in English or Hindi based on active language) directly to WhatsApp.
- **Authentic Portrait**: Features Kuldeep Dhoundiyal's genuine photo in maroon shirt inside a gold-bracket frame with soft vignette.

---

## 🛠️ तकनीकी संरचना (Tech Stack)

- **बिल्ड सिस्टम**: Vite + Vanilla JavaScript (ES Modules)
- **स्टाइलिंग**: शुद्ध हस्तलिखित CSS (Tokens, CSS Custom Properties, कोई भारी फ्रेमवर्क नहीं)
- **मोशन व एनिमेशन**: GSAP (ScrollTrigger) + Lenis Smooth Scroll
- **QR कोड**: `qrcode` (कैनवास रेंडरिंग एवं PNG डाउनलोड)
- **एक्सेसिबिलिटी**: WCAG 2.1 AA, कीबोर्ड नेविगेशन, `prefers-reduced-motion` पूर्ण समर्थन
- **बजट अनुपालन**: JS < 70KB gzipped, CSS < 7KB gzipped

---

## 🚀 त्वरित शुरुआत (Quick Start)

```bash
# 1. निर्भरताएँ संस्थापित करें (Install dependencies)
npm install

# 2. स्थानीय विकास सर्वर प्रारंभ करें (Run dev server)
npm run dev

# 3. स्वचालित परीक्षण चलाएँ (Run verification tests)
npm test

# 4. उत्पादन बंडल बनाएँ (Production build)
npm run build
```

---

## ⚙️ सामग्री व शुल्क कैसे बदलें? (How to Edit `config.js`)

वेबसाइट की सभी परिवर्तनशील जानकारियाँ, कीमतें, फोन नंबर और विवरण एक ही फ़ाइल में स्थित हैं:  
📂 [`src/config.js`](file:///c:/Users/verma/Downloads/bhavishya%20darshan/src/config.js)

### 1. WhatsApp नंबर बदलना:
फ़ाइल खोलें और `whatsappNumber` बदलें:
```javascript
// देश कोड (91) + 10 अंकों का मोबाइल नंबर (बिना +, स्पेस या डैश के)
whatsappNumber: "919876543210",
```

### 2. परामर्श शुल्क बदलना:
```javascript
priceUnder22: 300,  // 22 वर्ष से कम आयु का शुल्क (₹)
price22Plus: 500,   // 22 वर्ष एवं अधिक आयु का शुल्क (₹)
ageThreshold: 22,   // आयु सीमा
```

### 3. सत्र अवधि व पता बदलना:
```javascript
durations: {
  under22: "30 से 45 मिनट गहन विश्लेषण",
  adult: "45 से 60 मिनट सम्पूर्ण विश्लेषण"
},
locationDetails: "श्रीनगर (गढ़वाल), उत्तराखण्ड [विस्तृत पता]",
```

---

## 🚢 परिनियोजन (Deployment)

यह वेबसाइट 100% स्थिर (static) है; इसमें किसी बैकएंड या डेटाबेस की आवश्यकता नहीं है।

```bash
npm run build
```
बिल्ड के बाद सारा आउटपुट `dist/` फ़ोल्डर में तैयार हो जाता है।

### Vercel / Netlify / Cloudflare Pages / GitHub Pages:
1. रिपॉजिटरी को गिटहब पर पुश करें।
2. Vercel या Netlify में `New Project` चुनें।
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. परिनियोजित करें।

---

## 📋 क्लाइंट से अपेक्षित जानकारियाँ (Needs from Client)

वर्तमान में वेबसाइट पर निम्नलिखित स्थानों पर स्पष्ट प्लेसहोल्डर प्रयुक्त हैं, जिन्हें वास्तविक जानकारी प्राप्त होते ही `src/config.js` में अद्यतित किया जा सकता है:

1. **WhatsApp नंबर**: (वर्तमान में प्लेसहोल्डर `91XXXXXXXXXX`) — कुलदीप जी का आधिकारिक WhatsApp Business नंबर।
2. **सत्र अवधि**: (वर्तमान में 30-45 मिनट एवं 45-60 मिनट अनुमानित)।
3. **UPI ID**: प्रत्यक्ष भुगतान हेतु UPI पता (GPay/PhonePe)।
4. **श्रीनगर का सटीक पता**: प्रत्यक्ष भेंट हेतु श्रीनगर (गढ़वाल) का कार्यालय/आवासीय पता।
5. **कार्य दिवस व समय**: परामर्श उपलब्ध रहने के दिन एवं समय।
6. **संक्षिप्त व्यक्तिगत कथा**: कुलदीप जी के अपने शब्दों में 4-6 पंक्तियों की यात्रा/गुरु परंपरा (वैकल्पिक)।
7. **रिफंड व री-शेड्यूल नियम**: सत्र पुनर्निर्धारण सम्बन्धी नियम (वैकल्पिक)।

---

## 🧪 स्वचालित परीक्षण (Verification Test Suite)

प्रोजेक्ट में अंतर्निहित स्वचालित परीक्षण सुइट शामिल है:
```bash
node test-suite.js
```
यह परीक्षण करता है:
- उम्र 21 पर ₹300 तथा उम्र 22 पर ₹500 का सही निर्धारण
- जन्मदिन की आज की तारीख और कल की तारीख की सीमा (boundary cases)
- 18 वर्ष से कम आयु पर अभिभावक सहमति सूचना
- देवनागरी हिंदी का WhatsApp URL में सुरक्षित रूप से एनकोड व डिकोड होना
- सभी 12 मुख्य सेक्शनों की HTML व ARIA सुलभता
- वैदिक हेरिटेज CSS टोकनों की सत्यता
#   b h a v i s h y a - d a r s h a n  
 