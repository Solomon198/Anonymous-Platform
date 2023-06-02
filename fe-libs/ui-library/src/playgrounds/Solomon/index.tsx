import { type FC, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Tab, TabPanel, Text } from '../../libs/components'

const Playground: FC = () => {
    const [value, setValue] = useState<string>('1')
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
