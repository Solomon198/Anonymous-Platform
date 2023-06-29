import { Box } from '@mui/material'
import NavLinks from '../NavLinks'
import { Button } from '@dixre/ui-library'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const DesktopNav = (): JSX.Element => {
    const { t } = useTranslation()
    const [selectedPage, setSelectedPage] = useState<string>(`${t('common:navigationWidget:signup')}`
    )


    return (
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
                    borderRadius: '20px',
                    backgroundColor: 'backgrounds.webPrimary',
                    fontWeight: 'fontWeightBold',
                    width: 150,
                }}
                size="large"
            />
        </Box>
    )
}

export default DesktopNav
