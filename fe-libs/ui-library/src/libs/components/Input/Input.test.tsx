import { customRender, type RenderResult, fireEvent } from '../../utils/testing'
import Input, { type InputProps } from '.'

const mockOnChange = jest.fn()

const defaultProps: InputProps = {
    onChange: mockOnChange,
}
const placeholder = 'Enter biography'
const inputText = 'Searching Tutorials'

const getComponent = (defaultProps: InputProps): RenderResult =>
    customRender(<Input {...defaultProps} />)

describe('Input', (): void => {
    it('Renders Correctly', (): void => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('should ensure the input is in the document', (): void => {
        const { getByPlaceholderText } = getComponent({
            ...defaultProps,
            placeholder,
        })
        const textArea = getByPlaceholderText(placeholder)
        expect(textArea).toBeInTheDocument()
    })

    it('should ensure user can type into the Input field', (): void => {
        const { getByPlaceholderText } = getComponent({
            ...defaultProps,
            placeholder,
        })
        const textArea = getByPlaceholderText(placeholder) as any
        fireEvent.change(textArea, { target: { value: inputText } })

        expect(textArea.value).toBe(inputText)
    })

    it('should ensure onChange is called when the user types', (): void => {
        const { getByPlaceholderText } = getComponent({
            ...defaultProps,
            placeholder,
        })
        const textArea = getByPlaceholderText(placeholder) as any
        fireEvent.change(textArea, { target: { value: inputText } })

        expect(mockOnChange).toBeCalled()
    })
})
