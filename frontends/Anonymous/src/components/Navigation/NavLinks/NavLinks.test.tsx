// NOTE
// We don't have actual translations so we use translation keys since t will
// return the translation key when it can't find translation

import { type RenderResult, customRender, fireEvent } from '../../../utils/test'
import NavLinks, { type Props } from '.'
import { routes } from '../../../utils/const'

const setSelectedPage = jest.fn()
const defaultProps: Props = {
    selectedPage: 'common:navigationWidget:home',
    setSelectedPage,
    isMobile: true,
}

const getComponent = (props: Props): RenderResult => {
    return customRender(
        <NavLinks {...props} />,
        undefined,
        ['/common:navigationwidget:home'],
        '/common:navigationwidget:home'
    )
}

describe('NavLinks', () => {
    test('Should render correctly!', () => {
        getComponent(defaultProps)
    })
    test('Should ensure all links are rendered with MUI ListItemButton', () => {
        const { getByRole } = getComponent(defaultProps)
        routes.forEach((route) => {
            expect(
                getByRole('button', {
                    name: `common:navigationWidget:${route}`,
                })
            ).toBeInTheDocument()
        })
    })

    test('Should ensure setSelectedPage is called with page', () => {
        const { getByRole } = getComponent(defaultProps)
        const homeLink = getByRole('link', {
            name: `common:navigationWidget:${routes[0]}`,
        })
        fireEvent.click(homeLink)
        expect(setSelectedPage).toHaveBeenCalledWith(
            `common:navigationWidget:${routes[0]}`.toLowerCase()
        )
    })

    test('Should ensure all links are rendered without ListItemButton', () => {
        const { getByRole, queryByRole } = getComponent({
            ...defaultProps,
            isMobile: false,
        })
        routes.forEach((route) => {
            expect(
                queryByRole('button', {
                    name: `common:navigationWidget:${route}`,
                })
            ).toBeNull()
            expect(
                getByRole('link', {
                    name: `common:navigationWidget:${route}`,
                })
            ).toBeInTheDocument()
        })
    })
})
