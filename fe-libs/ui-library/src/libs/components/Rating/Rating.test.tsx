import { customRender, type RenderResult, fireEvent } from '../../utils/testing'
import Rating, { type IRating } from '.'
import { formatNumber } from './utils'

const rate = 4.3
const totalCount = 1200
const dataTestId = 'rating-id'
const onClick = jest.fn()

const getComponent = (defaultProps?: IRating): RenderResult =>
    customRender(<Rating {...defaultProps} />)

// The tests makes sure this component renders without any error correctly.
describe('Loader-Component', (): void => {
    it('Renders Correctly', (): void => {
        const { container } = getComponent({})
        expect(container).toBeInstanceOf(HTMLElement)
        expect(container).toBeTruthy()
        expect(container).toBeInTheDocument()
    })

    it('Should confirm that the onClick function is called', (): void => {
        const { getByTestId } = getComponent({
            onClick,
            'data-testid': dataTestId,
        })
        fireEvent.click(getByTestId(dataTestId))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('Should disable the rating from beign clicked when disabled is passed', (): void => {
        const { getByTestId } = getComponent({
            onClick: jest.fn(),
            'data-testid': dataTestId,
            disabled: true,
        })
        fireEvent.click(getByTestId(dataTestId))
        expect(onClick).toHaveBeenCalledTimes(0)
    })

    it('Should render the rate when passed', (): void => {
        const { getByText } = getComponent({ value: rate })
        expect(getByText(rate)).toBeInTheDocument()
    })

    it('Should ensure the formatNumber function works and return number in 1k, ', (): void => {
        expect(formatNumber(totalCount)).toEqual('1.2K')
    })

    it('Should render number of count or views in term of 1k e.t.c', (): void => {
        const { getByText } = getComponent({ totalCount })
        expect(getByText(formatNumber(totalCount))).toBeInTheDocument()
    })
})
