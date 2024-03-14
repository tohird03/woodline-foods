import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
const Languages = ['uz', 'en', 'ru'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: false,
    whitelist: Languages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['cookie', 'localStorage'],
      lookupCookie: 'lang',
      lookupLocalStorage: 'lang',
      caches: ['cookie', 'localStorage'],
    },
  });
export default i18n;
