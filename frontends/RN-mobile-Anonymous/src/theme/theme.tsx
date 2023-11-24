import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {MODES, LIGHT_THEME, DARK_THEME} from './const';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {TTheme, IStore} from '../../types';
import {toggleTheme} from './reducer';

export const Context = createContext({
  mode: MODES.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}: any) => {
  const dispatch = useDispatch();
  const {mode} = useSelector(
    (store: IStore) => ({
      mode: store.theme.mode,
    }),
    shallowEqual,
  );

  const ToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeValue = useMemo(() => {
    return {mode, toggleTheme: ToggleTheme};
  }, [mode, ToggleTheme]);

  return <Context.Provider value={themeValue}>{children}</Context.Provider>;
};

export const useTheme = (): TTheme => {
  const {mode} = useContext(Context);
  if (!mode) {
    throw new Error('Please wrap your application with the ThemeProvider');
  }
  if (mode === MODES.light) {
    return LIGHT_THEME;
  } else {
    return DARK_THEME;
  }
};
