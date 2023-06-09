import { type ThemeOptions } from '../../../libs/components/Theme'
import { amber, grey } from '@mui/material/colors'
export const themeDefination = (): ThemeOptions => {
    return {
        palette: {
            // palette values for light mode
            primary: { main: '#000000' },
            secondary: { main: '#9c27b0' },
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
        },
        typography: {
            fontFamily: 'Roboto', // default font family
            fontSize: 14, // default font size
            fontWeightBold: 700, // default font weight for bold text
        },
    }
}
