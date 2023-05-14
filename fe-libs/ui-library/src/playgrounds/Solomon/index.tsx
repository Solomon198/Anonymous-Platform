import { type FC } from 'react'
import Container from '@mui/material/Container'
import Rating from '../../libs/components/Rating'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Rating value={3.4} totalCount={1200} />
            <Rating value={5} totalCount={160034345} />
            <Rating totalCount={16033444045} />
        </Container>
    )
}

export default Playground
