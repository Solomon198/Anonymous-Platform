import { Link as NavigationLink } from 'react-router-dom'
import { Text, useTheme } from '@crazy-devz/react-ui-library'

export interface Props {
    page: string
    selectedPage: string
    setSelectedPage: (value: string) => void
}

const Link: React.FC<Props> = ({
    page,
    selectedPage,
    setSelectedPage,
}: Props) => {
    const { palette } = useTheme()
    const lowerCase = page.toLowerCase().replace(/ /g, '')
    const active = page.toLowerCase() === selectedPage.toLowerCase()
    return (
        <NavigationLink
            style={{
                textDecoration: 'none',
                color: 'backgrounds.webSecondary',
            }}
            className={selectedPage}
            to={`/${lowerCase}`}
            onClick={() => {
                setSelectedPage(lowerCase)
            }}
        >
            <Text
                color={{
                    lg: 'backgrounds.webSecondary',
                    md: 'backgrounds.webSecondary',
                    sm: 'backgrounds.webMobile',
                    xs: 'backgrounds.webMobile',
                }}
                style={{ color: active ? palette.error.main : '' }}
                fontWeight="fontWeightBold"
                fontSize={{
                    lg: '18px',
                    md: '15px',
                }}
            >
                {page}
            </Text>
        </NavigationLink>
    )
}

export default Link
