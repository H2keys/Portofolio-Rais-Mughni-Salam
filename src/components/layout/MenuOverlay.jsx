import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { socialLinks } from '../../data/socialLinks';
import { siteConfig } from '../../data/siteConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const menuItems = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/contact', key: 'nav.contact' },
];

export function MenuOverlay({ onClose, triggerRef }) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef(null);

  useEffect(() => {
    const previousFocus = triggerRef?.current ?? document.activeElement;
    const focusable = () => [...(overlayRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [])];
    focusable()[0]?.focus();

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      previousFocus?.focus?.();
    };
  }, [onClose, triggerRef]);

  return (
    <motion.div
      ref={overlayRef}
      id="mobile-navigation-dialog"
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.navigationDialog')}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.25 }}
      className="fixed inset-0 z-50 bg-[#090909] px-5 py-6 sm:px-8"
    >
      <nav aria-label={t('nav.navigationDialog')} className="mx-auto flex h-full max-w-7xl flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-[#d5c7a7]">{siteConfig.brandName}</div>
          <button type="button" onClick={onClose} aria-label={t('common.close')} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#f0ece5]">
            {t('common.close')}
          </button>
        </div>

        <div className="space-y-4 py-10">
          {menuItems.map((item, index) => (
            <motion.div key={item.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-white/10 py-3 text-3xl font-medium tracking-[-0.06em] text-[#f7f4f1] sm:text-5xl"
              >
                <span>{t(item.key)}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-[#d6a15b]">0{index + 1}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#d6a15b]">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-2 inline-block text-lg text-[#f3efe8]">{siteConfig.email}</a>
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.entries(socialLinks).map(([key, social]) => (
              <a
                key={key}
                href={social.url}
                target={key === 'email' ? undefined : '_blank'}
                rel={key === 'email' ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 text-sm text-[#d4cec4] transition hover:text-[#f3e9d8]"
              >
                {social.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
