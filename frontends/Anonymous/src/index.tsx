import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ThemeProvider from './theme/index'
import { Navigation } from './components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigation />,
        children: [
            {
                path: '/home',
                element: <div>Home</div>,
            },
            {
                path: '/features',
                element: <div>Features</div>,
            },
            {
                path: '/courses',
                element: <div>Courses</div>,
            },
            {
                path: '/about',
                element: <div>About</div>,
            },
            {
                path: '/support',
                element: <div>Support</div>,
            },
            {
                path: '/login',
                element: <div>Login</div>,
            },
        ],
    },
])

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)
