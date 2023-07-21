import { useTranslation } from 'react-i18next'
import { type ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type IStore } from '../../types'
import { Actions } from '../../redux/actions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const { authenticating, loginFailedMessage } = useSelector(
        (store: IStore) => ({
            authenticating: store.login.isAuthenticating,
            loginFailedMessage: store.login.loginFailedMessage,
        })
    )

    const { t } = useTranslation()

    const handleSetEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const handleSubmit = (): void => {
        dispatch({ type: Actions.LOGIN, payload: { email, password } })
    }
    return {
        email,
        password,
        authenticating,
        loginFailedMessage,
        t,
        handleSetEmail,
        handleSetPassword,
        handleSubmit,
    }
}
