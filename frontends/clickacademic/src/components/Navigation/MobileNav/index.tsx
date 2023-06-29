import type React from 'react'
import { useState } from 'react'
import { Drawer, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Text } from '@dixre/ui-library'
import { useTranslation } from 'react-i18next'
import NavLinks from '../NavLinks'

interface Props {
    selectedPage: string
    setSelectedPage: (value: string) => void
}

const MobileNav: React.FC<Props> = ({ selectedPage, setSelectedPage }) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const { t } = useTranslation()

    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={() => {
                    setOpenDrawer(false)
                }}
                anchor="right"
                PaperProps={{
                    sx: {
                        padding: '1rem',
                        width: 240,
                        height: 450,
                        backgroundColor: 'backgrounds.webSecondary',
                    },
                }}
            >
                <Text
                    onClick={() => {
                        setOpenDrawer(!openDrawer)
                    }}
                    color="backgrounds.webMobile"
                >
                    <CloseIcon />
                </Text>
                {
                    <NavLinks
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                        isMobile={true}
                    />
                }
                <Button
                    text={t('common:navigationWidget:signup')}
                    variant="contained"
                    sx={{
                        borderRadius: '15px',
                        backgroundColor: 'backgrounds.webPrimary',
                        fontWeight: 'fontWeightBold',
                        width: 150,
                    }}
                />
            </Drawer>

            <IconButton
                onClick={() => {
                    setOpenDrawer(!openDrawer)
                }}
            >
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default MobileNav
