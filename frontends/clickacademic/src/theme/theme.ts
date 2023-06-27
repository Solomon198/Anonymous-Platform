import { type ThemeOptions } from '@dixre/ui-library'
import { amber, grey, deepOrange } from '@mui/material/colors'

export enum ThemeType {
    dark = 'dark',
    light = 'light',
}

export type Modes = keyof typeof ThemeType

export const themeDefination = (mode: Modes): ThemeOptions => {
    return {
        palette: {
            mode,
            ...(mode === ThemeType.light
                ? {
                      // palette values for light mode
                      primary: { main: '#000000' },
                      secondary: { main: '#9c27b0' },
                      backgrounds: {
                          webPrimary: '#ff2f4f', // pink
                          appPrimary: '#775ADA', // purple
                          webSecondary: '#0A1E3B', // very dark blue
                          appSecondary: '#101828', // very dark(mostly black) blue
                          webMobile: "#fff",
                          inputColor: '#f9f9f9', // very light grey(mostly white)
                          success: '#2F9F1D', // green
                          footerTitle: '#98A2B3',
                          footerText: '#EAECF0',
                      },
                      divider: amber[200],
                      buttonSpinner: {
                          contained: '#ffffff',
                          outlined: '#000000',
                          text: '#000000',
                      },
                      text: {
                          primary: '#000000',
                          secondary: '#6f6f6f',
                      },
                  }
                : {
                      // palette values for dark mode
                      primary: { main: '#ffffff' },
                      secondary: { main: '#9c27b0' },
                      backgrounds: {
                          webPrimary: '#ff2f4f',
                          appPrimary: '#5f48ae',
                          inputColor: '#f9f9f9',
                          success: '#2F9F1D',
                          footerTitle: '#98A2B3',
                          footerText: '#EAECF0',
                      },
                      divider: deepOrange[700],
                      buttonSpinner: {
                          contained: '#000000',
                          outlined: '#ffffff',
                          text: '#ffffff',
                      },
                      background: {
                          default: '#000000',
                          paper: '#111111',
                      },
                      text: {
                          primary: '#fff',
                          secondary: grey[500],
                      },
                  }),
        },
        typography: {
            fontFamily: 'Poppins', // default font family
            fontSize: 14, // default font size
            fontWeightBold: 500, // default font weight for bold text
        },
    }
}
