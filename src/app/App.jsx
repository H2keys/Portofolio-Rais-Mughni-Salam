import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { LanguageProvider } from '../contexts/LanguageProvider';
import { Router } from './router';
import { SplashScreen } from '../components/common/SplashScreen';
import { CustomCursor } from '../components/common/CustomCursor';
import { PageLayout } from '../components/layout/PageLayout';
import { siteConfig } from '../data/siteConfig';

function AppShell() {
  const reducedMotion = useReducedMotion();
  useLenis();
  useScrollToTop();
  usePageMetadata();

  return (
    <>
      {siteConfig.splashScreen && <SplashScreen />}
      {!reducedMotion && siteConfig.customCursor && <CustomCursor />}
      <PageLayout>
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="min-h-screen bg-[#090909]" /> }>
            <Router />
          </Suspense>
        </AnimatePresence>
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
