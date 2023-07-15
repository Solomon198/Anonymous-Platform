import {Navigation} from 'react-native-navigation';
import {Screens} from './screens';

export function DefaultNavSettingStack() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.SIGNUP_SCREEN,
              id: Screens.SIGNUP_SCREEN,
            },
          },
        ],
      },
    },
  });
}

export function AuthNavigationSettingStack() {
  return Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              // name: Screens.LOCATION_SCREEN,
              // id: Screens.LOCATION_SCREEN,
              name: Screens.INTRO_SCREEN,
              id: Screens.INTRO_SCREEN,
            },
          },
        ],
      },
    },
  });
}

export function Main() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'TABS',
        children: [
          {
            stack: {
              id: 'home',
              children: [
                {
                  component: {
                    name: Screens.INTRO_SCREEN,
                    id: Screens.INTRO_SCREEN,
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'profile',
              children: [
                {
                  component: {
                    name: Screens.INTRO_SCREEN,
                    id: Screens.INTRO_SCREEN,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}
