import { type FC } from 'react'
import { TestButton } from 'libs/components'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box width={300}>
                <TestButton
                    fullWidth
                    variant="contained"
                    text="Sample"
                    color="primary"
                />
            </Box>
        </Container>
    )
}

export default Playground
