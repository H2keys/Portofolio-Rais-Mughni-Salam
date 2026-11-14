import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/common/PageTransition';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { PageHeader } from '../components/layout/PageHeader';
import { CertificateLightbox } from '../components/projects/CertificateLightbox';
import { projects } from '../data/projects';
import { getLocalizedProjectText } from '../utils/projectContent';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const project = projects.find((entry) => entry.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!project) {
    return (
      <PageTransition>
        <PageHeader
          backTo="/projects"
          backLabelKey="common.backProjects"
          eyebrow="404"
          title={t('projects.projectNotFound')}
        />
        <section className="py-20">
          <Container className="rounded-[30px] border border-white/10 bg-[#0f0f0f] p-10 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[#d6a15b]">404</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[#f7f5f1]">{t('projects.projectNotFound')}</h1>
            <div className="mt-6 inline-flex">
              <Button as="link" to="/projects" variant="secondary">{t('common.backProjects')}</Button>
            </div>
          </Container>
        </section>
      </PageTransition>
    );
  }

  const title = getLocalizedProjectText(project.title, language);
  const category = getLocalizedProjectText(project.category, language);
  const year = getLocalizedProjectText(project.year, language);
  const role = getLocalizedProjectText(project.role, language);
  const summary = getLocalizedProjectText(project.summary, language);
  const description = getLocalizedProjectText(project.description, language);

  const imageSrc = typeof project.image === 'string' ? project.image : project.image.src;
  const imageSrcSet = typeof project.image === 'object' ? project.image.srcSet : undefined;
  const imageWidth = typeof project.image === 'object' ? project.image.width : 1600;
  const imageHeight = typeof project.image === 'object' ? project.image.height : 1131;

  const lightboxItems = [
    {
      id: project.slug,
      title,
      issuer: category,
      image: {
        src: imageSrc,
        srcSet: imageSrcSet,
        width: imageWidth,
        height: imageHeight,
      },
    },
  ];

  return (
    <PageTransition>
      <PageHeader
        backTo="/projects"
        backLabelKey="common.backProjects"
        breadcrumbs={[
          { label: t('nav.projects'), to: '/projects' },
          { label: title },
        ]}
      />

      <section className="project-detail">
        <Container>
          <div className="project-detail__topbar">
            <Link to="/projects" className="project-detail__back">
              <ArrowLeft size={15} aria-hidden="true" />
              {t('common.backProjects')}
            </Link>
            <Link to="/" className="text-xs uppercase tracking-[0.2em] text-[#a39c91] transition hover:text-[#d6a15b]">
              {t('common.backHome')}
            </Link>
          </div>

          <header className="project-detail__header">
            <div>
              <p className="scene-kicker">{category}</p>
              <h1>{title}</h1>
            </div>
            <div className="project-detail__intro">
              <p>{summary}</p>
              {project.repoUrl && (
                <div className="project-detail__actions">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-detail__action">
                    {t('projects.sourceCode')} <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </header>

          <figure className="project-detail__hero">
            <button
              type="button"
              className="project-detail__hero-button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`${t('projects.preview')}: ${title}`}
            >
              <img
                src={imageSrc}
                srcSet={imageSrcSet}
                sizes="(max-width: 1024px) 100vw, 1440px"
                alt={`${title} ${t('projects.coverAlt')}`}
                width={imageWidth}
                height={imageHeight}
                fetchpriority="high"
                decoding="async"
              />
              <span className="project-detail__hero-hint">
                <Maximize2 size={13} aria-hidden="true" />
                <span>{t('projects.zoom')}</span>
              </span>
            </button>
          </figure>

          <dl className="project-detail__meta">
            <div>
              <dt>{t('projects.role')}</dt>
              <dd>{role}</dd>
            </div>
            <div>
              <dt>{t('projects.year')}</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>{t('projects.category')}</dt>
              <dd>{category}</dd>
            </div>
          </dl>

          <div className="project-detail__overview">
            <article className="project-detail__description">
              <p className="scene-kicker">{t('projects.description')}</p>
              <p>{description}</p>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-detail__action project-detail__action--primary mt-6">
                  {t('projects.liveDemo')} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </article>
            <aside className="project-detail__highlights" aria-labelledby="project-highlights-title">
              <h2 id="project-highlights-title" className="scene-kicker">{t('projects.highlights')}</h2>
              <dl>
                {project.highlights.map((highlight) => (
                  <div key={getLocalizedProjectText(highlight.label, language)}>
                    <dt>{getLocalizedProjectText(highlight.label, language)}</dt>
                    <dd>{getLocalizedProjectText(highlight.value, language)}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <div className="project-detail__lower">
            <section className="project-detail__features" aria-labelledby="project-features-title">
              <h2 id="project-features-title" className="scene-kicker">{t('projects.features')}</h2>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={`${project.slug}-feature-${index}`}>{getLocalizedProjectText(feature, language)}</li>
                ))}
              </ul>
            </section>
            <section className="project-detail__stack" aria-labelledby="project-stack-title">
              <h2 id="project-stack-title" className="scene-kicker">{t('projects.stack')}</h2>
              <ul>
                {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </section>
          </div>
        </Container>
      </section>

      <CertificateLightbox
        isOpen={lightboxOpen}
        certificates={lightboxItems}
        currentIndex={0}
        onClose={() => setLightboxOpen(false)}
        closeLabel={t('common.close')}
      />
    </PageTransition>
  );
}
