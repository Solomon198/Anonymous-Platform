## Button

All props defined on MUI is applicable to this button component.

-   **`Note:`** You must wrap your application in a MUI Provider

-   **`Note`** the icon and the loader component takes your theme configuration. please take a look at the theme configuration. we tried to handle loader color when variant is `contained`, `outlined` and `text` so that our loader works out of the box. Please take a look at the implementation of this button component.

## Button Props

| props            | value          | description                                   |
| ---------------- | -------------- | --------------------------------------------- |
| loaderSize?      | number         | control loader size                           |
| loaderColor?     | string         | overides theme and gives loader desired color |
| loading?         | boolean        | show or hides loader                          |
| loaderposition?  | `right` `left` | display loader to right or left               |
| textLoaderSpace? | number         | space between loader and text                 |
| data-testid?     | string         | component test id                             |
| text             | string         | text value for component                      |

## Example

```js
import { type FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from 'from-ui-library'
import { FileUpload } from 'from-default-exported-component'

const Playground: FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <Box>
                    <Button
                        textLoaderSpace={1}
                        loading={true}
                        text="Welcome"
                        loaderSize={20}
                        variant="contained"
                        loadingPosition="start"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        textLoaderSpace={1}
                        loading={true}
                        text="Welcome"
                        loaderSize={20}
                        variant="text"
                        loadingPosition="start"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        textLoaderSpace={1}
                        loading={true}
                        text="Welcome"
                        loaderSize={20}
                        variant="outlined"
                        loadingPosition="start"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button text="Welcome" variant="contained" size="large" />
                </Box>
                <Box>
                    <Button text="Welcome" variant="outlined" size="large" />
                </Box>
                <Box>
                    <Button text="Welcome" variant="text" size="large" />
                </Box>
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <Box>
                    <Button
                        style={{ borderRadius: 50 }}
                        textLoaderSpace={1}
                        loading={true}
                        text="Welcome"
                        loaderSize={20}
                        variant="contained"
                        loadingPosition="start"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        style={{ borderRadius: 50 }}
                        textLoaderSpace={1}
                        loading={true}
                        text="Welcome"
                        loaderSize={20}
                        variant="text"
                        loadingPosition="start"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        style={{ borderRadius: 50 }}
                        textLoaderSpace={1}
                        loading={true}
                        text="Welcome"
                        loaderSize={20}
                        variant="outlined"
                        loadingPosition="start"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        style={{ borderRadius: 50 }}
                        text="Welcome"
                        variant="contained"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        style={{ borderRadius: 50 }}
                        text="Welcome"
                        variant="outlined"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        style={{ borderRadius: 50 }}
                        text="Welcome"
                        variant="text"
                        size="large"
                    />
                </Box>
            </Container>

            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <Box>
                    <Button
                        endIcon={<FileUpload />}
                        text="Welcome"
                        variant="contained"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        startIcon={<FileUpload />}
                        text="Welcome"
                        variant="text"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        startIcon={<FileUpload />}
                        text="Welcome"
                        variant="outlined"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        endIcon={<FileUpload />}
                        style={{ borderRadius: 50 }}
                        text="Welcome"
                        variant="contained"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        endIcon={<FileUpload />}
                        style={{ borderRadius: 50 }}
                        text="Welcome"
                        variant="outlined"
                        size="large"
                    />
                </Box>
                <Box>
                    <Button
                        startIcon={<FileUpload />}
                        style={{ borderRadius: 50 }}
                        text="Welcome"
                        variant="text"
                        size="large"
                    />
                </Box>
            </Container>
        </Container>
    )
}

export default Playground
```
