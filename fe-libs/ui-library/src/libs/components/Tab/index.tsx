import Box from '@mui/material/Box'
import { type SxProps } from '@mui/material'
import MaterialTab, { type TabProps } from '@mui/material/Tab'
import TabContext, { type TabContextProps } from '@mui/lab/TabContext'
import TabList, { type TabListProps } from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

interface ITabHeaderItems {
    value: string
    label: string
}

interface IMaterialTab extends TabProps {
    activeTabColor?: string

    tabColor?: string
}

export interface ITab {
    tabHeader: ITabHeaderItems[]
    onChange: (value: string) => void
    tabContextProps: TabContextProps
    tabListProps?: Omit<TabListProps, 'onChange'>
    tabProps?: Omit<IMaterialTab, 'key' | 'value' | 'label'>
    sx?: SxProps
    children?: any
}

const Tab = (props: ITab): JSX.Element => {
    const {
        tabHeader,
        children,
        onChange,
        tabListProps,
        tabContextProps,
        tabProps,
        sx,
    } = props

    const tabSx = tabProps?.sx === null ? tabProps?.sx : {}
    const {
        activeTabColor = '',
        tabColor = '',
        ...restTabProps
    } = tabProps as IMaterialTab

    return (
        <Box sx={sx}>
            <TabContext {...tabContextProps}>
                <Box>
                    <TabList {...tabListProps} aria-label="tabList">
                        {tabHeader.map(({ value, label }) => (
                            <MaterialTab
                                key={value}
                                label={label}
                                onClick={() => {
                                    onChange(value)
                                }}
                                value={value}
                                {...restTabProps}
                                sx={{
                                    ...{
                                        '&.Mui-selected': {
                                            color: activeTabColor,
                                        },
                                    },
                                    color: tabColor,
                                    ...tabSx,
                                }}
                            />
                        ))}
                    </TabList>
                </Box>
                {children}
            </TabContext>
        </Box>
    )
}
export { TabPanel }
export default Tab
