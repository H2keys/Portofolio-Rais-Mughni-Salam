import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectPreview } from './ProjectPreview';
import { getLocalizedProjectText } from '../../utils/projectContent';

export function ProjectCard({ project, index = 0 }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const title = getLocalizedProjectText(project.title, language);
  const category = getLocalizedProjectText(project.category, language);

  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`${t('common.viewProject')}: ${title}`}
      className={`project-gallery__item project-grid__item project-gallery__item--${(index % 4) + 1}`}
      data-cursor={t('common.viewProject')}
    >
      <span className="project-gallery__frame project-grid__frame">
        <ProjectPreview project={project} />
        <span className="project-gallery__overlay" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </span>
      <span className="project-gallery__caption project-grid__caption">
        <span>{title}</span>
        <span>{category}</span>
      </span>
    </Link>
  );
}
