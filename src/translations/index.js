import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources from './resources';
import { timeSince } from '../utils/index';

const preferredLanguage = 'en'; 

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: preferredLanguage, 
    detection: {
      order: ['cookie', 'navigator'],
      lookupCookie: 'i18nextLng',
    },
    caches: ['cookie'],

    resources,
    ns: ['common', 'message'],
    defaultNS: 'common',
    whitelist: ['tr', 'en'],

    appendNamespaceToMissingKey: false,
    parseMissingKeyHandler: (key) => {
      if (key.split(":")[0] === "message") {
        return i18n.t('message:default_error');
      } else {
        return key;
      }
    },
    
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (value instanceof Date) {
          if (format === "ago") {
            return timeSince(value);
          }
        }
        return value.toString();
      }
    },
    lng: preferredLanguage,
  });

export default i18n;
