import { customRender, type RenderResult, fireEvent } from '../../utils/testing'
import Text, { type TTypographyProps } from '.'

const textContent = 'Dixre'
const onClick = jest.fn()

const getComponent = (defaultProps?: TTypographyProps): RenderResult =>
    customRender(<Text {...defaultProps}>{textContent}</Text>)

// The tests makes sure this component renders without any error correctly.
describe('Loader-Component', (): void => {
    it('Renders Correctly', (): void => {
        const { container } = getComponent({})
        expect(container).toBeInstanceOf(HTMLElement)
        expect(container).toBeTruthy()
        expect(container).toBeInTheDocument()
    })

    it('Renders text content correctly', (): void => {
        const { getByText } = getComponent()
        expect(getByText(textContent)).toBeInTheDocument()
    })

    it('Should be clickable', (): void => {
        const { getByText } = getComponent({ onClick })
        fireEvent.click(getByText(textContent))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should allow className to be added to the component', (): void => {
        const { getByText } = getComponent({ className: 'text' })
        expect(getByText(textContent)).toHaveClass('text')
    })

    it('should allow us to set title attribute or any attribute correctly', (): void => {
        const { getByText } = getComponent({ title: 'text title' })
        expect(getByText(textContent)).toHaveAttribute('title', 'text title')
    })
})
