import { type FC } from 'react'
import Container from '@mui/material/Container'
import { Pagination } from '../../libs/components'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Pagination color="primary" variant="text" count={10} />
        </Container>
    )
}

export default Playground
