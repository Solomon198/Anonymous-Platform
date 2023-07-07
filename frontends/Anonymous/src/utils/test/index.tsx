import { type FC } from 'react'
import {
    render,
    type RenderResult,
    type RenderOptions,
} from '@testing-library/react'
import ThemeProvider from '../../theme/index'
import i18n from '../../i18n'
import { initReactI18next } from 'react-i18next'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

beforeEach(async () => {
    await i18n.use(initReactI18next).init({
        resources: {},
        lng: 'en', // Set the desired language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        defaultNS: 'common',
        parseMissingKeyHandler: (key, defaultValue) => {
            return key.replace('.', ':')
        },
        appendNamespaceToMissingKey: true,
    })
})

const getProvider = (
    initialRouteEntries?: string[],
    route?: string
): FC<{ children: React.ReactElement }> => {
    const Provider: FC<{ children: React.ReactElement }> = ({ children }) => {
        return (
            <ThemeProvider>
                <MemoryRouter initialEntries={initialRouteEntries ?? ['/']}>
                    <Routes>
                        <Route path={route ?? '/'} element={<>{children}</>} />
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        )
    }
    return Provider
}

const customRender = (
    UI: JSX.Element,
    options?: RenderOptions,
    intialRouteEntries?: string[],
    route?: string
): RenderResult => {
    return render(UI, {
        wrapper: getProvider(intialRouteEntries, route),
        ...options,
    })
}

export * from '@testing-library/react'
export { customRender }
