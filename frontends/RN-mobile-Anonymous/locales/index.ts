import enCommon from './en/common.json';
import frCommon from './fr/common.json';
import enTranslation from './en/translation.json';
import frTranslation from './fr/translation.json';
import {SUPPORTED_LANGUAGES, SUPPORTED_NAMESPACES} from '../utils';

export const Translations = {
  [SUPPORTED_LANGUAGES.en]: {
    [SUPPORTED_NAMESPACES.common]: enCommon,
    [SUPPORTED_NAMESPACES.translation]: enTranslation,
  },
  [SUPPORTED_LANGUAGES.fr]: {
    [SUPPORTED_NAMESPACES.common]: frCommon,
    [SUPPORTED_NAMESPACES.translation]: frTranslation,
  },
};
