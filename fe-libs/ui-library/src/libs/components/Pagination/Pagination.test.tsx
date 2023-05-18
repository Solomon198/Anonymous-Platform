import { customRender, type RenderResult, fireEvent } from '../../utils/testing'
import Pagination, { type IPagination } from '.'

const className = 'pagination-component'
const ArialLabel = 'labelledBy'
const PaginationTestId = className

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

const defaultProps: IPagination = {
    'data-testid': PaginationTestId,
    count: 10,
    onClick: jest.fn(),
    onChange: jest.fn(),
}

const getComponent = (defaultProps: IPagination): RenderResult =>
    customRender(<Pagination {...defaultProps} />)

describe('Button', (): void => {
    it('Renders Correctly', (): void => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('Displays Pagination correctly skipping and replacing 6 - 9 with elipses', (): void => {
        const { getByText, queryByText } = getComponent(defaultProps)
        expect(getByText(1)).toBeInTheDocument()
        expect(getByText(2)).toBeInTheDocument()
        expect(getByText(3)).toBeInTheDocument()
        expect(getByText(4)).toBeInTheDocument()
        expect(getByText(5)).toBeInTheDocument()
        expect(getByText(10)).toBeInTheDocument()
        expect(getByText(10)).toBeInTheDocument()
        expect(queryByText(9)).toBeNull()
        expect(queryByText(6)).toBeNull()
        expect(queryByText(8)).toBeNull()
        expect(queryByText(7)).toBeNull()
    })

    it('Calls onClick and onChange function when button with value 1 is clicked', (): void => {
        const { getByText } = getComponent(defaultProps)
        fireEvent.click(getByText('1'))
        expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
        expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
    })

    it('Should not call onClick or onChange when disabled', (): void => {
        const { getByText } = getComponent({ disabled: true, count: 10 })
        fireEvent.click(getByText('2'))
        expect(defaultProps.onClick).toHaveBeenCalledTimes(0)
        expect(defaultProps.onChange).toHaveBeenCalledTimes(0)
    })

    it('Sets arial label attribute correctly', (): void => {
        const { getByLabelText } = getComponent({
            ...defaultProps,
            'aria-label': ArialLabel,
        })

        expect(getByLabelText(ArialLabel)).toBeInTheDocument()
    })

    it('It sets testId attribute correctly', (): void => {
        const { getByTestId } = getComponent({
            ...defaultProps,
        })
        expect(getByTestId(PaginationTestId)).toBeInTheDocument()
    })

    it('It sets title attribute correctly', (): void => {
        const { getByTestId } = getComponent({
            ...defaultProps,
            title: 'pagination',
        })

        expect(getByTestId(PaginationTestId)).toHaveAttribute(
            'title',
            'pagination'
        )
    })

    it('It sets class name attribute correctly', (): void => {
        const { getByTestId } = getComponent({
            ...defaultProps,
            className,
        })

        expect(getByTestId(PaginationTestId)).toHaveClass(className)
    })
})
