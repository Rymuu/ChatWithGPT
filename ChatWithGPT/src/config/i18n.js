import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../translations/en.js';
import fr from '../translations/fr.js';

const resources = {
  en,
  fr,
};

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
