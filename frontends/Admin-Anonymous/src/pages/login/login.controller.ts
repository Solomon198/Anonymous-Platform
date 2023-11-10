import { useTranslation } from 'react-i18next'
import { type ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type IStore, type IErrorType } from '../../types'
import { Actions } from '../../redux/actions'
import { z } from 'zod'
import { validateSchema } from '../../utils/helpers'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

interface ILogin {
    password?: IErrorType
    email?: IErrorType
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLoginController = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<ILogin>({})

    const loginState = useSelector((store: IStore) => store.login)

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleSetEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const handleSubmit = (): void => {
        const validation = validateSchema(schema, { email, password })
        if (!validation.success) {
            setErrors(validation.errors)
            return
        }
        dispatch({ type: Actions.LOGIN, payload: { email, password } })
    }

    return {
        email,
        password,
        authenticating: loginState?.isAuthenticating,
        loginFailedMessage: loginState?.loginFailedMessage,
        errors,
        t,
        handleSetEmail,
        handleSetPassword,
        handleSubmit,
    }
}
