import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import { socialLinks } from '../data/socialLinks';
import { getLocalizedProjectText } from '../utils/projectContent';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.append(element);
  }
  element.href = url;
}

export function usePageMetadata() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;

  useEffect(() => {
    const project = pathname.startsWith('/projects/')
      ? projects.find((entry) => entry.slug === pathname.split('/')[2])
      : undefined;
    const isNotFound = pathname !== '/'
      && !['/about', '/projects', '/contact'].includes(pathname)
      && !project;
    const route = isNotFound ? '/404' : pathname;
    const title = project
      ? `${getLocalizedProjectText(project.title, language)} | ${siteConfig.displayName}`
      : `${t(`meta.${route === '/' ? 'home' : route.slice(1) === '404' ? 'notFound' : route.slice(1)}Title`, { defaultValue: t('meta.homeTitle') })} | ${siteConfig.displayName}`;
    const description = project
      ? getLocalizedProjectText(project.summary, language)
      : t(`meta.${route === '/' ? 'home' : route.slice(1) === '404' ? 'notFound' : route.slice(1)}Description`, {
        defaultValue: t('meta.homeDescription'),
      });
    const canonicalUrl = `${siteConfig.siteUrl}${isNotFound ? pathname : route}`;
    const projectImage = project && typeof project.image === 'object' ? project.image : null;
    const imageUrl = `${siteConfig.siteUrl}${projectImage?.src ?? (project?.image ?? '/og-image.jpg')}`;
    const pageTitle = isNotFound && route === '/404'
      ? `${t('notFound.title')} | ${siteConfig.displayName}`
      : title;

    document.title = pageTitle;
    document.documentElement.lang = language.startsWith('id') ? 'id' : 'en';
    setMeta('name', 'description', description);
    setMeta('name', 'robots', isNotFound ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:type', project ? 'article' : 'website');
    setMeta('property', 'og:site_name', siteConfig.displayName);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:width', String(projectImage?.width ?? 1200));
    setMeta('property', 'og:image:height', String(projectImage?.height ?? 630));
    setMeta('property', 'og:image:type', projectImage ? 'image/webp' : 'image/jpeg');
    setMeta('property', 'og:image:alt', project
      ? getLocalizedProjectText(project.title, language)
      : t('meta.personImageAlt'));
    setMeta('property', 'og:locale', language.startsWith('id') ? 'id_ID' : 'en_US');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
    setCanonical(canonicalUrl);

    const structuredData = project
      ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: getLocalizedProjectText(project.title, language),
        description,
        url: canonicalUrl,
        image: imageUrl,
        dateCreated: getLocalizedProjectText(project.year, language),
        author: { '@type': 'Person', name: siteConfig.displayName, url: `${siteConfig.siteUrl}/` },
      }
      : {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${siteConfig.siteUrl}/#person`,
        name: siteConfig.displayName,
        url: `${siteConfig.siteUrl}/`,
        image: `${siteConfig.siteUrl}${siteConfig.profileImage}`,
        email: `mailto:${siteConfig.email}`,
        jobTitle: language.startsWith('id') ? 'Programmer dan Web Developer' : 'Programmer and Web Developer',
        sameAs: [socialLinks.linkedin.url, socialLinks.github.url, socialLinks.instagram.url],
      };
    let jsonLd = document.getElementById('structured-data');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'structured-data';
      jsonLd.type = 'application/ld+json';
      document.head.append(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
  }, [i18n, language, pathname, t]);
}
