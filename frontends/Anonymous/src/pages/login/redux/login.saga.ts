/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios'
import { login as loginAction, loginSuccess, loginFailed } from '..'
import { Actions } from '../../../redux/actions'

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
            yield put(loginSuccess({ token: '' }))
            console.log(doLogin)
        } catch (e: any) {
            yield put(loginFailed({ message: e.message }))
        }
    })
}
