import { all } from 'redux-saga/effects'
import { watchLogin } from '../pages/login'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* rootSaga() {
    yield all([watchLogin()])
}
