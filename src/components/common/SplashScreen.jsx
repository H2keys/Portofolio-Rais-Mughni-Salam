import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../../data/siteConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function waitForImage(src) {
  if (!src || typeof Image === 'undefined') return Promise.resolve();

  return new Promise((resolve) => {
    const image = new Image();
    const finish = () => resolve();
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', finish, { once: true });
    image.src = src;
    if (image.complete) finish();
  });
}

export function SplashScreen() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    let active = true;
    let minimumTimer;
    let safetyTimer;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('porto:scroll-lock', { detail: { locked: true } }));
    const finish = () => {
      if (!active) return;
      document.documentElement.classList.add('portfolio-ready');
      document.body.style.overflow = previousOverflow;
      document.dispatchEvent(new CustomEvent('porto:scroll-lock', { detail: { locked: false } }));
      setVisible(false);
    };
    const minimumDelay = new Promise((resolve) => {
      minimumTimer = setTimeout(resolve, reducedMotion ? 80 : 320);
    });
    const safetyDelay = new Promise((resolve) => {
      safetyTimer = setTimeout(resolve, 1800);
    });

    Promise.race([
      Promise.all([waitForImage(siteConfig.profileImage), minimumDelay]),
      safetyDelay,
    ]).then(finish);

    return () => {
      active = false;
      clearTimeout(minimumTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = previousOverflow;
      document.dispatchEvent(new CustomEvent('porto:scroll-lock', { detail: { locked: false } }));
    };
  }, [visible, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.42 } }}
          role="status"
          aria-live="polite"
          aria-label={t('common.loading')}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#090909]"
        >
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.48, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d6a15b]/40 bg-[#d6a15b]/10 text-lg font-semibold tracking-[0.3em] text-[#f8f5ef]">
              {siteConfig.displayName.split(' ').map((part) => part[0]).join('')}
            </div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#d8d4cc]">{siteConfig.brandName}</p>
            <span className="loading-screen__bar" aria-hidden="true">
              <motion.span
                animate={reducedMotion ? { x: 0 } : { x: ['-110%', '210%'] }}
                transition={reducedMotion ? { duration: 0 } : { duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
