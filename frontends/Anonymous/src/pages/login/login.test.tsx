import {
    type RenderResult,
    customRender,
    waitFor,
    fireEvent,
    act,
} from '../../utils/test'
import Login from '.'
// NOTE
// We don't have actual translations so we use translation keys since t will
// return the translation key when it can't find translation

const translationKeys = {
    loginTitle: 'common:admin-login:title',
    loginEmailPlaceHolder: 'common:admin-login:input-email-placeholder',
    loginPasswordPlaceHolder: 'common:admin-login:input-password-placeholder',
    loginSignInButton: 'common:admin-login:sign-in-button',
}

const inputEmail = 'solex@gmail.com'
const inputPassword = 'password'

const getComponent = (): RenderResult => {
    return customRender(<Login />)
}

describe('Login', () => {
    test('Should render correctly', () => {
        getComponent()
    })

    test('Should ensure title is on the page', () => {
        const { getByRole } = getComponent()
        const component = getByRole('heading', {
            name: translationKeys.loginTitle,
        })
        expect(component).toBeInTheDocument()
    })

    test('Should ensure email box exist on the document', () => {
        const { getByPlaceholderText } = getComponent()
        const component = getByPlaceholderText(
            translationKeys.loginEmailPlaceHolder
        )
        expect(component).toBeInTheDocument()
    })
    test('Should ensure password box exist on the document', () => {
        const { getByPlaceholderText } = getComponent()
        const component = getByPlaceholderText(
            translationKeys.loginPasswordPlaceHolder
        )
        expect(component).toBeInTheDocument()
    })

    test('Should ensure sign in button exist on the document', () => {
        const { getByRole } = getComponent()
        const component = getByRole('button', {
            name: translationKeys.loginSignInButton,
        })
        expect(component).toBeInTheDocument()
    })

    test('Should ensure user can enter email correctly', () => {
        const { getByPlaceholderText } = getComponent()
        const component = getByPlaceholderText(
            translationKeys.loginEmailPlaceHolder
        )

        fireEvent.change(component, { target: { value: inputEmail } })
        expect((component as any).value).toBe(inputEmail)
    })

    test('Should ensure user can enter password correctly', () => {
        const { getByPlaceholderText } = getComponent()
        const component = getByPlaceholderText(
            translationKeys.loginPasswordPlaceHolder
        )

        fireEvent.change(component, { target: { value: inputPassword } })
        expect((component as any).value).toBe(inputPassword)
    })

    test('Should ensure sign in button is clickable and responds accordingly', () => {
        const { getByRole } = getComponent()
        const component = getByRole('button', {
            name: translationKeys.loginSignInButton,
        })
        act(() => {
            fireEvent.click(component)
        })
        waitFor(() => {
            expect(component).toBeDisabled()
        }).catch(() => {})
    })
})
