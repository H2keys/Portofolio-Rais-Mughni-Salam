import { useTranslation } from 'react-i18next';
import { getLocalizedProjectText } from '../../utils/projectContent';

export function ProjectPreview({ project }) {
  const { i18n, t } = useTranslation();
  const title = getLocalizedProjectText(project.title, i18n.resolvedLanguage || i18n.language);
  const image = project.image || project.thumbnail;

  const imageSrc = typeof image === 'string' ? image : image?.src;
  const imageSrcSet = typeof image === 'object' ? image?.srcSet : undefined;
  const imageWidth = typeof image === 'object' ? image?.width : 1600;
  const imageHeight = typeof image === 'object' ? image?.height : 1131;

  return (
    <div className="project-preview">
      {imageSrc ? (
        <img
          src={imageSrc}
          srcSet={imageSrcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          alt={`${title} preview`}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="project-preview__placeholder" role="img" aria-label={`${t('projects.preview')}: ${title}`}>
          <span>{t('projects.preview')}</span>
          <strong>{title}</strong>
          <small>{t('projects.imageUnavailable')}</small>
        </div>
      )}
    </div>
  );
}