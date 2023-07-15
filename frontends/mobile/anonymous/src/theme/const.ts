import {TTheme} from '../../types';
export const LIGHT_THEME: TTheme = {
  primary: {main: '#000000'},
  secondary: {main: '#9c27b0'},
  error: {main: '#f44336'},
  backgrounds: {
    webPrimary: '#ffffff', // pink
    appPrimary: '#ffffff', // purple
    webSecondary: '#0A1E3B', // very dark blue
    appSecondary: '#101828', // very dark(mostly black) blue
    webMobile: '#fff',
    inputColor: '#f9f9f9', // very light grey(mostly white)
    success: '#2F9F1D', // green
  },
  text: {
    primary: '#000000',
    secondary: '#6f6f6f',
  },
};

export const DARK_THEME: TTheme = {
  primary: {main: '#ffffff'},
  secondary: {main: '#9c27b0'},
  error: {main: '#f44336'},
  backgrounds: {
    webPrimary: '#ff2f4f',
    appPrimary: '#5f48ae',
    inputColor: '#f9f9f9',
    webSecondary: '#0A1E3B', // very dark blue
    appSecondary: '#101828', // very dark(mostly black) blue
    webMobile: '#fff',
    success: '#2F9F1D',
  },
  text: {
    primary: '#fff',
    secondary: '#f6f6f6',
  },
};

export enum MODES {
  dark = 'dark',
  light = 'light',
}
