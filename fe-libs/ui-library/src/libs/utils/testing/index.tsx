import {
    render,
    type RenderOptions,
    type RenderResult,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ThemeProvider from 'theme'
import { IconProvider } from '../../../components/Icon'

const AllProviders = ({
    children,
}: {
    children: React.ReactElement
}): JSX.Element => (
    <MemoryRouter>
        <IconProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </IconProvider>
    </MemoryRouter>
)

const customRender = (ui: JSX.Element, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender, userEvent }
