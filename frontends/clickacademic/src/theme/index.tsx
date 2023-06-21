import { useState } from 'react'
import {
    createTheme,
    ThemeProvider as ThemeComponentProvider,
} from '@dixre/ui-library'
import { themeDefination, ThemeType, type Modes } from './theme'
import '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Theme {
        toggle: () => void
        backgrounds: {
            webPrimary: string
            appPrimary: string
            webSecondary: string
            webMobile: string
            appSecondary: string
            inputColor: string
            success: string
        }
    }
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

const ThemeProvider = ({
    children,
}: {
    children: React.ReactElement
}): JSX.Element => {
    const [mode, setMode] = useState<Modes>(ThemeType.light)
    const toggle = (): void => {
        const nextMode =
            mode === ThemeType.light ? ThemeType.dark : ThemeType.light
        setMode(nextMode)
    }
    const theme = createTheme({
        ...themeDefination(ThemeType.light),
        toggle,
    })
    return (
        <ThemeComponentProvider theme={theme}>
            {children}
        </ThemeComponentProvider>
    )
}

export default ThemeProvider
