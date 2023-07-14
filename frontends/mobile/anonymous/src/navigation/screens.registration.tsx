import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';
import getStore from '../redux/store';
import {Screens} from './screens';
import IntroScreen from '../screens/Intro';

export const {persistor, store} = getStore();

const EnhancedComponent = ({children}: any) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider>{children}</NativeBaseProvider>
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
}
