import { type FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '../../libs/components/Button'
import { FileUpload } from '../../libs/components/Icon/defaultIconImport.unicorn'

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
