import {TTheme} from '../../types';
export const LIGHT_THEME: TTheme = {
  primary: {main: '#335083'},
  secondary: {main: '#9c27b0'},
  error: {main: '#f44336'},
  backgrounds: {
    webPrimary: '#ffffff', // pink
    appPrimary: '#f3f3f3', // purple
    webSecondary: '#0A1E3B', // very dark blue
    appSecondary: '#ffffff', // very dark(mostly black) blue
    webMobile: '#fff',
    inputColor: '#f9f9f9', // very light grey(mostly white)
    success: '#2F9F1D', // green
  },
  text: {
    primary: '#000000',
    secondary: '#666',
  },
};

export const DARK_THEME: TTheme = {
  primary: {main: '#335083'},
  secondary: {main: '#9c27b0'},
  error: {main: '#f44336'},
  backgrounds: {
    webPrimary: '#ff2f4f',
    appPrimary: '#f3f3f3',
    inputColor: '#f9f9f9',
    webSecondary: '#0A1E3B', // very dark blue
    appSecondary: '#ffffff', // very dark(mostly black) blue
    webMobile: '#fff',
    success: '#2F9F1D',
  },
  text: {
    primary: '#fff',
    secondary: '#666',
  },
};

export enum MODES {
  dark = 'dark',
  light = 'light',
}
