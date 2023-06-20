import { Button, Card, useTheme } from '@dixre/ui-library'
import { Box, Container, useMediaQuery } from '@mui/material'
import NavLinks from './NavLinks'
import { SelectedPage } from './type'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MobileNav from './MobileNav'

const Navigation = (): JSX.Element => {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>(
        SelectedPage.Home
    )
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation()

    return (
        <Container style={{ margin: 0, maxWidth: '100%' }}>
            <Card
                elevation={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: '1rem 3rem',
                }}
            >
                <Box sx={{ width: { lg: '25%', sm: '50%' }, position: "relative", right:{xs: "5rem"} }}>
                    <img
                        src="/assets/images/clickacademic_logo.jpg"
                        alt="ClickAcademic logo"
                        width="50%"
                    />
                </Box>
                {!isMobile ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            alignItems: 'center',
                            gap: '2.5rem',
                        }}
                    >
                        <NavLinks
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
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
                    </Box>
                ) : (
                    <>
                        <MobileNav
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                    </>
                )}
            </Card>
        </Container>
    )
}

export default Navigation
