import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/common/Container';
import { ProjectPreview } from '../components/projects/ProjectPreview';
import { ScrollNavigation } from '../components/common/ScrollNavigation';
import { projects } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getLocalizedProjectText } from '../utils/projectContent';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FeaturedProjects() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const featuredProjects = projects.filter((project) => project.featured);

  useGSAP(() => {
    if (reducedMotion || featuredProjects.length < 2) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 900px)', () => {
      const getTravel = () => Math.max(0, trackRef.current.scrollWidth - stageRef.current.clientWidth);
      if (!getTravel()) return;

      gsap.to(trackRef.current, {
        x: () => -getTravel(),
        ease: 'none',
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top+=72',
          end: () => `+=${getTravel()}`,
          pin: stageRef.current,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => media.revert();
  }, { scope: sectionRef, dependencies: [featuredProjects.length, reducedMotion], revertOnUpdate: true });

  if (!featuredProjects.length) return null;

  return (
    <section id="project-story" ref={sectionRef} tabIndex={-1} className="project-story" aria-labelledby="project-story-title">
      <Container className="project-story__heading">
        <p className="scene-kicker">{t('home.featured')}</p>
        <h2 id="project-story-title">{t('home.projectTitle')}</h2>
        <p>{t('home.projectIntro')}</p>
      </Container>
      <div ref={stageRef} className={`project-story__stage${reducedMotion ? ' project-story__stage--static' : ''}`} aria-label={t('home.projectShowcase')}>
        <div ref={trackRef} className="project-story__track">
          {featuredProjects.map((project, index) => {
            const title = getLocalizedProjectText(project.title, language);
            const category = getLocalizedProjectText(project.category, language);
            const year = getLocalizedProjectText(project.year, language);
            const summary = getLocalizedProjectText(project.summary, language);

            return (
              <article key={project.slug} className={`project-story__panel${index % 2 ? ' project-story__panel--reverse' : ''}`}>
                <Link to={`/projects/${project.slug}`} className="project-story__image project-card" data-cursor={t('common.viewProject')} aria-label={`${t('common.viewProject')}: ${title}`}>
                  <ProjectPreview project={project} />
                  <span className="project-story__number">0{index + 1} <span>/ 0{featuredProjects.length}</span></span>
                  <span className="project-story__image-link" aria-hidden="true"><ArrowUpRight size={20} /></span>
                </Link>
                <div className="project-story__copy">
                  <div className="project-story__meta"><span>{category}</span>{year && <span>{year}</span>}</div>
                  <h3>{title}</h3>
                  <p>{summary}</p>
                  {project.liveUrl && <a className="project-story__detail-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">{t('projects.liveDemo')} <ArrowUpRight size={16} aria-hidden="true" /></a>}
                  <Link to={`/projects/${project.slug}`} className="project-story__detail-link" aria-label={`${t('common.viewProject')}: ${title}`}>
                    {t('projects.details')} <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <Container className="project-story__footer">
        <span>{t('home.projectScrollHint')}</span>
        <Link to="/projects">{t('home.allProjects')} <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </Container>
      <ScrollNavigation targetId="certificate-story" labelKey="home.continueCertificates" />
    </section>
  );
}
