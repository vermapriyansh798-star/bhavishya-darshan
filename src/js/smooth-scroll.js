/**
 * Smooth Scroll Engine using Lenis & GSAP ScrollTrigger Integration
 * Adheres to 60fps performance and WCAG prefers-reduced-motion guidelines.
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
    return null;
  }

  // Initialize Lenis
  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false, // native momentum touch on mobile for best response
    touchMultiplier: 1.8
  });

  // Sync Lenis scroll with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // GSAP Ticker drives Lenis animation frame
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Expose scroll to anchor helper
  window.lenisScrollTo = (target, offset = -70) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset, duration: 1.2 });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
