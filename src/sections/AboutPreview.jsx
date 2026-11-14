import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';
import { siteConfig } from '../data/siteConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutPreview() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const intro = t('about.introPreview');
  const words = intro.split(/\s+/);

  useGSAP(() => {
    if (reducedMotion) return;

    const wordElements = gsap.utils.toArray('.about-story__word', sectionRef.current);
    gsap.fromTo(wordElements, { opacity: 0.58, y: 12 }, {
      opacity: 1,
      y: 0,
      stagger: 0.035,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        end: 'center 42%',
        scrub: 0.7,
      },
    });

    gsap.to('[data-about-image]', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

  }, { scope: sectionRef, dependencies: [reducedMotion, intro], revertOnUpdate: true });

  return (
    <section id="about-story" ref={sectionRef} tabIndex={-1} className="about-story" aria-labelledby="about-story-title">
      <Container className="about-story__layout">
        <div className="about-story__portrait-wrap">
          <img data-about-image src={siteConfig.profileImage} alt={t('meta.personImageAlt')} loading="lazy" />
        </div>
        <div className="about-story__copy">
          <p className="scene-kicker">{t('home.aboutPreview')}</p>
          <h2 id="about-story-title" className="about-story__heading">{t('home.storyTitle')}</h2>
          <p className="about-story__intro" aria-label={intro}>
            {words.map((word, index) => <span key={`${word}-${index}`} className="about-story__word">{word}{index < words.length - 1 ? ' ' : ''}</span>)}
          </p>
          <p className="about-story__biography">{t('about.biography')}</p>
          <Link to="/about" className="about-story__link"><Button variant="secondary">{t('common.readMore')}</Button></Link>
        </div>
      </Container>
    </section>
  );
}
