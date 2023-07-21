import MockAdapter from 'axios-mock-adapter'
import axios, { type AxiosStatic } from 'axios'
import { MockAuthServer } from './auth'

function MockConfig(axios: AxiosStatic): void {
    const mockInstance = new MockAdapter(axios)
    // Initializing auth mocks
    MockAuthServer(mockInstance)
}

export function IntializeMocks(): void {
    const env = process.env.NODE_ENV
    const envTest = process.env.REACT_APP_TEST_MODE as any as boolean
    if (envTest) {
        MockConfig(axios)
    } else if (env === 'development') {
        MockConfig(axios)
    }
}
