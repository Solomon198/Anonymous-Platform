import { customRender, type RenderResult, fireEvent } from '../../utils/testing'
import Tab, { TabPanel, type ITab } from '.'

const mockOnChange = jest.fn()
const defaultProps: ITab = {
    sx: { width: '100%', typography: 'body1' },
    onChange: mockOnChange,
    tabContextProps: { value: '1' },
    tabHeader: [
        { label: 'All Courses', value: '1' },
        { label: 'Free Courses', value: '2' },
        { label: 'Premium Courses', value: '3' },
    ],
    tabProps: {
        activeTabColor: 'purple',
        tabColor: 'purple',
        style: { textTransform: 'none' },
    },
}

const getComponent = (props: ITab): RenderResult =>
    customRender(
        <Tab {...props}>
            <TabPanel value="1">Panel 1</TabPanel>
            <TabPanel value="2">Panel 2</TabPanel>
            <TabPanel value="3">Panel 3</TabPanel>
        </Tab>
    )
describe('Tab', () => {
    it('Renders', () => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('Should show only Panel 1 as value in TabCtx is 1', () => {
        const { getByText, queryByText } = getComponent(defaultProps)
        expect(getByText(/Panel 1/i)).toBeInTheDocument()
        expect(queryByText(/Panel 2/i)).toBeNull()
        expect(queryByText(/Panel 3/i)).toBeNull()
    })

    it('Should show only Panel 2 as value in TabCtx is 2', () => {
        const { getByText, queryByText } = getComponent({
            ...defaultProps,
            tabContextProps: { value: '2' },
        })
        expect(queryByText(/Panel 1/i)).toBeNull()
        expect(getByText(/Panel 2/i)).toBeInTheDocument()
        expect(queryByText(/Panel 3/i)).toBeNull()
    })

    it('Should ensure Onchange is called with approriate value as expected', () => {
        const { getByRole } = getComponent(defaultProps)
        const tab = getByRole('tab', { name: 'All Courses' })
        fireEvent.click(tab)
        expect(mockOnChange).toHaveBeenCalledTimes(1)
        expect(mockOnChange).toHaveBeenCalledWith('1')
    })
})
