import { useTranslation } from 'react-i18next'
import { type ChangeEvent, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [authenticating, setAuthenticating] = useState<boolean>(false)
    const { t } = useTranslation()

    const handleSetEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const handleSubmit = (): void => {}
    return {
        email,
        password,
        authenticating,
        t,
        handleSetEmail,
        handleSetPassword,
        handleSubmit,
        setAuthenticating,
    }
}
