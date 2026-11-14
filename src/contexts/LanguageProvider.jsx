import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from './LanguageContext';

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'id';
    return localStorage.getItem('porto-language') || 'id';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('porto-language', language);
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
