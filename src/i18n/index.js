import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/translation.json';
import id from '../locales/id/translation.json';

const savedLanguage = localStorage.getItem('porto-language');
const preferredLanguage = savedLanguage || 'id';

const resources = { en: { translation: en }, id: { translation: id } };

i18n.use(initReactI18next).init({
  resources,
  lng: preferredLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
