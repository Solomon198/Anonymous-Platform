import { Box } from '@mui/material'
import NavLinks from '../NavLinks'
import { Button } from '@dixre/ui-library'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface Props {
    selectedPage: string
    setSelectedPage: (value: string) => void
}

const DesktopNav: FC<Props> = ({
    selectedPage,
    setSelectedPage,
}): JSX.Element => {
    const { t } = useTranslation()

    return (
        <Box
            sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexGrow: 1,
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
                    borderRadius: 50,
                    backgroundColor: 'backgrounds.webPrimary',
                    fontWeight: 'fontWeightBold',
                    fontSize: { lg: '18px', md: '15px' },
                    width: {
                        lg: 200,
                        md: 150,
                    },
                }}
                size="large"
            />
        </Box>
    )
}

export default DesktopNav
