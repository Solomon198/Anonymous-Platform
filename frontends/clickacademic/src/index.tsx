import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ThemeProvider from './theme/index'
import './i18n'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
            <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
)
