/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { put, takeEvery, call } from 'redux-saga/effects'
import axios, { type AxiosResponse } from 'axios'
import { login as loginAction, loginSuccess, loginFailed } from '..'
import { Actions } from '../../../redux/actions'
import { notificationCenter } from '../../../utils/helpers'

interface TPayload {
    email: string
    password: string
}

const login = async (payload: TPayload) => {
    return await axios.post('/login', payload)
}
export function* watchLogin() {
    yield takeEvery(Actions.LOGIN, function* (action): Generator<any> {
        yield put(loginAction())
        try {
            const doLogin = yield call(
                login.bind(null, (action as any).payload as TPayload)
            )
            const {
                data: { token, message },
            } = doLogin as AxiosResponse
            yield put(loginSuccess({ token }))
            notificationCenter(message, 'success')
        } catch (e: any) {
            yield put(loginFailed({ message: e.message }))
            const message = e?.response?.data.message
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            notificationCenter(message || e.message, 'error')
        }
    })
}
