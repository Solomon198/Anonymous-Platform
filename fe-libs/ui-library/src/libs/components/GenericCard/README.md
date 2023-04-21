# GenericCard

`GenericCard` is a simple wrapper component around Material-UI's `Card` component, which adds custom props and retains all Material-UI `Card` props.

## Props

-   `children: React.ReactNode`: The content to be displayed inside the card.
-   All other Material-UI `Card` props are also supported. For a complete list of supported props, refer to the [official Material-UI Card documentation](https://mui.com/api/card/).

## Example

```jsx
import React from 'react'
import { Box } from '@mui/material'
import GenericCard from './GenericCard'

const App = () => {
    return (
        <Box sx={{ m: 2 }}>
            <GenericCard elevation={3} sx={{ p: 2 }}>
                This is the content of the card.
            </GenericCard>
        </Box>
    )
}

export default App
```
