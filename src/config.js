/**
 * Bhavishya Darshan (भविष्य दर्शन)
 * Central Configuration File
 * All client details, pricing, copy constants, and URLs are configured here.
 */

export const CONFIG = {
  brand: "भविष्य दर्शन",
  brandEnglish: "Bhavishya Darshan",
  tagline: "हस्तरेखा में छिपा आपके जीवन का सच्चा मार्गदर्शन",
  subTagline: "प्राचीन वैदिक हस्तरेखा ज्ञान, शुद्ध मार्गदर्शन एवं व्यक्तिगत परामर्श",
  readerName: "कुलदीप ढौंडियाल",
  readerTitle: "हस्तरेखा विशेषज्ञ (Hastarekha Practitioner)",
  experienceYears: 5,
  experienceLabel: "5+ वर्षों का अनुभव",
  
  // WhatsApp Configuration (Kuldeep Dhoundiyal's real number)
  // Format: country code + 10 digits, no '+', spaces or dashes
  whatsappNumber: "919149261672",
  phoneDisplay: "+91 9149261672",
  
  // Locations & Availability
  locations: ["श्रीनगर, उत्तराखण्ड", "ऑनलाइन परामर्श"],
  locationDetails: "श्रीनगर, उत्तराखण्ड",
  availabilityMode: "प्रत्यक्ष (In-person) एवं सम्पूर्ण भारत में ऑनलाइन (WhatsApp Call/Video)",
  
  // Pricing rules (Confirmed facts)
  priceUnder22: 300,
  price22Plus: 500,
  ageThreshold: 22,
  
  // Session durations (Placeholder until reader confirms exact minutes)
  durations: {
    under22: "30 से 45 मिनट गहन विश्लेषण",
    adult: "45 से 60 मिनट सम्पूर्ण जीवन विश्लेषण"
  },

  // Focus areas for consultation
  focusAreas: [
    { id: "career", label: "करियर, शिक्षा एवं धन (Career & Finance)" },
    { id: "marriage", label: "विवाह, प्रेम एवं रिश्ते (Marriage & Relationships)" },
    { id: "health", label: "स्वास्थ्य, ऊर्जा एवं जीवन शक्ति (Health & Energy)" },
    { id: "life", label: "सम्पूर्ण जीवन एवं भाग्य रेखा (Comprehensive Life Reading)" }
  ],

  // Consultation Modes
  modes: [
    { id: "online", label: "ऑनलाइन परामर्श (WhatsApp Video/Call)" },
    { id: "inperson", label: "प्रत्यक्ष भेंट (श्रीनगर, उत्तराखण्ड)" }
  ],

  // Hand Dominance options
  dominantHandOptions: [
    { id: "right", label: "दायाँ हाथ (Right Hand - मुख्य कर्म हाथ)" },
    { id: "left", label: "बायाँ हाथ (Left Hand - मुख्य कर्म हाथ)" }
  ],

  // Social & Direct Contact
  social: {
    instagram: "",
    youtube: "",
    linkedin: "https://www.linkedin.com/in/kuldeep-dhoundiyal-258a48278?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    email: "kuldeepdhoundiyal299@gmail.com"
  },

  // UPI & Payment Details
  upiId: "kuldeepdhoundiyal299@oksbi",
  upiQrImage: "/src/assets/img/kuldeep-upi-qr.jpg",
  paymentNote: "UPI ID: kuldeepdhoundiyal299@oksbi (Google Pay, PhonePe, Paytm, BHIM द्वारा सीधे भुगतान)",

  // Default greetings
  greetings: {
    quickQuestion: "नमस्ते कुलदीप जी, मुझे भविष्य दर्शन हस्तरेखा परामर्श के बारे में जानकारी चाहिए।",
    cardQr: "नमस्ते कुलदीप जी, मैंने भविष्य दर्शन कार्ड/वेबसाइट से QR स्कैन किया है। मैं परामर्श के बारे में जानना चाहता/चाहती हूँ।"
  },

  // Ethics & Disclaimer
  disclaimer: "अस्वीकरण: भविष्य दर्शन पर दी जाने वाली हस्तरेखा सम्बन्धी सलाह पारंपरिक वैदिक ज्ञान व आत्म-चिंतन के उद्देश्य से है। यह किसी भी प्रकार की चिकित्सीय, कानूनी या वित्तीय सलाह का विकल्प नहीं है। हम भय-मुक्त एवं सकारात्मक मार्गदर्शन में विश्वास रखते हैं; किसी भी प्रकार की मृत्यु या गंभीर रोग सम्बन्धी भविष्यवाणी नहीं की जाती।"
};

