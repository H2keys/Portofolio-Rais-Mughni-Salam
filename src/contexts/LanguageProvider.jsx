import { flushSync } from 'react-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { LanguageContext } from './LanguageContext';

const textAnimationSelector = [
  'main h1',
  'main h2',
  'main h3',
  'main h4',
  'main h5',
  'main h6',
  'main p',
  'main a',
  'main button',
  'main span',
  'main strong',
  'main label',
  'main summary',
  'main blockquote',
  'main figcaption',
  'main dt',
  'main dd',
  'main th',
  'main td',
  'main li',
  'header a',
  'header button',
  'header span',
  '.scroll-navigation__button, .scroll-navigation__button span',
  'footer a',
  'footer p',
  'footer span',
  '#mobile-navigation-dialog a > span:first-child',
  '#mobile-navigation-dialog button',
].join(', ');

const getTextAnimationTargets = () => {
  const candidates = [...document.querySelectorAll(textAnimationSelector)]
    .filter((element) => (
      element.textContent.trim()
      && !element.closest('[aria-hidden="true"], [data-no-lang-anim], .language-switcher')
      && !element.matches('.skills-story__index, .skills-story__rule')
    ));

  return candidates.filter((element) => (
    !candidates.some((candidate) => candidate !== element && element.contains(candidate))
  )).sort((first, second) => {
    const firstBounds = first.getBoundingClientRect();
    const secondBounds = second.getBoundingClientRect();
    return firstBounds.top - secondBounds.top || firstBounds.left - secondBounds.left;
  });
};

const getStaggerStep = (count, maxSpread, maxStep) => (
  count > 1 ? Math.min(maxStep, maxSpread / (count - 1)) : 0
);

const clearAnimationStyles = (elements) => {
  if (elements.length) gsap.set(elements, { clearProps: 'transform,opacity' });
};

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'id';
    return localStorage.getItem('porto-language') || 'id';
  });
  const languageRef = useRef(language);
  const timelineRef = useRef(null);
  const animatedElementsRef = useRef([]);
  const transitionIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('porto-language', language);
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const setLanguageWithAnimation = useCallback((newLanguage) => {
    transitionIdRef.current += 1;
    const transitionId = transitionIdRef.current;
    timelineRef.current?.kill();
    timelineRef.current = null;
    clearAnimationStyles(animatedElementsRef.current);
    animatedElementsRef.current = [];

    if (newLanguage === languageRef.current) return;

    const applyLanguage = () => {
      languageRef.current = newLanguage;
      flushSync(() => setLanguage(newLanguage));
      localStorage.setItem('porto-language', newLanguage);
      document.documentElement.lang = newLanguage;
    };

    if (reducedMotion) {
      applyLanguage();
      return;
    }

    const outgoingElements = getTextAnimationTargets();
    if (!outgoingElements.length) {
      applyLanguage();
      return;
    }
    animatedElementsRef.current = outgoingElements;

    const outgoingTimeline = gsap.timeline({
      onComplete: async () => {
        if (transitionId !== transitionIdRef.current) return;

        applyLanguage();
        await i18n.changeLanguage(newLanguage);
        if (transitionId !== transitionIdRef.current) return;

        await new Promise((resolve) => window.requestAnimationFrame(resolve));
        if (transitionId !== transitionIdRef.current) return;

        const incomingElements = getTextAnimationTargets();
        animatedElementsRef.current = incomingElements;
        if (!incomingElements.length) {
          return;
        }

        const incomingTimeline = gsap.timeline({
          onComplete: () => {
            clearAnimationStyles(incomingElements);
            if (timelineRef.current === incomingTimeline) timelineRef.current = null;
            animatedElementsRef.current = [];
          },
        });
        timelineRef.current = incomingTimeline;
        const incomingStagger = getStaggerStep(incomingElements.length, 0.7, 0.035);
        incomingTimeline.fromTo(incomingElements, {
          y: 12,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.24,
          stagger: incomingStagger,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      },
    });
    timelineRef.current = outgoingTimeline;
    const outgoingStagger = getStaggerStep(outgoingElements.length, 0.24, 0.015);
    outgoingTimeline.to(outgoingElements, {
      y: -8,
      opacity: 0,
      duration: 0.16,
      stagger: outgoingStagger,
      ease: 'power1.in',
    });
  }, [i18n, reducedMotion]);

  useEffect(() => () => {
    transitionIdRef.current += 1;
    timelineRef.current?.kill();
    clearAnimationStyles(animatedElementsRef.current);
    timelineRef.current = null;
    animatedElementsRef.current = [];
  }, []);

  const value = useMemo(() => ({
    language,
    setLanguage: setLanguageWithAnimation,
  }), [language, setLanguageWithAnimation]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
