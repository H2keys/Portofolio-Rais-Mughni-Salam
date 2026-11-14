# Porto Portfolio

A premium personal portfolio built with React 18, Vite, Tailwind CSS, Framer Motion, Lenis, and i18next.

## Overview

The project is structured as a modular portfolio site for a creative developer or designer. Content is centralized in data files so most updates happen without editing large UI components.

## Stack

- React 18
- Vite
- Tailwind CSS v4
- React Router DOM v6
- Framer Motion
- Lenis
- i18next
- Lucide icons

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Project structure

```text
src/
  app/
  components/
  contexts/
  data/
  hooks/
  i18n/
  locales/
  pages/
  sections/
  services/
  styles/
  utils/
```

## Update personal details

Edit the values in `src/data/siteConfig.js`:

```js
export const siteConfig = {
  brandName: 'porto',
  displayName: 'Raisa M.',
  role: 'Creative Developer',
  email: 'hello@porto.studio',
  splashScreen: true,
  customCursor: true,
};
```

## Add or edit projects

Open `src/data/projects.js` and add a new object:

```js
{
  id: 'project-slug',
  slug: 'project-slug',
  title: 'Project Name',
  category: 'Brand Experience',
  year: '2025',
  description: 'Short summary',
  thumbnail: 'https://example.com/image.jpg',
  images: ['https://example.com/one.jpg'],
  technologies: ['React', 'Tailwind'],
  liveUrl: 'https://example.com',
  repositoryUrl: 'https://github.com/example',
  featured: true,
}
```

Projects are rendered from data, so you do not need to edit the gallery component when adding content.

## Add images

Use image URLs or local assets. For local files, place them in `public/images` and reference them as `/images/your-file.jpg`.

## Update skills, education, and experience

Edit the following files:

- `src/data/skills.js`
- `src/data/experience.js`
- `src/data/education.js`
- `src/data/socialLinks.js`

## Edit translations

Translate user-facing strings in:

- `src/locales/en/translation.json`
- `src/locales/id/translation.json`

Keep keys aligned between both files. Add new keys in both languages to preserve a consistent structure.

## Design tokens and styles

The global design system is defined in `src/styles/globals.css` and Tailwind is enabled through `vite.config.js`.

## Contact form configuration

Set the destination endpoint in `.env`:

```bash
VITE_CONTACT_SERVICE_ENDPOINT=https://example.com/contact
```

If it is not configured, the form intentionally shows a non-submitting state and asks the user to email directly.

## Splash screen and custom cursor

These are toggled in `src/data/siteConfig.js`:

```js
splashScreen: true,
customCursor: true,
```

## Deploy to Vercel or Netlify

1. Push the project to GitHub.
2. Import the repository in Vercel or Netlify.
3. Use the default Vite build command: `npm run build`
4. Set output directory: `dist`
5. If you use a contact service, add the env variable in the deployment dashboard.

## Known limitations

- Client-side routing requires deployment rewrite rules.
- SEO is reasonable for a SPA, but full prerendering is better for heavy SEO requirements.
- The contact service is not active until you provide a real endpoint.

## Maintenance

Most content changes are centralized in `src/data` and `src/locales` files. This keeps the layout and visual system reusable as the portfolio grows.
