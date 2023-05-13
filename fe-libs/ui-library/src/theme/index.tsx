import { useState } from 'react'
import {
    createTheme,
    ThemeProvider as ThemeComponentProvider,
} from '../libs/components/Theme'
import { ThemeType, themeDefination, type Modes } from './theme'

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
