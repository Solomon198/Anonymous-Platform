// NOTE
// We don't have actual translations so we use translation keys since t will
// return the translation key when it can't find translation

import { type RenderResult, customRender, fireEvent } from '../../../utils/test'
import DesktopNav, { type Props } from '.'
import { routes } from '../../../utils/const'

const setSelectedPage = jest.fn()
const defaultProps: Props = {
    selectedPage: 'common:navigationWidget:home',
    setSelectedPage,
}

const getComponent = (props: Props): RenderResult => {
    return customRender(
        <DesktopNav {...props} />,
        undefined,
        ['/common:navigationwidget:home'],
        '/common:navigationwidget:home'
    )
}

describe('DeskopNav', () => {
    test('Should render correctly!', () => {
        getComponent(defaultProps)
    })

    test('Should ensure signup button is displayed', () => {
        const { getByRole } = getComponent({
            ...defaultProps,
        })
        expect(
            getByRole('button', { name: 'common:navigationWidget:signup' })
        ).toBeInTheDocument()
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

    test('Should ensure all links are rendered', () => {
        const { getByRole, queryByRole } = getComponent({
            ...defaultProps,
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
