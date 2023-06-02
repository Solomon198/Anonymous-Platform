## Pagination

All props defined on MUI is applicable to this Pagination component.

-   **`Note:`** You must wrap your application in a MUI Provider

-   **`Note`** Works heavily with theming component.
-   **`Note`** All props that accept color accepts color names, hexadecimal, theme color values , rgba etc.

## Pagination Props

| props                  | value       | description                                                                                     |
| ---------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| paginationItemSx?      | MUI SxProps | customize paginationItem which is represented by each of the box holding the pagination numbers |
| paginationItemBgColor? | string      | Pagination item background color                                                                |
| selectedBgColor?       | string      | Set the active or selected item background color                                                |
| selectedTextColor?     | string      | set the text color for selected or active item                                                  |
| data-testid?           | string      | component test id                                                                               |

## Example

```js
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
```
