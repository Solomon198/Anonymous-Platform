import { type FC } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { TextArea } from '../../libs/components'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Box>
                <TextArea
                    maxRows={5}
                    minRows={3}
                    placeholder="Minimum 3 rows"
                />
            </Box>
        </Container>
    )
}

export default Playground
