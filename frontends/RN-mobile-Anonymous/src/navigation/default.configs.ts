import {Navigation} from 'react-native-navigation';

export function SetUpDefaultNavSettings() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
    bottomTabs: {
      visible: false,
    },
    sideMenu: {},
    layout: {
      orientation: ['portrait'],
    },
  });
}
