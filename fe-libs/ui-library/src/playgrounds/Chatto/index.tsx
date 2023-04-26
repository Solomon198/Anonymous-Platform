import { type FC } from 'react'
import { Card } from 'libs/components'
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
                <Card elevation={3} sx={{ p: 2 }}>
                    This is the content of the card.
                </Card>
            </Box>
        </Container>
    )
}

export default Playground
