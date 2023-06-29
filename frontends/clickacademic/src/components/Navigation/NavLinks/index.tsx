import type React from 'react'
import Links from '../Link'
import { useNavTranslatedValues } from '../../../utils/hooks'
import { ListItemWrapper } from '../ListItemWrapper'

interface Props {
    selectedPage: string
    setSelectedPage: (value: string) => void

    isMobile?: boolean
}

const NavLinks: React.FC<Props> = ({
    selectedPage,
    setSelectedPage,
    isMobile,
}): JSX.Element => {
    const links = useNavTranslatedValues()
    return (
        <>
            {links.map((link, index) => (
                <ListItemWrapper isMobile={isMobile} key={index}>
                    <Links
                        page={link}
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                </ListItemWrapper>
            ))}
        </>
    )
}

export default NavLinks
