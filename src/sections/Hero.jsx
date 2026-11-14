import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ScrollNavigation } from '../components/common/ScrollNavigation';
import { siteConfig } from '../data/siteConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

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
        <img src={siteConfig.profileImage} alt="Foto Rais Mughni Salam" fetchpriority="high" />
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
              <a href="#about-story" className="inline-flex items-center justify-center rounded-full bg-[#f3e9d8] px-5 py-3 text-sm font-medium text-[#141414] transition hover:bg-[#e8dcc2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a15b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]">
                {t('home.primaryCta')}<ArrowRight className="ml-2" size={16} />
              </a>
              <Link to="/about"><Button variant="secondary">{t('home.secondaryCta')}</Button></Link>
            </div>
          </div>
          <a className="cinema-hero__scroll" href="#about-story" aria-label={t('home.scrollIndicator')}>
            <span>{t('home.scrollIndicator')}</span>
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <ScrollNavigation targetId="about-story" labelKey="home.continueAbout" />
    </section>
  );
}
