import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
      <span className="sr-only">{t('nav.language')}</span>
      {['id', 'en'].map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLanguage(lng)}
          className={`rounded-full px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] transition ${
            language === lng ? 'bg-[#f4e9d9] text-[#111111]' : 'text-[#d8d4cc]'
          }`}
          aria-pressed={language === lng}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
