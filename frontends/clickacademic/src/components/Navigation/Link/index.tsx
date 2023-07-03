import { Link as NavigationLink } from 'react-router-dom'
import { Text } from '@dixre/ui-library'

interface Props {
    page: string
    selectedPage: string
    setSelectedPage: (value: string) => void
}

const Link: React.FC<Props> = ({
    page,
    selectedPage,
    setSelectedPage,
}: Props) => {
    const lowerCase = page.toLowerCase().replace(/ /g, '')
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
