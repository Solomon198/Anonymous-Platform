import { customRender } from 'libs/utils/testing'
import GenericCard, { IGenericCard } from '.'

const defaultProps: IGenericCard = {
    children: 'Card Content',
}

const getComponent = (props: IGenericCard) =>
    customRender(<GenericCard {...props} />)

describe('GenericCard', () => {
    it('Renders', () => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('Displays children as content', () => {
        const { container } = getComponent(defaultProps)
        expect(container).toHaveTextContent('Card Content')
    })

    it('Passes through other MUI CardProps', () => {
        const testElevation = 12
        const { container } = getComponent({
            ...defaultProps,
            elevation: testElevation,
        })

        const cardElement = container.querySelector('.MuiPaper-elevation12')
        expect(cardElement).toBeInTheDocument()
    })
})
