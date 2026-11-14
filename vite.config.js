import { defineConfig } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { projects } from './src/data/projects.js';
import { siteConfig } from './src/data/siteConfig.js';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function replaceMeta(html, attribute, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${escapedKey}")[^>]*>`, 'i');
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
}

function staticSeoPages() {
  return {
    name: 'static-seo-pages',
    apply: 'build',
    async closeBundle() {
      const outputDirectory = resolve(process.cwd(), 'dist');
      const htmlTemplate = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
      const translations = JSON.parse(await readFile(resolve(process.cwd(), 'src/locales/id/translation.json'), 'utf8'));
      const basePages = [
        {
          path: '/',
          title: `${translations.meta.homeTitle} | ${siteConfig.displayName}`,
          description: translations.meta.homeDescription,
        },
        {
          path: '/about',
          title: `${translations.meta.aboutTitle} | ${siteConfig.displayName}`,
          description: translations.meta.aboutDescription,
        },
        {
          path: '/projects',
          title: `${translations.meta.projectsTitle} | ${siteConfig.displayName}`,
          description: translations.meta.projectsDescription,
        },
        {
          path: '/contact',
          title: `${translations.meta.contactTitle} | ${siteConfig.displayName}`,
          description: translations.meta.contactDescription,
        },
      ];
      const projectPages = projects.map((project) => ({
        path: `/projects/${project.slug}`,
        title: `${project.title.id} | ${siteConfig.displayName}`,
        description: project.summary.id,
        image: typeof project.image === 'string' ? project.image : project.image.src,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title.id,
          description: project.summary.id,
          url: `${siteConfig.siteUrl}/projects/${project.slug}`,
          image: `${siteConfig.siteUrl}${typeof project.image === 'string' ? project.image : project.image.src}`,
          dateCreated: project.year.id,
          author: {
            '@type': 'Person',
            name: siteConfig.displayName,
            url: `${siteConfig.siteUrl}/`,
          },
        },
      }));

      for (const page of [...basePages, ...projectPages]) {
        const canonicalUrl = `${siteConfig.siteUrl}${page.path === '/' ? '/' : page.path}`;
        let html = htmlTemplate
          .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
          .replace(/<link\b(?=[^>]*\brel="canonical")[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
        html = replaceMeta(html, 'name', 'description', page.description);
        html = replaceMeta(html, 'property', 'og:title', page.title);
        html = replaceMeta(html, 'property', 'og:description', page.description);
        html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
        html = replaceMeta(html, 'property', 'og:type', page.structuredData ? 'article' : 'website');
        html = replaceMeta(html, 'property', 'og:image', `${siteConfig.siteUrl}${page.image ?? '/og-image.jpg'}`);
        html = replaceMeta(html, 'property', 'og:image:alt', page.title);
        html = replaceMeta(html, 'property', 'og:image:width', String(page.structuredData ? 1600 : 1200));
        html = replaceMeta(html, 'property', 'og:image:height', String(page.structuredData ? 1131 : 630));
        html = replaceMeta(html, 'property', 'og:image:type', page.structuredData ? 'image/webp' : 'image/jpeg');
        html = replaceMeta(html, 'name', 'twitter:title', page.title);
        html = replaceMeta(html, 'name', 'twitter:description', page.description);
        html = replaceMeta(html, 'name', 'twitter:image', `${siteConfig.siteUrl}${page.image ?? '/og-image.jpg'}`);
        if (page.structuredData) {
          html = html.replace(
            /<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/i,
            `<script type="application/ld+json" id="structured-data">${JSON.stringify(page.structuredData).replace(/</g, '\\u003c')}</script>`,
          );
        }

        const pagePath = page.path === '/'
          ? resolve(outputDirectory, 'index.html')
          : resolve(outputDirectory, ...page.path.slice(1).split('/'), 'index.html');
        await mkdir(resolve(pagePath, '..'), { recursive: true });
        await writeFile(pagePath, html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticSeoPages()],
  server: {
    watch: {
      ignored: ['**/Porto.rar'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'scroll-motion': ['gsap', 'gsap/ScrollTrigger', '@gsap/react'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
