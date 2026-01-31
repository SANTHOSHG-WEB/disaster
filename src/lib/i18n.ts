import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import taCommon from '../locales/ta/common.json';

const resources = {
    en: {
        common: enCommon,
    },
    ta: {
        common: taCommon,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false, // Prevents issues on server
        }
    });

export default i18n;
