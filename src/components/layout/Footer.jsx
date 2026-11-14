import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../data/socialLinks';
import { siteConfig } from '../../data/siteConfig';

const currentYear = new Date().getFullYear();

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 bg-[#090909]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <Link to="/" aria-label={`${siteConfig.brandName} · ${t('nav.home')}`} className="text-xs uppercase tracking-[0.28em] text-[#d6a15b]">{siteConfig.brandName}</Link>
          <p className="mt-3 max-w-md text-sm text-[#cbc5bc]">{t('home.footerTagline')}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-[#d9d2ca]">
          {Object.entries(socialLinks).map(([key, social]) => (
            <a key={key} href={social.url} target={key === 'email' ? undefined : '_blank'} rel={key === 'email' ? undefined : 'noopener noreferrer'} className="hover:text-[#f3e9d8]">
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-[#9c9489] sm:px-6 lg:px-8">
        © {currentYear} {siteConfig.displayName} · {t('common.allRights')}
      </div>
    </footer>
  );
}
