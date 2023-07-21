import { createSlice } from '@reduxjs/toolkit'

const intialState = {
    token: '',
    isAuthenticating: false,
    loginFailedMessage: '',
}

const loginSlice = createSlice({
    name: 'login',
    initialState: intialState,
    reducers: {
        loginFailed(state, action) {
            state.isAuthenticating = false
            // state.loginFailedMessage = action.payload.message
        },
        loginSuccess(state, action) {
            state.isAuthenticating = false
            state.loginFailedMessage = ''
            state.token = action.payload.token
        },
        login(state) {
            state.isAuthenticating = true
        },
        logout(state) {
            state.token = ''
        },
    },
})

export const { login, loginFailed, loginSuccess, logout } = loginSlice.actions
export const loginReducer = loginSlice.reducer
