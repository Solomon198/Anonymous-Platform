import { Link } from 'react-router-dom'
import { Text } from '@dixre/ui-library'

interface Props {
    page: string
    selectedPage: string
    setSelectedPage: (value: string) => void
}

const Links: React.FC<Props> = ({
    page,
    selectedPage,
    setSelectedPage,
}: Props) => {
    const lowerCase = page.toLowerCase().replace(/ /g, '')
    return (
        <Link
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
                    xs: 'backgrounds.webMobile',
                }}
                fontWeight="fontWeightBold"
            >
                {page}
            </Text>
        </Link>
    )
}

export default Links