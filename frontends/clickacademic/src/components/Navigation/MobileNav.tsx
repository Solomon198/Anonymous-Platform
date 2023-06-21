import type React from 'react';
import { useState } from 'react'
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Links from './Links'
import { type SelectedPage } from './type'
import { Button, Text } from '@dixre/ui-library'

interface Props {
    selectedPage: SelectedPage
    setSelectedPage: (value: SelectedPage) => void
}

const MobileNav: React.FC<Props> = ({ selectedPage, setSelectedPage }) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const { t } = useTranslation()
    const links = [
        `${t('common:navigationWidget:home')}`,
        `${t('common:navigationWidget:features')}`,
        `${t('common:navigationWidget:courses')}`,
        `${t('common:navigationWidget:about')}`,
        `${t('common:navigationWidget:support')}`,
        `${t('common:navigationWidget:login')}`,
    ]
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
                {links.map(
                    (link: string, index: React.Key | null | undefined) => (
                        <>
                            <List key={index} style={{}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Links
                                            page={link}
                                            selectedPage={selectedPage}
                                            setSelectedPage={setSelectedPage}
                                        />
                                    </ListItemIcon>
                                </ListItemButton>
                            </List>
                        </>
                    )
                )}
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
