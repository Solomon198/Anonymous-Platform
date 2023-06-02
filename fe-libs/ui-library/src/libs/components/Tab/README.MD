## Tab

All props defined on MUI is applicable to this `Tab` component but not applicable directly Since the we have simplified everything to a simple configuration so that our code can be clean and we can focus on building logics.

-   **`Note:`** You must wrap your application in a MUI Provider

## Tab Props

| props | value | description |
| ----- | ----- | ----------- | 
| tabHeader | {label:"",value:""}[] | The tabHeader is an array of object with `value` and `label`. The label defines what you want to be on the tab and the value is the unique identifier of the tab which is used for the tab functionality which includes indicator and hiding and showing tabs. |
| onChange | func(value:string) | function that gets the value of the clicked tab so we can set on a state which is connected to the value of `TabContext` |
| tabContextProps | object | All MUI props passed to `TabContext` can be passed to this object to allow for further Customizations |
| tabListProps? | object | All MUI props passed to `TabList` can be passed to this object to allow for further Customizations |
| tabProps? | object | object | All MUI props passed to `Tab` can be passed to this object to allow for further Customizations but you can't set `key`, `value` and `label` as defined on MUI because we are iterating and setting those so we removed it with typescript for safty. We have added custom props to the `Tab` props so we can easily change the color of the activeSelected tab with `activeTabColor` and also set the inactive tab colors with `tabColor` |
| sx? | sxProps | This is a custom style you can use to controll the width of the whole Tab or it width or area it covers. The element that this object is passed to is a MUI `Box` |

## Example

```js
import { type FC, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Tab, TabPanel, Text } from '../../libs/components'

const Playground: FC = () => {
    const [value, setValue] = useState < string > '1'
    const handleChange = (value: string): void => {
        setValue(value)
    }
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Box>
                <Tab
                    sx={{ width: '100%', typography: 'body1' }}
                    onChange={handleChange}
                    tabContextProps={{ value }}
                    tabListProps={{ indicatorColor: 'secondary' }}
                    tabHeader={[
                        { label: 'All Courses', value: '1' },
                        { label: 'Free Courses', value: '2' },
                        { label: 'Premium Courses', value: '3' },
                    ]}
                    tabProps={{
                        activeTabColor: 'purple',
                        tabColor: 'purple',
                        style: { textTransform: 'none' },
                    }}
                >
                    <TabPanel value="1">
                        <Text color="primary" variant="h2">
                            All Courses
                        </Text>
                        <Text color="primary" variant="body2">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Sit fugit deleniti cupiditate maxime obcaecati
                            exercitationem amet quibusdam reiciendis nesciunt
                            labore.
                        </Text>
                    </TabPanel>
                    <TabPanel value="2">
                        <Text color="primary" variant="h2">
                            Free Courses
                        </Text>
                        <Text color="primary" variant="body2">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Sit fugit deleniti cupiditate maxime obcaecati
                            exercitationem amet quibusdam reiciendis nesciunt
                            labore.
                        </Text>
                    </TabPanel>
                    <TabPanel value="3">
                        <Text color="primary" variant="h2">
                            Premium Courses
                        </Text>
                        <Text color="primary" variant="body2">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Sit fugit deleniti cupiditate maxime obcaecati
                            exercitationem amet quibusdam reiciendis nesciunt
                            labore.
                        </Text>
                    </TabPanel>
                </Tab>
            </Box>
        </Container>
    )
}

export default Playground
```
