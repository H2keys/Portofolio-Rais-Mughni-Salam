import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/common/PageTransition';
import { Container } from '../components/common/Container';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { PageHeader } from '../components/layout/PageHeader';
import { projects } from '../data/projects';
import { getLocalizedProjectText } from '../utils/projectContent';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => [
    { id: 'all', label: t('projects.filterAll') },
    ...Array.from(new Map(projects.map((project) => [project.categoryId, {
      id: project.categoryId,
      label: getLocalizedProjectText(project.category, language),
    }])).values()),
  ], [language, t]);
  const visibleProjects = activeCategory === 'all' ? projects : projects.filter((project) => project.categoryId === activeCategory);

  return (
    <PageTransition>
      <PageHeader
        backTo="/"
        backLabelKey="common.backHome"
        eyebrow={t('projects.title')}
        title={t('projects.selectedTitle')}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <p className="max-w-2xl text-base text-[#c8c1b8]">{t('projects.selectedIntro')}</p>
          <div className="mt-8">
            <ProjectFilter categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>
          <div className="mt-10">
            {visibleProjects.length ? <ProjectGrid projects={visibleProjects} /> : <p className="text-[#d3ccc2]">{t('projects.empty')}</p>}
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
