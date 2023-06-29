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
        `${t('common:navigationWidget:signup')}`
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
                    p: '1rem 3rem',
                }}
            >
                <Box sx={{ width: { lg: '25%', sm: '50%' } }}>
                    <img
                        src="/assets/images/clickacademic_logo.jpg"
                        alt="ClickAcademic logo"
                        width="50%"
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
