import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { Button } from '../common/Button';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { MenuOverlay } from './MenuOverlay';

export function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.dispatchEvent(new CustomEvent('porto:scroll-lock', { detail: { locked: menuOpen } }));
    return () => {
      document.body.style.overflow = '';
      document.dispatchEvent(new CustomEvent('porto:scroll-lock', { detail: { locked: false } }));
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090909]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#f5f0ea]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6a15b]/40 bg-[#d6a15b]/10 text-xs font-semibold tracking-[0.3em] text-[#f7f3ee]">
            {siteConfig.brandName.slice(0, 2).toUpperCase()}
          </span>
          {siteConfig.brandName}
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `nav-item text-sm text-[#d7d2ca] transition hover:text-[#f3e9d8] ${isActive ? 'text-[#f3e9d8]' : ''}`}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button as="link" variant="secondary" className="!px-4 !py-2.5" to="/contact">
            {t('common.contactMe')}
          </Button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f2eee6]"
            aria-label={menuOpen ? t('nav.closeNavigation') : t('nav.openNavigation')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-dialog"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MenuOverlay onClose={closeMenu} triggerRef={menuButtonRef} />}
      </AnimatePresence>
    </header>
  );
}
