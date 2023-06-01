import { customRender, fireEvent, type RenderResult } from '../../utils/testing'
import CheckBox, { type ICheckBoxProps } from '.'

const dataTestId = 'checkbox'
const mockOnClick = jest.fn()
const mockOnChange = jest.fn()
const defaultProps: ICheckBoxProps = {
    'data-testid': dataTestId,
    onClick: mockOnClick,
    onChange: mockOnChange,
}

const getComponent = (props: ICheckBoxProps): RenderResult =>
    customRender(<CheckBox {...props} />)
describe('CheckBox', () => {
    it('Renders', () => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('Should check that onclick is called and checked after clicked', () => {
        const { getByRole } = getComponent(defaultProps)
        const checkBox = getByRole('checkbox')
        fireEvent.click(checkBox)
        expect(mockOnClick).toHaveBeenCalledTimes(1)
        expect((checkBox as any).checked).toBe(true)
    })

    it('Should check that onChange is called and checked after mousedown', () => {
        const { getByRole } = getComponent(defaultProps)
        const checkBox = getByRole('checkbox')
        fireEvent.click(checkBox)
        expect(mockOnChange).toHaveBeenCalledTimes(1)
        expect((checkBox as any).checked).toBe(true)
    })
})
