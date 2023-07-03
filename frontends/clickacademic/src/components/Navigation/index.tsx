/* eslint-disable react/prop-types */
import { Card, useTheme } from '@dixre/ui-library'
import { Box, Container, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

const Navigation = (): JSX.Element => {
    const { t } = useTranslation()
    const [selectedPage, setSelectedPage] = useState<string>(
        `${t('common:navigationWidget:home')}`
    )
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            <Container maxWidth={false} style={{ margin: 0 }} disableGutters>
                <Card
                    elevation={2}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '4rem',
                        p: {
                            lg: '.5rem 3.5rem',
                            md: '.5rem 2rem',
                            sm: '.5rem 3.5rem',
                            xs: '.5rem 3.5rem',
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                lg: '15%',
                                md: '20%',
                                sm: '30%',
                                xs: '30%',
                            },
                        }}
                    >
                        <img
                            src="/assets/images/clickacademic_logo.jpg"
                            alt="ClickAcademic logo"
                            width="100%"
                        />
                    </Box>
                    {!isMobile ? (
                        <DesktopNav />
                    ) : (
                        <MobileNav
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                    )}
                </Card>
            </Container>
            <Outlet />
        </>
    )
}

export default Navigation
