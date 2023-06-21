import { type FC } from 'react'
import {
    render,
    type RenderResult,
    type RenderOptions,
} from '@testing-library/react'
import ThemeProvider from '../../theme/index'
import i18n from '../../i18n'
import { initReactI18next } from 'react-i18next'

beforeEach(async () => {
    await i18n.use(initReactI18next).init({
        resources: {},
        lng: 'en', // Set the desired language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        defaultNS: 'common',
        parseMissingKeyHandler: (key, defaultValue) => key.replace('.', ':'),
        appendNamespaceToMissingKey: true,
    })
})

const Providers: FC<{ children: React.ReactElement }> = ({ children }) => {
    return <ThemeProvider>{children}</ThemeProvider>
}

const customRender = (
    UI: JSX.Element,
    options?: RenderOptions
): RenderResult => {
    return render(UI, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { customRender }
