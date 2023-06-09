import React from 'react'
import Playground from './playgrounds'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import useTheme from '@mui/material/styles/useTheme'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import ImageIcon from '@mui/icons-material/Image'
import { useNavigate, Outlet } from 'react-router-dom'

const App: React.FC = () => {
    const { toggle, palette } = useTheme()
    const navigate = useNavigate()
    return (
        <Box
            height="100vh"
            sx={{
                bgcolor: 'background.default',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {/* SIDEMENU */}
            <Box sx={{ bgcolor: 'background.paper' }} width="20%">
                <Box height="10vh">
                    <IconButton
                        onClick={() => {
                            toggle()
                        }}
                        sx={{ bgcolor: 'background.default', margin: 1 }}
                    >
                        {palette.mode === 'light' ? (
                            <Brightness4Icon />
                        ) : (
                            <Brightness7Icon />
                        )}
                    </IconButton>
                </Box>
                <Box height="70vh">
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                        }}
                    >
                        {/* RENDERING DEVS */}
                        {Object.keys(Playground).map((dev, index) => (
                            <ListItem
                                onClick={() => {
                                    navigate(`/playground-${dev.toLowerCase()}`)
                                }}
                                key={index}
                                sx={{
                                    bgcolor: 'background.default',
                                    margin: 1,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography
                                    sx={{ color: 'text.primary' }}
                                    variant="h6"
                                >
                                    {dev}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box
                    height="20vh"
                    sx={{
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <span role="img" aria-label="dizzy">
                        💫
                    </span>
                    <Typography
                        sx={{ color: 'text.primary' }}
                        mb="3"
                        variant="h6"
                    >
                        UI Library
                    </Typography>
                    <Typography component="p" sx={{ color: 'text.primary' }}>
                        <Typography
                            component="span"
                            mb={2}
                            sx={{ color: 'text.primary' }}
                            role="img"
                            aria-label="joystick"
                        >
                            🕹️
                        </Typography>{' '}
                        Choose your playground
                    </Typography>
                </Box>
            </Box>

            {/* PLAYGROUND SECTION
             */}

            <Outlet />
        </Box>
    )
}

export default App
