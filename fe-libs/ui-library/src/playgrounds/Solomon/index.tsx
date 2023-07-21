import { type FC } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Input } from '../../libs/components'
import { IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'

const Playground: FC = () => {
    // You can wrap this in a styled component if you want
    const IconRightComponent = (
        <IconButton
            style={{
                background: 'purple',
                borderRadius: 100,
                width: 25,
                height: 25,
                marginRight: 10,
            }}
            aria-label="toggle password visibility"
        >
            <Search fontSize="small" style={{ color: 'white' }} />
        </IconButton>
    )

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Box sx={{ display: 'flex', '& > * + *': { ml: 1 }, width: 500 }}>
                <Input
                    style={{ width: 500, borderRadius: 30 }}
                    placeholder="Search with Icon"
                    endAdornment={IconRightComponent}
                    required
                    error={true}
                    name="Email Address"
                />
            </Box>
            <Box sx={{ display: 'flex', '& > * + *': { ml: 1 }, width: 500 }}>
                <Input style={{ width: 500 }} placeholder="Input no Icon" />
            </Box>
        </Container>
    )
}

export default Playground
