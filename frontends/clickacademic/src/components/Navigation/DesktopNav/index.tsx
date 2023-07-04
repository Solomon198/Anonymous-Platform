import { Box } from '@mui/material'
import NavLinks from '../NavLinks'
import { Button } from '@dixre/ui-library'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const DesktopNav = (): JSX.Element => {
    const { t } = useTranslation()
    const [selectedPage, setSelectedPage] = useState<string>(
        `${t('common:navigationWidget:home')}`
    )

    return (
        <Box
            sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                gap: { lg: '3rem', md: '2rem' },
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
                    borderRadius: '20px',
                    backgroundColor: 'backgrounds.webPrimary',
                    fontWeight: 'fontWeightBold',
                    fontSize: { lg: '18px', md: '15px' },
                    width: {
                        lg: 200,
                        md: 150
                    },
                }}
                size="large"
            />
        </Box>
    )
}

export default DesktopNav
