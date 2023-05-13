import { fireEvent, customRender, type RenderResult } from '../../utils/testing'
import Button, { type IButton } from '.'

const ButtonName = 'Button Component'
const className = 'button-component'
const ArialLabel = 'labelledBy'
const ButtonTestId = className

jest.mock('@mui/material/styles/useTheme', () =>
    jest.fn().mockReturnValue({
        palette: {
            buttonSpinner: {
                contained: '#000000',
                outlined: '#ffffff',
                text: '#000000',
            },
        },
    })
)

const defaultProps: IButton = {
    text: 'Button Component',
    onClick: jest.fn(),
}

const getComponent = (defaultProps: IButton): RenderResult =>
    customRender(<Button {...defaultProps} />)

describe('Button', (): void => {
    it('Renders Correctly', (): void => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('Displays text child of the button', (): void => {
        const { container } = getComponent(defaultProps)
        expect(container).toHaveTextContent(ButtonName)
    })

    it('Calls onClick function when clicked', (): void => {
        const { getByRole } = getComponent(defaultProps)
        fireEvent.click(getByRole('button', { name: defaultProps.text }))
        expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('Disables button when clicked', (): void => {
        const { getByRole } = getComponent({ ...defaultProps, disabled: true })
        fireEvent.click(getByRole('button', { name: defaultProps.text }))
        expect(defaultProps.onClick).toHaveBeenCalledTimes(0)
    })

    it('Sets arial label attribute correctly', (): void => {
        const { getByLabelText } = getComponent({
            ...defaultProps,
            'aria-label': ArialLabel,
        })

        expect(getByLabelText(ArialLabel)).toBeInTheDocument()
    })

    it('It sets type attribute correctly', (): void => {
        const { getByText } = getComponent({
            ...defaultProps,
            type: 'submit',
        })

        expect(getByText(ButtonName)).toHaveAttribute('type', 'submit')
    })

    it('It sets class name attribute correctly', (): void => {
        const { getByText } = getComponent({
            ...defaultProps,
            className,
        })

        expect(getByText(ButtonName)).toHaveClass(className)
    })

    it('It sets testId attribute correctly', (): void => {
        const { getByTestId } = getComponent({
            ...defaultProps,
            'data-testid': ButtonTestId,
        })
        expect(getByTestId(ButtonTestId)).toBeInTheDocument()
    })
})
