// NOTE
// We don't have actual translations so we use translation keys since t will
// return the translation key when it can't find translation

import { type RenderResult, customRender, fireEvent } from '../../../utils/test'
import MobileNav, { type Props } from '.'
import { routes } from '../../../utils/const'

const setSelectedPage = jest.fn()
const defaultProps: Props = {
    selectedPage: 'common:navigationWidget:home',
    setSelectedPage,
}

const getComponent = (props: Props): RenderResult => {
    return customRender(
        <MobileNav {...props} />,
        undefined,
        ['/common:navigationwidget:home'],
        'common:navigationwidget:home'
    )
}

describe('MobileNav', () => {
    test('Should render correctly!', () => {
        getComponent(defaultProps)
    })

    test('Should ensure signup button is displayed', () => {
        const { getByRole } = getComponent({
            ...defaultProps,
        })
        fireEvent.click(getByRole('button'))
        // The key  common:navigationWidget:signup was suppose to be used here but for some reason
        // Its returning navigationWidget.signup on the document which is unexpected.
        // This assertion is subject improvment to make test more clearer.
        // This works fine for desktop but unknown reasons makes it not work here
        expect(
            getByRole('button', { name: 'navigationWidget.signup' })
        ).toBeInTheDocument()
    })

    test('Should ensure setSelectedPage is called with page', () => {
        const { getByRole } = getComponent(defaultProps)
        fireEvent.click(getByRole('button'))
        const homeLink = getByRole('link', {
            name: `common:navigationWidget:${routes[0]}`,
        })
        fireEvent.click(homeLink)
        expect(setSelectedPage).toHaveBeenCalledWith(
            `common:navigationWidget:${routes[0]}`.toLowerCase()
        )
    })

    test('Should ensure all links are rendered', () => {
        const { getByRole } = getComponent({ ...defaultProps })
        fireEvent.click(getByRole('button'))
        routes.forEach((route) => {
            expect(
                getByRole('button', {
                    name: `common:navigationWidget:${route}`,
                })
            ).toBeInTheDocument()
        })
    })
})
