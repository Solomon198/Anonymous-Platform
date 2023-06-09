import React from 'react'
import {
    useTheme as MuiUseTheme,
    type Theme as MuiTheme,
    ThemeProvider as Provider,
    createTheme as MuiCreateTheme,
    styled as muiStyled,
    type ThemeOptions as MuiThemeOption,
} from '@mui/material'

export type Theme = MuiTheme
export type ThemeOptions = MuiThemeOption

export const useTheme = (): Theme => {
    const theme = MuiUseTheme()
    if (typeof theme !== 'object') {
        throw new Error(
            'You must wrap your root application in an Mui provider'
        )
    }
    return theme
}

export const createTheme = MuiCreateTheme
export const styled = muiStyled

interface ThemeProviderProps {
    theme: Theme
    children: JSX.Element
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme,
    children,
}): JSX.Element => <Provider theme={theme}>{children}</Provider>
