import { styled } from '@mui/material'
import BgImage from '../../../assets/media/images/image3.jpeg'
import { Text } from '@solex/ui-library'

export const BackgroundImage = styled('div')({
    backgroundImage: `url(${BgImage})`,
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
