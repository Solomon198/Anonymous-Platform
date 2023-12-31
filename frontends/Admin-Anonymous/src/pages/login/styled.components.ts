import { styled } from '@mui/material'
import { Text } from '@crazy-devz/react-ui-library'

export const BackgroundImage = styled('div')({
    backgroundImage: `url(/assets/media/images/image3.jpeg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
})

export const FormContainer = styled('div')({
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f4f4f4',
})

export const Logo = styled(Text)({
    marginBottom: 20,
    fontSize: 25,
    fontWeight: '500',
})