/**
 * Calculates accurate age from a Date of Birth string (YYYY-MM-DD).
 * Accurately accounts for whether the birth day has passed in the current year.
 * @param {string} dobStr - Date string in format YYYY-MM-DD
 * @param {Date} [today] - Reference date, defaults to current time
 * @returns {number} Age in full years
 */
export function ageFromDob(dobStr, today = new Date()) {
  if (!dobStr) return 0;
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return 0;

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/**
 * Computes price based on age according to business rules:
 * Age < 22 -> 300, Age >= 22 -> 500
 * @param {number} age 
 * @returns {number}
 */
export function priceFor(age) {
  if (typeof age !== 'number' || isNaN(age) || age < 0) {
    return CONFIG.price22Plus;
  }
  return age < CONFIG.ageThreshold ? CONFIG.priceUnder22 : CONFIG.price22Plus;
}

/**
 * Constructs a wa.me URL with clean URI encoding.
 * @param {string} text - Message text in Hindi or English
 * @param {string} [phone] - Optional phone override
 * @returns {string} Fully qualified wa.me URL
 */
export function waLink(text = "", phone = CONFIG.whatsappNumber) {
  const base = `https://wa.me/${phone}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text.trim())}`;
}

/**
 * Generates the structured Hindi booking message for WhatsApp.
 * @param {Object} data - Form data
 * @returns {string} Formatted Hindi message
 */
export function buildBookingMessage(data, lang = 'en') {
  const age = ageFromDob(data.dob);
  const price = priceFor(age);
  const isMinor = age > 0 && age < 18;

  if (lang === 'en') {
    const lines = [
      `🚩 *Bhavishya Darshan — Palmistry Consultation Request*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${data.name || 'Not provided'}`,
      `📅 *Date of Birth:* ${data.dob || 'Not provided'} (Age: ${age > 0 ? age + ' years' : 'Unspecified'})`,
      `🖐️ *Dominant Hand:* ${data.dominantHand || 'Right Hand'}`,
      `🎯 *Focus Area:* ${data.focusArea || 'Comprehensive Life Reading'}`,
      `📍 *Mode:* ${data.mode || 'Online Consultation'}`,
      `⏰ *Preferred Time:* ${data.preferredTime || 'Flexible'}`,
      `💰 *Applicable Fee:* ₹${price}`
    ];

    if (isMinor) {
      lines.push(`⚠️ *Guardian Consent:* Client is under 18 years of age. A parent/guardian will be present with consent.`);
    }

    if (data.note && data.note.trim()) {
      lines.push(`📝 *Additional Note / Questions:* ${data.note.trim()}`);
    }

    lines.push(
      `━━━━━━━━━━━━━━━━━━━━`,
      `Hello Kuldeep Ji, kindly confirm availability and best time to share palm photos.`
    );

    return lines.join('\n');
  }

  const lines = [
    `🚩 *भविष्य दर्शन — हस्तरेखा परामर्श अनुरोध*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *नाम:* ${data.name || 'नहीं दिया'}`,
    `📅 *जन्म तिथि:* ${data.dob || 'नहीं दी'} (आयु: ${age > 0 ? age + ' वर्ष' : 'अस्पष्ट'})`,
    `🖐️ *प्रमुख हाथ:* ${data.dominantHand || 'दायाँ हाथ'}`,
    `🎯 *परामर्श विषय:* ${data.focusArea || 'सम्पूर्ण जीवन'}`,
    `📍 *माध्यम:* ${data.mode || 'ऑनलाइन'}`,
    `⏰ *पसंदीदा समय:* ${data.preferredTime || 'सुविधाजनक समय'}`,
    `💰 *लागू शुल्क:* ₹${price}`
  ];

  if (isMinor) {
    lines.push(`⚠️ *अभिभावक सहमति:* क्लाइंट की आयु 18 वर्ष से कम है, अभिभावक की सहमति एवं उपस्थिति रहेगी।`);
  }

  if (data.note && data.note.trim()) {
    lines.push(`📝 *अतिरिक्त विवरण / प्रश्न:* ${data.note.trim()}`);
  }

  lines.push(
    `━━━━━━━━━━━━━━━━━━━━`,
    `नमस्ते कुलदीप जी, कृपया परामर्श की पुष्टि एवं हथेली के फ़ोटो भेजने का समय बताएँ।`
  );

  return lines.join('\n');
}
