import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      exitMessage: 'Are you sure you want to leave?',
      no: 'No',
      yes: 'Yes',
      welcome: 'Welcome!',
      greeting: 'Hello, {{name}}!',
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