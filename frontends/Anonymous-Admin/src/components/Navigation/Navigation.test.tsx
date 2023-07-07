// NOTE
// We don't have actual translations so we use translation keys since t will
// return the translation key when it can't find translation

import { type RenderResult, customRender, fireEvent } from '../../utils/test'
import Navigation from '.'
import { routes } from '../../utils/const'

const defaultWidth = window.innerWidth
const getComponent = (): RenderResult => {
    return customRender(<Navigation />)
}

describe('NavigationDesktop', () => {
    test('Should render correctly!', () => {
        getComponent()
    })

    test('Should ensure signup button is displayed', () => {
        const { getByRole } = getComponent()
        expect(
            getByRole('button', { name: 'common:navigationWidget:signup' })
        ).toBeInTheDocument()
    })

    test('Should ensure logo is displayed', () => {
        const { getByRole } = getComponent()
        expect(
            getByRole('img', { name: 'ClickAcademic logo' })
        ).toBeInTheDocument()
    })

    test('Should ensure all links are rendered', () => {
        const { getByRole } = getComponent()
        routes.forEach((route, index) => {
            // This is a workaround since for unknow reason we are getting
            // the value navigationWidget.home when we passed common:navigationWidget:home
            const name =
                index === 0
                    ? 'navigationWidget.home'
                    : `common:navigationWidget:${route}`
            expect(
                getByRole('link', {
                    name,
                })
            ).toBeInTheDocument()
        })
    })
})

describe('NavigationMobile', () => {
    beforeAll(() => {
        window.innerWidth = 375
    })
    afterAll(() => {
        window.innerWidth = defaultWidth
    })

    test('Should render correctly!', () => {
        getComponent()
    })

    test('Should ensure logo is displayed on mobile', () => {
        const { getByRole } = getComponent()
        expect(
            getByRole('img', { name: 'ClickAcademic logo' })
        ).toBeInTheDocument()
    })

    test('Should ensure signup button is displayed on mobile', () => {
        const { getByRole } = getComponent()
        fireEvent.click(getByRole('button'))
        expect(
            getByRole('button', { name: 'common:navigationWidget:signup' })
        ).toBeInTheDocument()
    })

    test('Should ensure all links are rendered on mobile', () => {
        const { getByRole } = getComponent()
        fireEvent.click(getByRole('button'))
        routes.forEach((route, index) => {
            // This is a workaround since for unknow reason we are getting
            // the value navigationWidget.home when we passed common:navigationWidget:home
            const name =
                index === 0
                    ? 'navigationWidget.home'
                    : `common:navigationWidget:${route}`
            expect(
                getByRole('link', {
                    name,
                })
            ).toBeInTheDocument()
        })
    })
})
