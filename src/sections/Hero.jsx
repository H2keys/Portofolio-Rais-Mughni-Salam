import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { siteConfig } from '../data/siteConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [portfolioReady, setPortfolioReady] = useState(
    () => document.documentElement.classList.contains('portfolio-ready'),
  );

  useEffect(() => {
    const root = document.documentElement;
    const updateReadiness = () => {
      if (root.classList.contains('portfolio-ready')) setPortfolioReady(true);
    };
    const observer = new MutationObserver(updateReadiness);

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    updateReadiness();

    return () => observer.disconnect();
  }, []);

  const scrollToAbout = () => {
    const event = new CustomEvent('porto:scroll-to', {
      cancelable: true,
      detail: { targetId: 'about-story' },
    });
    const handledByLenis = !document.dispatchEvent(event);

    if (!handledByLenis) {
      document.getElementById('about-story')?.scrollIntoView?.({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const actionVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const actionTransition = (index) => ({
    duration: reducedMotion ? 0 : 0.32,
    delay: reducedMotion ? 0 : 0.15 * (index + 1),
    ease: [0.22, 1, 0.36, 1],
  });

  useGSAP(() => {
    if (reducedMotion) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    timeline
      .to('[data-hero-title]', { yPercent: -18, scale: 0.84, transformOrigin: 'left top', ease: 'none' }, 0)
      .to('[data-hero-image], [data-hero-subject]', { yPercent: 14, scale: 0.94, ease: 'none' }, 0)
      .to('[data-hero-note]', { y: -36, opacity: 0.15, ease: 'none' }, 0);
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <section id="hero-scene" ref={sectionRef} tabIndex={-1} className="cinema-hero relative isolate overflow-hidden" aria-labelledby="hero-title">
      <div className="cinema-hero__texture" aria-hidden="true" />
      <div className="cinema-hero__image-wrap" data-hero-image>
        <img src={siteConfig.profileImage} alt={t('meta.personImageAlt')} fetchpriority="high" />
      </div>
      <div className="cinema-hero__subject" data-hero-subject aria-hidden="true">
        <img src="/profile/rais-subject.webp" alt="" fetchpriority="high" />
      </div>
      <div className="cinema-hero__content">
        <h1 id="hero-title" className="cinema-hero__title" data-hero-title>
          <span>{siteConfig.displayName}</span>
          <span className="cinema-hero__role">{t('home.role')}</span>
        </h1>
        <div className="cinema-hero__bottom" data-hero-note>
          <div>
            <p className="cinema-hero__headline">{t('home.headline')}</p>
            <p className="cinema-hero__subtitle">{t('home.subtitle')}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <motion.div
                initial={reducedMotion ? false : 'hidden'}
                animate={reducedMotion || portfolioReady ? 'visible' : 'hidden'}
                variants={actionVariants}
                transition={actionTransition(0)}
              >
                <button type="button" onClick={scrollToAbout} aria-label={t('home.primaryCta')} className="inline-flex items-center justify-center rounded-full bg-[#f3e9d8] px-5 py-3 text-sm font-medium text-[#141414] transition hover:bg-[#e8dcc2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a15b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]">
                  {t('home.primaryCta')}<ArrowRight className="ml-2" size={16} />
                </button>
              </motion.div>
              <motion.div
                initial={reducedMotion ? false : 'hidden'}
                animate={reducedMotion || portfolioReady ? 'visible' : 'hidden'}
                variants={actionVariants}
                transition={actionTransition(1)}
              >
                <Link to="/about"><Button variant="secondary">{t('home.secondaryCta')}</Button></Link>
              </motion.div>
            </div>
          </div>
          <button type="button" className="cinema-hero__scroll" onClick={scrollToAbout} aria-label={t('home.scrollIndicator')}>
            <span>{t('home.scrollIndicator')}</span>
            <ArrowDown size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
