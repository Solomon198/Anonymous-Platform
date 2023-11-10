import type MockAdapter from 'axios-mock-adapter'
import jwtFake from 'fake-jwt-sign'
import _ from 'lodash'

const authStatus = {
    isAuthenticated: true,
    userId: 'e4d1bc2ab25c',
    userRole: 'manager@test.com',
}

const adminEmail = 'admin@user.com'
const password = 'password'

const accessToken = jwtFake.sign(authStatus, 'secret', {
    expiresIn: '5h',
    algorithm: 'none',
})

export function MockAuthServer(mockInstance: MockAdapter): void {
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    mockInstance.onPost('/login').reply((config) => {
        return new Promise((resolve) => {
            _.delay(function () {
                const body = JSON.parse(config.data)
                if (Boolean(body.email) && Boolean(body.password)) {
                    if (
                        password === body.password &&
                        adminEmail === body.email
                    ) {
                        resolve([
                            200,
                            { message: 'Login Success', token: accessToken },
                        ])
                    } else {
                        resolve([401, { message: 'Invalid email or password' }])
                    }
                }
                resolve([401, { message: 'Invalid email or password' }])
            }, 1000)
        })
    })
}
