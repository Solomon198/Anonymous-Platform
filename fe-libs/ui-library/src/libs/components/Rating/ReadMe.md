### Rating

The rating component extends the props of MUI Rating component. It has all the test cases covered to ensure the safe usage of the component.

| Props           | value     | description                                                                           |
| --------------- | --------- | ------------------------------------------------------------------------------------- |
| totalCount?     | number    | Total number of views or count usually at the right hand side of the rating component |
| data-testid?    | string    | data testid string to target rating component                                         |
| textFontSize?   | number    | Font size of both texts at the right and left hand side of rating component.          |
| rateColor?      | MUI Color | Color for the value of the rate.                                                      |
| totalCountColor | MUI Color | Value for the color of the total count at the right of the rating component.          |

```js
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
            <Rating />
        </Container>
    )
}

export default Playground
```
