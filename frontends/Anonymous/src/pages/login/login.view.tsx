import { Grid } from '@mui/material'
import { BackgroundImage, FormContainer, Logo, useLoginController } from '.'
import { Input, Button } from '@solex/ui-library'

const Login = (): JSX.Element => {
    const {
        t,
        password,
        email,
        authenticating,
        errors,
        handleSetEmail,
        handleSetPassword,
        handleSubmit,
    } = useLoginController()
    return (
        <Grid style={{ height: '100vh' }} container>
            <Grid item xs={0} md={6}>
                <BackgroundImage />
            </Grid>
            <Grid item md={6} xs={12}>
                <FormContainer>
                    <Logo variant="h1">{t('common:admin-login:title')}</Logo>
                    <Input
                        value={email}
                        onChange={handleSetEmail}
                        type="email"
                        required
                        errorMessage={errors?.email?.message}
                        disabled={authenticating}
                        placeholder={
                            t(
                                'common:admin-login:input-email-placeholder'
                            ) as unknown as string
                        }
                        style={{ width: 400 }}
                    />
                    <Input
                        value={password}
                        type="password"
                        disabled={authenticating}
                        required
                        errorMessage={errors?.password?.message}
                        onChange={handleSetPassword}
                        placeholder={
                            t(
                                'common:admin-login:input-password-placeholder'
                            ) as unknown as string
                        }
                        style={{ width: 400, marginTop: 10 }}
                    />

                    <Button
                        variant="contained"
                        style={{ width: 400, marginTop: 10 }}
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
