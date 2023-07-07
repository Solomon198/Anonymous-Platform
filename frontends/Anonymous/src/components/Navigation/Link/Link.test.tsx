// NOTE
// We don't have actual translations so we use translation keys since t will
// return the translation key when it can't find translation

import { type RenderResult, customRender, fireEvent } from '../../../utils/test'
import Link, { type Props } from '.'
import { rgbToHex } from '../../../utils/helpers'

const setSelectedPage = jest.fn()
const activeColor = '#f44336'
const intialRoutes = ['/common:navigationWidget:home']
const defaultProps: Props = {
    selectedPage: 'common:navigationWidget:home',
    setSelectedPage,
    page: 'common:navigationWidget:home',
}

const getComponent = (props: Props): RenderResult => {
    return customRender(
        <Link {...props} />,
        undefined,
        intialRoutes,
        defaultProps.page
    )
}

describe('Link', () => {
    test('Should render correctly!', () => {
        getComponent(defaultProps)
    })
    test('Should ensure Link component will render value correctly', () => {
        const { getByRole } = getComponent(defaultProps)
        const homePageLink = getByRole('link', {
            name: defaultProps.page,
        })
        expect(homePageLink).toBeInTheDocument()
    })

    test('Should apply active color when current page is the selected page', () => {
        const { getByText } = getComponent(defaultProps)
        const homePageLink = getByText(defaultProps.page)
        const styles = window.getComputedStyle(homePageLink)
        const color = styles.getPropertyValue('color')
        expect(rgbToHex(color)).toBe(activeColor)
    })

    test('Should ensure setSelected page func is called with correct param', () => {
        const { getByRole } = getComponent(defaultProps)
        const homePageLink = getByRole('link', {
            name: defaultProps.page,
        })
        fireEvent.click(homePageLink)
        expect(defaultProps.setSelectedPage).toHaveBeenCalledWith(
            defaultProps.page.toLowerCase()
        )
    })
})
