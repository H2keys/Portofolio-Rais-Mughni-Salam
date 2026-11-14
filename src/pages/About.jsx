import { ArrowDownToLine } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/common/PageTransition';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PageHeader } from '../components/layout/PageHeader';
import { siteConfig } from '../data/siteConfig';
import { interests, skills } from '../data/skills';
import { experience } from '../data/experience';
import { education } from '../data/education';
import { SocialLinks } from '../components/common/SocialLinks';
import { getLocalizedProjectText } from '../utils/projectContent';

export default function About() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;

  return (
    <PageTransition keyName="about">
      <PageHeader
        backTo="/"
        backLabelKey="common.backHome"
        eyebrow={t('about.title')}
        title={siteConfig.displayName}
      />

      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <figure className="relative m-0 h-[320px] overflow-hidden border border-white/10 sm:h-[420px]">
            <img src={siteConfig.profileImage} alt="Foto Rais Mughni Salam" className="h-full w-full object-cover" />
          </figure>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#d6a15b]">{siteConfig.brandName}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-[#f7f5f1] sm:text-5xl">{siteConfig.displayName}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#c8c1b9]">{t('about.intro')}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#c8c1b9]">{t('about.biography')}</p>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <SectionHeading eyebrow={t('about.skills')} title={t('about.skillsTitle')} description={t('about.skillsIntro')} />
          <div className="mt-8 flex flex-wrap gap-3">
            {(skills.length ? skills : interests).map((skill) => (
              <span key={getLocalizedProjectText(skill, language)} className="rounded-full border border-white/10 bg-[#111111] px-4 py-2 text-sm text-[#f0eade]">{getLocalizedProjectText(skill, language)}</span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t('about.experience')} title={t('about.experience')} />
            <div className="mt-8 space-y-5">
              {experience.map((item) => (
                <div key={item.id ?? item.title} className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                  {item.period && <p className="text-xs uppercase tracking-[0.24em] text-[#d6a15b]">{getLocalizedProjectText(item.period, language)}</p>}
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-[#f5f1eb]">{getLocalizedProjectText(item.title, language)}</h3>
                  <p className="mt-1 text-sm text-[#c7c0b4]">{getLocalizedProjectText(item.company, language)}</p>
                  {item.summary && <p className="mt-4 text-sm leading-7 text-[#d5d0c7]">{item.summary}</p>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow={t('about.education')} title={t('about.education')} />
            <div className="mt-8 space-y-5">
              {education.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                  {item.period && <p className="text-xs uppercase tracking-[0.24em] text-[#d6a15b]">{getLocalizedProjectText(item.period, language)}</p>}
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-[#f5f1eb]">{getLocalizedProjectText(item.title, language)}</h3>
                  {item.institution !== item.title && <p className="mt-1 text-sm text-[#c7c0b4]">{getLocalizedProjectText(item.institution, language)}</p>}
                  {item.summary && <p className="mt-4 text-sm leading-7 text-[#d5d0c7]">{item.summary}</p>}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <SectionHeading eyebrow={t('about.social')} title={t('about.social')} />
          <SocialLinks className="contact-methods mt-8" />
          {siteConfig.resumeUrl && <a href={siteConfig.resumeUrl} download className="mt-8 inline-flex items-center gap-2 text-sm text-[#f4efe8] hover:text-[#d6a15b]">{t('common.downloadCv')} <ArrowDownToLine size={16} /></a>}
        </Container>
      </section>
    </PageTransition>
  );
}
