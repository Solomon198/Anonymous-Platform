import {beforeAll, afterEach, jest} from '@jest/globals';

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {Translations} from '../../locales';
import {
  SUPPORTED_LANGUAGES,
  LANGUAGES,
  NAMESPACES,
  SUPPORTED_NAMESPACES,
} from '../../utils';

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll(async () => {
  await i18next.use(initReactI18next).init({
    lng: SUPPORTED_LANGUAGES.en,
    fallbackLng: SUPPORTED_LANGUAGES.en,
    supportedLngs: LANGUAGES,
    ns: NAMESPACES,
    debug: true,
    defaultNS: SUPPORTED_NAMESPACES.common,
    fallbackNS: SUPPORTED_NAMESPACES.common,
    resources: {},
  });

  Object.keys(Translations).forEach(lng => {
    Object.keys((Translations as any)[lng]).forEach(ns => {
      i18next.addResourceBundle(lng, ns, (Translations as any)[lng][ns]);
    });
  });
});
