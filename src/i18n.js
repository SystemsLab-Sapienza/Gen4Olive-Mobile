import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome!',
      greeting: 'Hello, {{name}}!',
    },
  },
  it: {
    translation: {
      welcome: 'Benvenuto!',
      greeting: 'Ciao, {{name}}!',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;