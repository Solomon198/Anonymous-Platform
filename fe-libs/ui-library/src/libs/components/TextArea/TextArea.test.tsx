import { customRender, type RenderResult, fireEvent } from '../../utils/testing'
import TextArea, { type ITextArea } from '.'

const mockOnChange = jest.fn()

const defaultProps: ITextArea = {
    onChange: mockOnChange,
}
const placeholder = 'Enter biography'
const textAreaText = 'My name is Dixre'

const getComponent = (defaultProps: ITextArea): RenderResult =>
    customRender(<TextArea {...defaultProps} />)

describe('TextArea', (): void => {
    it('Renders Correctly', (): void => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('should ensure the textArea is in the document', (): void => {
        const { getByPlaceholderText } = getComponent({
            ...defaultProps,
            placeholder,
        })
        const textArea = getByPlaceholderText(placeholder)
        expect(textArea).toBeInTheDocument()
    })

    it('should ensure user can type into the textArea', (): void => {
        const { getByPlaceholderText } = getComponent({
            ...defaultProps,
            placeholder,
        })
        const textArea = getByPlaceholderText(placeholder) as any
        fireEvent.change(textArea, { target: { value: textAreaText } })

        expect(textArea.value).toBe(textAreaText)
    })

    it('should ensure onChange is called when the user types', (): void => {
        const { getByPlaceholderText } = getComponent({
            ...defaultProps,
            placeholder,
        })
        const textArea = getByPlaceholderText(placeholder) as any
        fireEvent.change(textArea, { target: { value: textAreaText } })

        expect(mockOnChange).toBeCalled()
    })
})
