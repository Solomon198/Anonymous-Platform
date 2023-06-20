import React from 'react'
import Links from './Links'
import { type SelectedPage } from './type'
import { useTranslation } from 'react-i18next'

interface Props {
    selectedPage: SelectedPage
    setSelectedPage: (value: SelectedPage) => void
}

const NavLinks: React.FC<Props> = ({ selectedPage, setSelectedPage }) => {
    const { t } = useTranslation()
    const links = [
        `${t('common:navigationWidget:home')}`,
        `${t('common:navigationWidget:features')}`,
        `${t('common:navigationWidget:courses')}`,
        `${t('common:navigationWidget:about')}`,
        `${t('common:navigationWidget:support')}`,
        `${t('common:navigationWidget:login')}`
    ]
    
    return (
        <>
            {links.map((link, index) => (
                <Links
                    key={index}
                    page={link}
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
            ))}
        </>
    )
}

export default NavLinks
