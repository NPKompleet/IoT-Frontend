import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const languageOptions = ['English', 'Deutsch'];

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'English',
    debug: true,
    whitelist: languageOptions,
    interpolation: {
      escapeValue: false,
    },
  });