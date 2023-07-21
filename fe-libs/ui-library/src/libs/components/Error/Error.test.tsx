import { customRender, type RenderResult } from '../../utils/testing'
import Error, { type IError } from './index'

const defaultProps: IError = {
    name: 'Email Address',
    required: true,
    touched: true,
    error: true,
}

const getComponent = (defaultProps: IError): RenderResult =>
    customRender(<Error {...defaultProps} />)

// The tests makes sure this component renders without any error correctly.
describe('Error-Component', (): void => {
    it('Renders', (): void => {
        const { container } = getComponent(defaultProps)

        expect(container).toBeInstanceOf(HTMLElement)
        expect(container).toBeTruthy()
        expect(container).toBeInTheDocument()
    })

    it('Should Invalid Email Address text when all props are true', (): void => {
        const { getByText } = getComponent(defaultProps)

        expect(getByText('Invalid Email Address')).toBeInTheDocument()
    })

    it('Should not show Invalid Email Address text when at least one prop is not true', (): void => {
        const { queryByText } = getComponent({
            ...defaultProps,
            required: false,
        })

        expect(queryByText('Invalid Email Address')).not.toBeInTheDocument()
    })
})
