import {
    render,
    type RenderOptions,
    type RenderResult,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { createIconContext } from '../../components/Icon'
import * as DefaultIcons from '../../components/Icon/defaultIconImport.unicorn'
import { ThemeProvider, createTheme } from '../../components'
import { themeDefination } from './theme'

const IconContext = createIconContext({ icons: DefaultIcons })
export const Icon = IconContext.Icon
const IconProvider = IconContext.Provider
const theme = createTheme(themeDefination())

const AllProviders = ({
    children,
}: {
    children: React.ReactElement
}): JSX.Element => (
    <MemoryRouter>
        <IconProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </IconProvider>
    </MemoryRouter>
)

const customRender = (ui: JSX.Element, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender, userEvent }
