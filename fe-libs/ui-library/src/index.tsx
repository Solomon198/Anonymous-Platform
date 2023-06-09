import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Playgrounds from './playgrounds'
import ThemeProvider from './theme'
import { IconProvider } from './components/Icon'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const IntroPlayground: React.FC = () => {
    return (
        <Box
            height="100vh"
            width="80%"
            sx={{
                bgcolor: 'background.default',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            <Typography
                sx={{ color: 'text.primary' }}
                variant="h1"
                style={{ fontWeight: 'bold' }}
            >
                Your Play Area
            </Typography>
            <Typography
                width={400}
                component="p"
                sx={{ color: 'text.primary', textAlign: 'center' }}
            >
                You can click on the icon on the right left to switch theme to
                make sure your component works well in dark and light mode after
                adding your playground
            </Typography>
        </Box>
    )
}

// Routes Config
const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <IntroPlayground />,
            },
            ...Object.entries(Playgrounds).map(([name, Component]) => ({
                path: `/playground-${name.toLowerCase()}`,
                element: <Component />,
            })),
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <IconProvider>
            <ThemeProvider>
                <RouterProvider router={routes} />
            </ThemeProvider>
        </IconProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
