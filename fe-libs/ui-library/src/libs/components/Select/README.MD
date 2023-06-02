## Select

All props defined on MUI is applicable to this select component.

-   **`Note:`** You must wrap your application in a MUI Provider

-   **`Note`** The select component is very generic in the sense that it does not constrain you from additional extension or customization. As the aim is to add functionality that enable us achieve our desired UI, make sure the component is completely customizable and make sure the component is tested base on it core functionality.

## Button Props

| props | value                         | description                       |
| ----- | ----------------------------- | --------------------------------- |
| data  | {label:string,value:string}[] | data to display as select options |

## Example

```js
import { type FC } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Select from '../../libs/components/Select'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import { useTheme } from '@mui/material'

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
                <Select
                    disabled
                    onMouseDown={() => {
                        alert('hey')
                    }}
                    IconComponent={KeyboardArrowDownIcon}
                    data={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                    style={{ borderRadius: 50 }}
                />
            </Box>
        </Container>
    )
}

export default Playground
```
