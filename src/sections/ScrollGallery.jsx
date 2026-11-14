import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { projects } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollGallery() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const images = projects.flatMap((project) => (project.images ?? []).map((image) => ({ project, image })))
    .filter((item, index, all) => all.findIndex((candidate) => candidate.image === item.image) === index)
    .slice(0, 4);

  useGSAP(() => {
    if (reducedMotion) return;

    gsap.utils.toArray('[data-gallery-image]', sectionRef.current).forEach((frame) => {
      const image = frame.querySelector('img');
      gsap.fromTo(frame, { clipPath: 'inset(8% 12% 8% 12%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top 88%',
          end: 'center 48%',
          scrub: 0.8,
        },
      });
      gsap.fromTo(image, { scale: 1.12, yPercent: 4 }, {
        scale: 1,
        yPercent: -2,
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    });
  }, { scope: sectionRef, dependencies: [reducedMotion, images.length], revertOnUpdate: true });

  if (!images.length) return null;

  return (
    <section id="project-gallery" ref={sectionRef} tabIndex={-1} className="project-gallery" aria-labelledby="project-gallery-title">
      <Container>
        <div className="project-gallery__heading">
          <div>
            <p className="scene-kicker">{t('home.galleryLabel')}</p>
            <h2 id="project-gallery-title">{t('home.galleryTitle')}</h2>
          </div>
          <p>{t('home.galleryIntro')}</p>
        </div>
        <div className="project-gallery__grid">
          {images.map(({ project, image }, index) => (
            <Link
              key={`${project.slug}-${image}`}
              to={`/projects/${project.slug}`}
              className={`project-gallery__item project-gallery__item--${index + 1}`}
              aria-label={`${t('common.viewProject')}: ${project.title}`}
              data-cursor={t('common.viewProject')}
            >
              <span className="project-gallery__frame" data-gallery-image>
                <img src={image} alt={`${project.title} - ${t('projects.gallery')}`} loading="lazy" />
                <span className="project-gallery__overlay" aria-hidden="true"><ArrowUpRight size={20} /></span>
              </span>
              <span className="project-gallery__caption"><span>{project.title}</span><span>{project.category}</span></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
