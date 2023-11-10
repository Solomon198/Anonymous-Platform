import {
    customRender,
    type RenderResult,
    fireEvent,
    within,
} from '../../utils/testing'
import Select, { type ISelectProps } from '.'

const ArialLabel = 'labelledBy'
const defaultPlaceholder = 'Select'
const placeholder = 'DropDown'
const mockMouseDown = jest.fn()

const defaultProps: ISelectProps = {
    data: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ],
    onMouseDown: mockMouseDown,
}

const getComponent = (defaultProps: ISelectProps): RenderResult =>
    customRender(<Select {...defaultProps} />)

describe('Button', (): void => {
    it('Renders Correctly', (): void => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('Should display the specified placeholder when rendered first', (): void => {
        const { getByRole } = getComponent({
            ...defaultProps,
            placeholder,
        })
        expect(getByRole('combobox')).toHaveTextContent(placeholder)
    })

    it('Should display default placeholder when a placeholder is not specified', (): void => {
        const { getByRole } = getComponent({
            ...defaultProps,
        })
        expect(getByRole('combobox')).toHaveTextContent(defaultPlaceholder)
    })

    it('Should select Option correctly', (): void => {
        const { getByRole } = getComponent(defaultProps)
        fireEvent.mouseDown(getByRole('combobox'))
        const listBox = within(getByRole('listbox'))
        const option = defaultProps.data[0].label
        fireEvent.click(listBox.getByRole('option', { name: option }))
        expect(getByRole('combobox')).toHaveTextContent(option)
    })

    it('Sets arial label attribute correctly', (): void => {
        const { getByLabelText } = getComponent({
            ...defaultProps,
            'aria-label': ArialLabel,
        })

        expect(getByLabelText(ArialLabel)).toBeInTheDocument()
    })
})
