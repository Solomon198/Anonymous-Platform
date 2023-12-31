import { type ThemeOptions } from '../libs/components/Theme'
import { amber, grey, deepOrange } from '@mui/material/colors'

declare module '@mui/material/styles' {
    interface Theme {
        toggle: () => void
        primary: {
            main: string
        }
        secondary: {
            main: string
        }
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        toggle?: () => void
    }

    interface PaletteOptions {
        buttonSpinner: {
            contained: string
            outlined: string
            text: string
        }
    }

    interface Palette {
        buttonSpinner: {
            contained: string
            outlined: string
            text: string
        }
    }

    interface PaletteColor {
        dark: string
    }
}

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
                      error: { main: '#f44336' },
                      divider: amber[200],
                      buttonSpinner: {
                          contained: '#ffffff',
                          outlined: '#000000',
                          text: '#000000',
                      },
                      text: {
                          primary: '#000000',
                          secondary: grey[800],
                      },
                      background: {
                          default: '#ffffff',
                          paper: grey[100],
                      },
                  }
                : {
                      // palette values for dark mode
                      primary: { main: '#ffffff' },
                      secondary: { main: '#9c27b0' },
                      error: { main: '#f44336' },
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
            fontFamily: 'Roboto', // default font family
            fontSize: 14, // default font size
            fontWeightBold: 700, // default font weight for bold text
        },
    }
}
