import { BrowserRouter, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { LanguageProvider } from '../contexts/LanguageProvider';
import { Router } from './router';
import { SplashScreen } from '../components/common/SplashScreen';
import { CustomCursor } from '../components/common/CustomCursor';
import { ScrollNavigation } from '../components/common/ScrollNavigation';
import { PageLayout } from '../components/layout/PageLayout';
import { siteConfig } from '../data/siteConfig';

const homeNavigationSteps = [
  { sectionId: 'hero-scene', targetId: 'about-story', labelKey: 'home.continueAbout' },
  { sectionId: 'about-story', targetId: 'journey-story', labelKey: 'home.continueJourney' },
  { sectionId: 'journey-story', targetId: 'skills-story', labelKey: 'home.continueSkills' },
  { sectionId: 'skills-story', targetId: 'project-story', labelKey: 'home.continueProjects' },
  { sectionId: 'project-story', targetId: 'certificate-story', labelKey: 'home.continueCertificates' },
  { sectionId: 'certificate-story', targetId: 'contact-scene', labelKey: 'home.continueContact' },
  { sectionId: 'contact-scene', targetId: 'hero-scene', labelKey: 'home.replayJourney', replay: true },
];

function getRouteNavigation(pathname) {
  if (pathname === '/about') return { to: '/projects', labelKey: 'home.continueProjects' };
  if (pathname === '/projects') return { to: '/contact', labelKey: 'common.contactMe' };
  if (pathname.startsWith('/projects/')) return { to: '/projects', labelKey: 'common.backProjects' };
  return { to: '/', labelKey: 'common.backHome' };
}

const power2InOut = (progress) => (
  progress < 0.5
    ? 2 * progress * progress
    : 1 - ((-2 * progress + 2) ** 2) / 2
);
const power3Out = (progress) => 1 - ((1 - progress) ** 3);

function RouteMountEffects() {
  useScrollToTop();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}

function AppShell() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [homeNavigation, setHomeNavigation] = useState(homeNavigationSteps[0]);
  useLenis();
  usePageMetadata();

  useEffect(() => {
    if (location.pathname !== '/') return undefined;

    const updateNavigation = () => {
      const marker = window.innerHeight * 0.45;
      const sections = homeNavigationSteps.map((step) => ({
        step,
        element: document.getElementById(step.sectionId),
      })).filter(({ element }) => element);
      const hasLayout = sections.some(({ element }) => (
        element.getBoundingClientRect().height > 0
      ));
      const currentSection = hasLayout
        ? sections.reduce((active, { step, element }) => (
          element.getBoundingClientRect().top <= marker ? step : active
        ), homeNavigationSteps[0])
        : homeNavigationSteps[0];
      setHomeNavigation(currentSection);
    };

    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);

    return () => {
      window.removeEventListener('scroll', updateNavigation);
      window.removeEventListener('resize', updateNavigation);
    };
  }, [location.pathname]);

  const navigation = location.pathname === '/'
    ? homeNavigation
    : getRouteNavigation(location.pathname);

  return (
    <>
      {siteConfig.splashScreen && <SplashScreen />}
      {!reducedMotion && siteConfig.customCursor && <CustomCursor />}
      <PageLayout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: reducedMotion ? 0 : 0.6,
                ease: power3Out,
              },
            }}
            exit={{
              opacity: 0,
              y: reducedMotion ? 0 : -24,
              transition: {
                duration: reducedMotion ? 0 : 0.4,
                ease: power2InOut,
              },
            }}
          >
            <RouteMountEffects />
            <Suspense fallback={<div className="min-h-screen bg-[#090909]" />}>
              <Router location={location} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
        <ScrollNavigation alwaysVisible {...navigation} />
      </PageLayout>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </BrowserRouter>
  );
}
