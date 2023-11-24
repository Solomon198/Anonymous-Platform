import 'react-native';
import {Provider} from 'react-redux';
import React from 'react';
import {MODES, ThemeProvider} from '../../src/theme';
import ConfigureStore from 'redux-mock-store';
import {render, RenderOptions} from '@testing-library/react-native';
import {IStore} from '../../types';

const store = ConfigureStore([]);

const defaultStore: IStore = {
  theme: {
    mode: MODES.light,
  },
};

const EnhancedComponent = ({children}: any) => (
  <Provider store={store(defaultStore)}>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
);

function customRender(UI: JSX.Element, options?: RenderOptions) {
  return render(<EnhancedComponent>{UI}</EnhancedComponent>, options);
}

export {customRender};
export * from '@testing-library/react-native';
