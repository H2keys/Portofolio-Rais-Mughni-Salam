import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || typeof ResizeObserver === 'undefined') return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    const tick = (time) => lenis.raf(time * 1000);
    const handleScrollLock = (event) => {
      if (event.detail?.locked) lenis.stop();
      else lenis.start();
    };
    const handleScrollToTop = (event) => {
      event.preventDefault();
      lenis.scrollTo(0, { immediate: true, force: true });
    };
    const handleScrollTo = (event) => {
      const target = document.getElementById(event.detail?.targetId);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, {
        duration: event.detail?.duration ?? 1.05,
        lerp: 0,
        easing: (progress) => (
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2
        ),
        onComplete: event.detail?.onComplete,
      });
    };

    lenis.on('scroll', ScrollTrigger.update);
    if (document.body.style.overflow === 'hidden') lenis.stop();
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('porto:scroll-lock', handleScrollLock);
    document.addEventListener('porto:scroll-to-top', handleScrollToTop);
    document.addEventListener('porto:scroll-to', handleScrollTo);

    return () => {
      document.removeEventListener('porto:scroll-lock', handleScrollLock);
      document.removeEventListener('porto:scroll-to-top', handleScrollToTop);
      document.removeEventListener('porto:scroll-to', handleScrollTo);
      gsap.ticker.remove(tick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const routeLink = document.querySelector('html');
    if (routeLink) {
      routeLink.style.scrollBehavior = 'auto';
    }
  }, [location.pathname, reducedMotion]);

  return null;
}
