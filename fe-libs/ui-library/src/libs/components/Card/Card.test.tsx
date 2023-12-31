import { customRender, type RenderResult } from '../../utils/testing'
import Card, { type ICard } from '.'

const defaultProps: ICard = {
    children: 'Card Content',
}

const getComponent = (props: ICard): RenderResult =>
    customRender(<Card {...props} />)

describe('Card', () => {
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
