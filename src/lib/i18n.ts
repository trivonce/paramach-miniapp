import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uz from './translations/uz.json';
import ru from './translations/ru.json';

const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 