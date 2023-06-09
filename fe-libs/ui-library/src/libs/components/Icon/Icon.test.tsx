import { customRender, type RenderResult, Icon } from '../../utils/testing'
import { type IBaseIconProps } from '.'

const defaultProps: IBaseIconProps = {
    name: 'ArrowUp',
    color: 'primary',
    size: 100,
}

const getComponent = (defaultProps: IBaseIconProps): RenderResult =>
    customRender(<Icon {...defaultProps} />)

// The tests makes sure this component renders without any error correctly.
describe('Icon-Component', (): void => {
    it('Renders', (): void => {
        const { container } = getComponent(defaultProps)

        expect(container).toBeInstanceOf(HTMLElement)
        expect(container).toBeTruthy()
        expect(container).toBeInTheDocument()
    })
})
