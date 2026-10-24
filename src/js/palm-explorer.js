/**
 * Bhavishya Darshan — Signature Palm Explorer Module (Bilingual: EN / HI)
 * Scroll-scrubbed pinned sequence and interactive exploration.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { I18N } from './i18n.js';
import { getLang } from './lang-controller.js';

gsap.registerPlugin(ScrollTrigger);

export const LINE_CONFIG = [
  { id: "jeevan", pathSelector: "#path-line-jeevan", strokeLength: 380 },
  { id: "mastishk", pathSelector: "#path-line-mastishk", strokeLength: 320 },
  { id: "hridaya", pathSelector: "#path-line-hridaya", strokeLength: 350 },
  { id: "bhagya", pathSelector: "#path-line-bhagya", strokeLength: 360 },
  { id: "surya", pathSelector: "#path-line-surya", strokeLength: 260 }
];

export const MOUNT_KEYS = ["guru", "shani", "surya", "budh", "shukra", "chandra"];

let currentActiveLineId = 'jeevan';

export function initPalmExplorer() {
  const explorerSection = document.getElementById('palm-explorer');
  const tabsContainer = document.getElementById('explorer-tabs');
  const titleEl = document.getElementById('explorer-line-title');
  const sanskritEl = document.getElementById('explorer-line-sanskrit');
  const meaningEl = document.getElementById('explorer-line-meaning');
  const significanceEl = document.getElementById('explorer-line-significance');
  const noteBoxEl = document.getElementById('explorer-ethical-note');
  const noteTextEl = document.getElementById('explorer-note-text');

  if (!explorerSection || !tabsContainer) return;

  function renderTabs() {
    const lang = getLang();
    const dict = I18N[lang];
    tabsContainer.innerHTML = '';

    LINE_CONFIG.forEach((line) => {
      const lineData = dict.lines[line.id];
      const btn = document.createElement('button');
      btn.className = `explorer-tab-btn ${line.id === currentActiveLineId ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', line.id === currentActiveLineId ? 'true' : 'false');
      btn.setAttribute('data-line-id', line.id);
      btn.innerHTML = lineData ? lineData.name : line.id;
      btn.addEventListener('click', () => {
        setActiveLine(line.id, true);
      });
      tabsContainer.appendChild(btn);
    });
  }

  function setActiveLine(lineId, animate = true) {
    currentActiveLineId = lineId;
    const lang = getLang();
    const dict = I18N[lang];
    const lineData = dict.lines[lineId] || dict.lines.jeevan;
    const lineCfg = LINE_CONFIG.find(l => l.id === lineId) || LINE_CONFIG[0];

    // Update Tab Buttons
    const tabBtns = tabsContainer.querySelectorAll('.explorer-tab-btn');
    tabBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-line-id') === lineId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update SVG Lines
    document.querySelectorAll('.palm-reading-line').forEach(svgLine => {
      svgLine.classList.remove('active');
    });

    const activeSvgPath = document.querySelector(lineCfg.pathSelector);
    if (activeSvgPath) {
      activeSvgPath.classList.add('active');
      
      if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const totalLength = activeSvgPath.getTotalLength() || lineCfg.strokeLength;
        gsap.fromTo(activeSvgPath, 
          { strokeDasharray: totalLength, strokeDashoffset: totalLength },
          { strokeDashoffset: 0, duration: 0.85, ease: "power2.out" }
        );
      }
    }

    // Update Details Card Content
    if (titleEl) titleEl.textContent = lineData.name;
    if (sanskritEl) sanskritEl.textContent = lineData.sanskrit;
    if (meaningEl) meaningEl.textContent = lineData.meaning;
    if (significanceEl) significanceEl.textContent = lineData.significance;
    if (noteTextEl) noteTextEl.textContent = lineData.ethicalNote;
  }

  // Interactive Click on SVG Lines
  LINE_CONFIG.forEach(line => {
    const pathEl = document.querySelector(line.pathSelector);
    if (pathEl) {
      pathEl.addEventListener('click', () => setActiveLine(line.id, true));
      pathEl.addEventListener('mouseenter', () => {
        pathEl.style.filter = "drop-shadow(0 0 10px rgba(232, 155, 37, 0.95))";
      });
      pathEl.addEventListener('mouseleave', () => {
        if (!pathEl.classList.contains('active')) {
          pathEl.style.filter = "";
        }
      });
    }
  });

  // Mounts click handling
  MOUNT_KEYS.forEach(mountKey => {
    const mountEl = document.getElementById(`mount-${mountKey}`);
    if (mountEl) {
      mountEl.addEventListener('click', () => {
        const lang = getLang();
        const dict = I18N[lang];
        const mountData = dict.mounts[mountKey];

        if (titleEl) titleEl.textContent = mountData.name;
        if (sanskritEl) sanskritEl.textContent = lang === 'en' ? "Palmistry Planetary Mount" : "हस्त पर्वत (Vedic Palmistry Mount)";
        if (meaningEl) meaningEl.textContent = mountData.desc;
        if (significanceEl) significanceEl.textContent = lang === 'en' 
          ? "The elevation and tone of this mount reflects strength in this life domain."
          : "पर्वत का उभार एवं स्पष्टता जीवन के इस विशेष क्षेत्र में ऊर्जा और सामर्थ्य को प्रकट करता है।";
        if (noteTextEl) noteTextEl.textContent = lang === 'en'
          ? "Mounts and primary lines together formulate a balanced understanding of natural temperament."
          : "पर्वतों का सन्तुलन हथेली के रेखाओं के साथ मिलकर व्यक्ति के सम्पूर्ण स्वभाव को स्पष्ट करता है।";

        document.querySelectorAll('.palm-reading-line').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.palm-mount-circle').forEach(m => m.classList.remove('active'));
        mountEl.classList.add('active');
      });
    }
  });

  // Listen for language changes and refresh tabs & details
  window.addEventListener('languageChanged', () => {
    renderTabs();
    setActiveLine(currentActiveLineId, false);
  });

  // Initial render
  renderTabs();
  setActiveLine('jeevan', false);

  // Setup Pinned ScrollTrigger on desktop
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lineIds = LINE_CONFIG.map(l => l.id);
    
    ScrollTrigger.create({
      trigger: "#palm-explorer",
      start: "top top+=70",
      end: "+=2200",
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const lineIndex = Math.min(
          lineIds.length - 1,
          Math.floor(progress * lineIds.length)
        );
        const targetLineId = lineIds[lineIndex];
        if (targetLineId !== currentActiveLineId) {
          setActiveLine(targetLineId, false);
        }
      }
    });
  });
}
