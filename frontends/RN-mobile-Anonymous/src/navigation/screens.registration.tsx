import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import getStore from '../redux/store';
import {Screens} from './screens';
import IntroScreen from '../screens/Intro';
import SignupScreen from '../screens/auth';
import SocialVerification from '../screens/auth/socialVerification';
import {ThemeProvider} from '../theme';

export const {persistor, store} = getStore();

const EnhancedComponent = ({children}: any) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>{children}</ThemeProvider>
    </PersistGate>
  </Provider>
);
function Wrapper(Component: any) {
  return function (props: any) {
    return (
      <EnhancedComponent>
        <Component {...props} />
      </EnhancedComponent>
    );
  };
}

export function IntializeApplicationScreens() {
  Navigation.registerComponent(Screens.INTRO_SCREEN, () =>
    Wrapper(IntroScreen),
  );

  Navigation.registerComponent(Screens.AUTH_SCREEN, () =>
    Wrapper(SignupScreen),
  );
  Navigation.registerComponent(Screens.SOCIAL_VERIFICATION, () =>
    Wrapper(SocialVerification),
  );
}
