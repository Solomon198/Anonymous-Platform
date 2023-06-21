import { Button, Input, Text } from '@dixre/ui-library'
import { Container, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Newsletter = (): JSX.Element => {
    const { t } = useTranslation()

    return (
        <Container
            sx={{
                display: {
                    xl: 'flex',
                    lg: 'flex',
                    sm: 'block',
                    xs: 'block',
                },
                alignContent: 'center',
                alignItems: 'center',
                width: {
                    lg: '1151px',
                    sm: '640px',
                },
            }}
        >
            <img
                src="/assets/images/dizzy-sending-messages 1.png"
                alt="Newsletter Image"
                style={{ maxWidth: '100%', marginBottom: '1rem' }}
            />
            <Container>
                <Text variant="h3" color="text.primary">
                    {t('common:newsletterWidget:title')}
                </Text>
                <Text
                    variant="subtitle1"
                    color="text.secondary"
                    style={{ textAlign: 'justify' }}
                >
                    {t('common:newsletterWidget:description')}
                </Text>
                <Box
                    sx={{
                        backgroundColor: {
                            lg: 'backgrounds.inputColor',
                            sm: 'none',
                            xs: 'none',
                        },
                        borderRadius: '15px',
                        display: {
                            lg: 'flex',
                            sm: 'block',
                            xs: 'block',
                        },
                        marginTop: '1rem',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            '& > * + *': { ml: 1 },
                            width: {
                                lg: 300,
                                sm: 500,
                            },
                            borderRadius: '15px',
                            backgroundColor: {
                                lg: 'backgrounds.inputColor',
                                sm: 'none',
                                xs: 'backgrounds.inputColor',
                            },
                        }}
                    >
                        <Input
                            style={{
                                width: 300,
                                background: 'inherit',
                                border: 'none',
                                boxShadow: 'none',
                            }}
                            type="email"
                            placeholder={`${t(
                                'common:newsletterWidget:placeholder'
                            )}`}
                        />
                    </Box>

                    <Button
                        text={t('common:newsletterWidget:subscribeBtnText')}
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: {
                                lg: '0px 12px 12px 28px',
                                xs: '0px 10px 10px 20px',
                            },
                            marginTop: {
                                lg: 0,
                                xs: '1rem',
                            },
                            backgroundColor: 'backgrounds.webPrimary',
                            display: 'flex',
                        }}
                    />
                </Box>
            </Container>
        </Container>
    )
}

export default Newsletter
