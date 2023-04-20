##### Example:

> All props defined on MUI can be used with custom component

> Note: You must wrap your application in a MUI Provider

```js
import { Grid, Box } from '@mui/material'
;<Box
    sx={{
        'button, submit': {
            margin: '5px',
        },
    }}
>
    <Grid>
        <Button variant="accent" size="small">
            Small
        </Button>

        <Button variant="ghostGradient" size="medium">
            Medium
        </Button>

        <Button variant="success" size="large">
            Large
        </Button>

        <Box width={1 / 2}>
            <Button fullWidth>Full Width</Button>
        </Box>
    </Grid>
</Box>
```
