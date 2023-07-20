import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ThemeProvider from './theme/index'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import router from './route.config'
import getStore from './redux'
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
const { store, persistor } = getStore()

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <ThemeProvider>
                    <Suspense fallback={null}>
                        <RouterProvider router={router} />
                    </Suspense>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
