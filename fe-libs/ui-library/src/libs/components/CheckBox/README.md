## CheckBox

All props defined on MUI is applicable to this checkbox component.

-   **`Note:`** You must wrap your application in a MUI Provider

-   **`Note`** The checkbox component is very generic in the sense that it does not constrain you from additional extension or customization. As the aim is to add functionality that enable us achieve our desired UI, make sure the component is completely customizable and make sure the component is tested base on it core functionality. You can update the icon passed to this component to achieve the example on the figma. checkout the `src/components/customCheckBoxIcons`

## Button Props

| props       | value  | description                          |
| ----------- | ------ | ------------------------------------ |
| data-testid | string | data testid for the select component |

```js
import { type FC } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { CheckBox } from '../../libs/components'
import { BpCheckedIcon, BpIcon } from '../../components/customCheckBoxIcons'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Box width={200}>
                <CheckBox icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />
            </Box>
        </Container>
    )
}

export default Playground
```
