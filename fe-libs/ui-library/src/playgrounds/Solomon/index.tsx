import { type FC } from 'react'
import Container from '@mui/material/Container'
import Text from '../../libs/components/Text'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Text color="primary" variant="h3">
                This works fine H1 Primary
            </Text>
            <Text color="secondary" variant="h2">
                This works fine H2 Secondary
            </Text>
            <Text color="error" variant="h4">
                This works fine H4 Error
            </Text>
            <Text color="primary" variant="overline">
                This works fine primary Overline
            </Text>

            <Text color="primary" variant="subtitle2">
                This works fine primary subtitle2
            </Text>
            <Text color="primary" variant="subtitle1">
                This works fine primary subtitle1
            </Text>
        </Container>
    )
}

export default Playground
