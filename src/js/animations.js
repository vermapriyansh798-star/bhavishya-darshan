/**
 * Bhavishya Darshan — Motion & Micro-interactions System
 * Applied with ui-ux-pro-max and impeccable motion principles.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Preloader Logic
  initPreloader(isReducedMotion);

  // 2. Gold Dust Canvas Particles
  if (!isReducedMotion) {
    initGoldDustCanvas();
  }

  // 3. Scroll Progress Bar
  initScrollProgressBar();

  // 4. Header Scroll State
  initHeaderScroll();

  // 5. FAQ Accordion Interaction
  initFaqAccordion();

  // 6. How It Works Step Line Progress
  initHowItWorksLine(isReducedMotion);

  // 7. Custom Cursor & Magnetic Buttons (Desktop Only)
  if (!isReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    initCustomCursor();
    initMagneticButtons();
  }

  // 8. Mobile Navigation Toggle
  initMobileNav();

  // 9. Mobile Sticky Booking Action Bar
  initMobileStickyBar();

  // 10. Clean Hero Palm Reading Live Showcase
  initHeroPalmShowcase(isReducedMotion);
}

/**
 * Preloader: Lotus/Om stroke draw, curtain wipe up, skipped on repeat session visits.
 */
function initPreloader(isReducedMotion) {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  if (isReducedMotion || sessionStorage.getItem('bd_preloader_seen')) {
    preloader.style.display = 'none';
    return;
  }

  // Run entrance and wipe curtain
  setTimeout(() => {
    preloader.classList.add('loaded');
    sessionStorage.setItem('bd_preloader_seen', 'true');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 700);
  }, 1100);
}

/**
 * Gold Dust Canvas: Ambient gold particles floating gently in Hero
 * Performance optimized: capped count, paused when off-screen.
 */
function initGoldDustCanvas() {
  const canvas = document.getElementById('gold-dust-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isRunning = true;

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 18 : 50;
  const particles = [];

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.5 - 0.2; // float gently upward
      this.opacity = Math.random() * 0.6 + 0.2;
      this.fadeSpeed = Math.random() * 0.008 + 0.003;
      this.fadeDirection = 1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulse opacity
      this.opacity += this.fadeSpeed * this.fadeDirection;
      if (this.opacity >= 0.8) this.fadeDirection = -1;
      if (this.opacity <= 0.15) this.fadeDirection = 1;

      // Wrap boundaries
      if (this.y < 0) this.y = canvas.height;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 155, 37, ${this.opacity * 0.75})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(178, 138, 69, 0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    animationFrameId = requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Pause when hero is not visible to save CPU/battery
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          animateParticles();
        }
      } else {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    });
  }, { threshold: 0.1 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);

  // Pause on tab visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else if (heroSection && observer) {
      isRunning = true;
      animateParticles();
    }
  });
}

/**
 * Top gold scroll progress bar
 */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/**
 * Navigation Header blur on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * FAQ Accordion with smooth height transitions and rotating icon
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other accordion items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
      }
    });
  });
}

/**
 * How it works connector line drawing on scroll
 */
function initHowItWorksLine(isReducedMotion) {
  if (isReducedMotion) return;

  const progressLine = document.querySelector('.steps-connector-progress');
  const section = document.getElementById('how-it-works');

  if (!progressLine || !section) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top 70%",
    end: "bottom 60%",
    scrub: 0.5,
    onUpdate: (self) => {
      progressLine.style.width = `${self.progress * 100}%`;
    }
  });
}

/**
 * Custom gold cursor and smooth trailing follower for desktop
 */
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';

  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover states on links and buttons
  const interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .palm-reading-line');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/**
 * Magnetic button hover effect for primary CTAs
 */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-ghost, .btn-whatsapp');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/**
 * Mobile Navigation Menu Toggle with Body Scroll Lock and ARIA support
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceState) {
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
    toggleBtn.innerHTML = shouldOpen ? '✕' : '☰';
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close mobile nav when clicking any link
  navMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu(false);
      }
    });
  });

  // Close when pressing Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Close when resizing window to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  }, { passive: true });
}

/**
 * Mobile Sticky Action Bar Visibility Controller
 * Slides up gracefully on smartphones once user scrolls past hero threshold.
 */
function initMobileStickyBar() {
  const bar = document.getElementById('mobile-sticky-bar');
  if (!bar) return;

  function updateBar() {
    if (window.innerWidth <= 768) {
      if (window.scrollY > 280) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    } else {
      bar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('resize', updateBar, { passive: true });
  updateBar();
}

/**
 * Clean Hero Palm Reading Live Showcase
 * Gently pulses and traces each palm line with live name display.
 */
function initHeroPalmShowcase(isReducedMotion) {
  if (isReducedMotion) return;

  const heroLines = [
    { id: '#hero-line-jeevan', nameEn: 'Jeevan Rekha (Life Line — Vitality)', nameHi: 'जीवन रेखा (ऊर्जा व सन्तुलन)' },
    { id: '#hero-line-mastishk', nameEn: 'Mastishk Rekha (Head Line — Intellect)', nameHi: 'मस्तिष्क रेखा (बुद्धि व एकाग्रता)' },
    { id: '#hero-line-hridaya', nameEn: 'Hridaya Rekha (Heart Line — Emotion)', nameHi: 'हृदय रेखा (भावना व सौहार्द)' },
    { id: '#hero-line-bhagya', nameEn: 'Bhagya Rekha (Fate Line — Career)', nameHi: 'भाग्य रेखा (कार्यक्षेत्र व दिशा)' }
  ];

  const tagText = document.getElementById('hero-live-line-text');
  let currentIndex = 0;
  let timer = null;

  function highlightLine(index) {
    heroLines.forEach((l, i) => {
      const el = document.querySelector(l.id);
      if (el) {
        if (i === index) {
          el.style.stroke = 'var(--saffron)';
          el.style.strokeWidth = '4.5';
          el.style.filter = 'drop-shadow(0 0 8px rgba(232, 155, 37, 0.9))';
        } else {
          el.style.stroke = 'rgba(112, 45, 60, 0.35)';
          el.style.strokeWidth = '2.5';
          el.style.filter = 'none';
        }
      }
    });

    if (tagText) {
      const isHindi = document.documentElement.lang === 'hi';
      tagText.textContent = isHindi ? heroLines[index].nameHi : heroLines[index].nameEn;
    }
  }

  function startCycle() {
    highlightLine(0);
    timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % heroLines.length;
      highlightLine(currentIndex);
    }, 3200);
  }

  const container = document.querySelector('.hero-palm-container');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', () => startCycle());
  }

  startCycle();
}
