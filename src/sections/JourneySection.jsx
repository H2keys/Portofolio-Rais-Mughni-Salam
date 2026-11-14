import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/common/Container';
import { education } from '../data/education';
import { experience } from '../data/experience';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getLocalizedProjectText } from '../utils/projectContent';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function JourneySection() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (reducedMotion) return;

    gsap.fromTo('[data-journey-entry]', { opacity: 0.35, y: 18 }, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 76%',
        end: 'center 42%',
        scrub: 0.7,
      },
    });
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true });

  const renderTimeline = (title, items, key) => (
    <div className="journey-story__column">
      <h3>{title}</h3>
      <ol>
        {items.map((item) => (
          <li key={`${key}-${item.id ?? getLocalizedProjectText(item.title, language)}`} data-journey-entry>
            {item.period && <span className="journey-story__period">{getLocalizedProjectText(item.period, language)}</span>}
            <strong>{getLocalizedProjectText(item.title, language)}</strong>
            {((key === 'education' && item.institution !== item.title) || key === 'experience') && (
              <span>{getLocalizedProjectText(key === 'education' ? item.institution : item.company, language)}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <section id="journey-story" ref={sectionRef} tabIndex={-1} className="journey-story" aria-labelledby="journey-story-title">
      <Container>
        <div className="journey-story__heading">
          <p className="scene-kicker">{t('home.journey')}</p>
          <h2 id="journey-story-title">{t('home.journeyTitle')}</h2>
        </div>
        <div className="journey-story__timelines">
          {renderTimeline(t('about.education'), education, 'education')}
          {renderTimeline(t('about.experience'), experience, 'experience')}
        </div>
      </Container>
    </section>
  );
}