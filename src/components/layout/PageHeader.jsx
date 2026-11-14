import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../common/Container';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { siteConfig } from '../../data/siteConfig';

export function PageHeader({
  backTo = '/',
  backLabelKey = 'common.backHome',
  title,
  eyebrow,
  breadcrumbs = [],
  action,
}) {
  const { t } = useTranslation();

  return (
    <header className="border-b border-white/10 bg-[#090909]/85 backdrop-blur-md">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to={backTo}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#f4efe8] transition hover:border-[#d6a15b]/40 hover:bg-white/10 hover:text-[#d6a15b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a15b]"
              aria-label={t(backLabelKey)}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>{t(backLabelKey)}</span>
            </Link>

            {breadcrumbs.length > 0 && (
              <nav aria-label={t('common.breadcrumb')} className="hidden items-center gap-2 text-xs text-[#a39c91] sm:flex">
                <span className="text-white/20">/</span>
                {breadcrumbs.map((crumb, idx) => (
                  <span key={crumb.label} className="flex items-center gap-2">
                    {crumb.to ? (
                      <Link to={crumb.to} className="transition hover:text-[#f4efe8]">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-[#f4efe8]">{crumb.label}</span>
                    )}
                    {idx < breadcrumbs.length - 1 && <span className="text-white/20">/</span>}
                  </span>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#d6a15b] transition hover:text-[#f3e9d8] md:flex"
            >
              {siteConfig.brandName}
            </Link>
            {action}
            <LanguageSwitcher />
          </div>
        </div>

        {(title || eyebrow) && (
          <div className="pt-6 pb-2">
            {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-[#d6a15b]">{eyebrow}</p>}
            {title && <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[#f7f5f1] sm:text-5xl">{title}</h1>}
          </div>
        )}
      </Container>
    </header>
  );
}
