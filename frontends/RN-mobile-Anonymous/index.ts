/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {
  IntializeApplicationScreens,
  DefaultNavSettingStack,
  SetUpDefaultNavSettings,
} from './src/navigation';
import 'intl-pluralrules';
import './i18next';

SetUpDefaultNavSettings();
IntializeApplicationScreens();
Navigation.events().registerAppLaunchedListener(() => {
  DefaultNavSettingStack();
});
