import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/common/Container';
import { interests, skills } from '../data/skills';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getLocalizedProjectText } from '../utils/projectContent';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SkillsSection() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (reducedMotion) return;

    gsap.fromTo('[data-skill-line]', { opacity: 0.32, x: 36 }, {
      opacity: 1,
      x: 0,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'center 42%',
        scrub: 0.8,
      },
    });
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true });

  const items = skills.length ? skills : interests;
  if (!items.length) return null;

  return (
    <section id="skills-story" ref={sectionRef} tabIndex={-1} className="skills-story" aria-labelledby="skills-story-title">
      <Container>
        <div className="skills-story__header">
          <p className="scene-kicker">{t('home.skills')}</p>
          <h2 id="skills-story-title">{t('home.skillsTitle')}</h2>
          <p>{t('home.skillsIntro')}</p>
        </div>
        <ul className="skills-story__list">
          {items.map((skill, index) => (
            <li key={getLocalizedProjectText(skill, language)} data-skill-line>
              <span className="skills-story__index">0{index + 1}</span>
              <span>{getLocalizedProjectText(skill, language)}</span>
              <span className="skills-story__rule" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
