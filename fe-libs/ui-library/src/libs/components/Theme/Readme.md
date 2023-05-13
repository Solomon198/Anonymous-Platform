## Theme

> To use this theme component Simply import `ThemeProvider` and pass theme configuration base on `mui` `ThemeOption`
> You can also overide or extend some of the following props exposed by this generic theme component such as `ThemeOption`, `Theme`;
> Other Utilities such as `useTheme`, `styled` and `createTheme` functions are also exposed

### **Example**

**Configure Theme Like This**

```js
import { useState } from 'react'
import {
    createTheme,
    ThemeProvider as ThemeComponentProvider,
} from '../genericTheme' // import from where generic theme is exported
import { ThemeType, themeDefination, type Modes } from './theme'

interface Props {
    children: JSX.Element | any | JSX.Element[];
}

const ThemeProvider = ({ children }: Props): JSX.Element => {
    const [mode, setMode] = useState < Modes > ThemeType.light
    const toggle = (): void => {
        const nextMode =
            mode === ThemeType.light ? ThemeType.dark : ThemeType.light
        setMode(nextMode)
    }
    const theme = createTheme({
        ...themeDefination(mode),
        toggle,
    })
    return (
        <ThemeComponentProvider theme={theme}>
            {children}
        </ThemeComponentProvider>
    )
}

export default ThemeProvider
```

```js

// you can extend or overide type definitions like this, but in our case it will be from @dixre/ui-library which is the target
 declare module '@mui/material/styles' {
    interface Theme {
        toggle: () => void
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        toggle?: () => void
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
                      secondary: { main: amber['100'] },
                      divider: amber[200],
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
                      secondary: { main: '#66aabb' },
                      divider: deepOrange[700],
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
    }
}

```
