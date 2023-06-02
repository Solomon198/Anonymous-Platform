# Text

This text component is just an extention of the MUI Typography, it is heavily tested against major usages.

-   **`Note`** This `Text` Component has all Material UI props. Feel free to use any props from MUI props, its available.

## Example

```js
import { type FC } from 'react'
import Container from '@mui/material/Container'
import Text from '../../libs/components/Text'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
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
```
