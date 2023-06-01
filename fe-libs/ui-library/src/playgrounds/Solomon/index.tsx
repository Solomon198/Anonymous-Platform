import { type FC } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { CheckBox } from '../../libs/components'
import { BpCheckedIcon, BpIcon } from '../../components/customCheckBoxIcons'

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
                <CheckBox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />
            </Box>
            <Box width={200}>
                <CheckBox />
            </Box>
        </Container>
    )
}

export default Playground
