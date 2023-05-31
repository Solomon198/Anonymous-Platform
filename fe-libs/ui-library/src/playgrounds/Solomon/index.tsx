import { type FC } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Select from '../../libs/components/Select'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Box width={200}>
                <Select
                    IconComponent={KeyboardArrowDownIcon}
                    data={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                    style={{ borderRadius: 50 }}
                />
            </Box>
        </Container>
    )
}

export default Playground
