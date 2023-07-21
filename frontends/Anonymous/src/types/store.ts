export interface IStore {
    login: {
        token: string
        isAuthenticating: boolean
        loginFailedMessage: string
    }
}
