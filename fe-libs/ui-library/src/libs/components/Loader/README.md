##### Example:

-   The loader component uses the material UI loaders combine which is the `LinearProgress` and the `CircularProgresss`. The generic component accepts the `loader` props with value of `Linear` or `Circular` and extends the `LinearProgressProps` and the `CircularProgressProps`. When `loader` props is passed the right component is returned. `Note` that all MUI props for Circular and Linear Progress can be passed to this generic component.

## Example

```js
import { type FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Loader } from '../../libs/components/Loader'

const YourComponent: FC = () => {
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
            <Box sx={{ width: '100%' }}>
                <Loader
                    thickness={10}
                    type="Linear"
                    variant="indeterminate"
                    color="primary"
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Loader
                    type="Linear"
                    variant="determinate"
                    color="secondary"
                    value={50}
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Loader
                    size={50}
                    type="Circular"
                    variant="determinate"
                    color="primary"
                    value={50}
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Loader
                    type="Circular"
                    variant="indeterminate"
                    color="success"
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Loader
                    size={50}
                    type="Circular"
                    variant="indeterminate"
                    color="secondary"
                    value={50}
                />
            </Box>
        </Container>
    )
}

export default YourComponent
```
