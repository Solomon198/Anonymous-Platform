import { customRender, type RenderResult } from '../../utils/testing'
import { Loader } from '../Loader'
import { type ILoaderCircularProps, type ILoaderLinearProps } from '.'

type loaderType = ILoaderCircularProps | ILoaderLinearProps

jest.mock('../Loader', () => ({
    Loader: (props: loaderType) => <div>{props.type}</div>,
}))

const defaultProps: loaderType = {
    type: 'Circular',
}

const getComponent = (defaultProps: loaderType): RenderResult =>
    customRender(<Loader {...defaultProps} />)

// The tests makes sure this component renders without any error correctly.
describe('Loader-Component', (): void => {
    it('Renders', (): void => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
        expect(container).toBeTruthy()
        expect(container).toBeInTheDocument()
    })

    it('Circular props should be passed', (): void => {
        const { getByText } = getComponent(defaultProps)
        expect(getByText('Circular')).toBeInTheDocument()
    })

    it('Linear props should be passed', (): void => {
        const { getByText } = getComponent({ type: 'Linear' })
        expect(getByText('Linear')).toBeInTheDocument()
    })
})
