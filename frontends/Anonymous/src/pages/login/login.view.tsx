import { Grid } from '@mui/material'
import { BackgroundImage, FormContainer, Logo, useLoginController } from '.'
import { Input, Button } from '@solex/ui-library'

const Login = (): JSX.Element => {
    const {
        t,
        password,
        email,
        authenticating,
        handleSetEmail,
        handleSetPassword,
        handleSubmit,
    } = useLoginController()
    return (
        <Grid style={{ height: '100vh' }} container>
            <Grid item xs={0} md={6}>
                <BackgroundImage></BackgroundImage>
            </Grid>
            <Grid item md={6} xs={12}>
                <FormContainer>
                    <Logo variant="h1">{t('common:admin-login:title')}</Logo>
                    <Input
                        value={email}
                        onChange={handleSetEmail}
                        type="email"
                        placeholder={
                            t(
                                'common:admin-login:input-email-placeholder'
                            ) as unknown as string
                        }
                        style={{ width: 400, marginBottom: 10 }}
                    />
                    <Input
                        value={password}
                        type="password"
                        onChange={handleSetPassword}
                        placeholder={
                            t(
                                'common:admin-login:input-password-placeholder'
                            ) as unknown as string
                        }
                        style={{ width: 400, marginBottom: 10 }}
                    />

                    <Button
                        variant="contained"
                        style={{ width: 400 }}
                        onClick={handleSubmit}
                        loading={authenticating}
                        loaderSize={20}
                        disabled={authenticating}
                        text={t('common:admin-login:sign-in-button')}
                        sx={{
                            backgroundColor: 'backgrounds.webPrimary',
                        }}
                        size="medium"
                    />
                </FormContainer>
            </Grid>
        </Grid>
    )
}

export default Login
