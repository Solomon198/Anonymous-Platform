import { type RenderResult, customRender, fireEvent } from '../../utils/test'
import Newsletter from '.'

const translationKeys = {
    newsLetterWidgetTitle: 'common:newsletterWidget:title',
    newsLetterWidgetDescription: 'common:newsletterWidget:description',
    newsLetterWidgetPlaceHolder: 'common:newsletterWidget:placeholder',
    newsLetterWidgetBtnText: 'common:newsletterWidget:subscribeBtnText',
}

const inputValue = 'dixre@gmail.com'

const getComponent = (): RenderResult => {
    return customRender(<Newsletter />)
}

const {
    newsLetterWidgetBtnText,
    newsLetterWidgetDescription,
    newsLetterWidgetPlaceHolder,
    newsLetterWidgetTitle,
} = translationKeys

describe('Newsletter', () => {
    test('Should render correctly!', () => {
        getComponent()
    })
    test('Should ensure translation keys are looked up by i18n', () => {
        const { getByRole } = getComponent()
        const $newsLetterWidgetTitle = getByRole('heading', {
            name: newsLetterWidgetTitle,
        })
        const $newsLetterWidgetDescription = getByRole('heading', {
            name: newsLetterWidgetDescription,
        })
        const $newsLetterWidgetBtnText = getByRole('button', {
            name: newsLetterWidgetBtnText,
        })
        const $newsLetterWidgetPlaceHolder = getByRole('textbox')

        expect($newsLetterWidgetTitle).toBeInTheDocument()
        expect($newsLetterWidgetDescription).toBeInTheDocument()
        expect($newsLetterWidgetBtnText).toBeInTheDocument()
        expect($newsLetterWidgetPlaceHolder.getAttribute('placeholder')).toBe(
            newsLetterWidgetPlaceHolder
        )
    })

    test('Should ensure that input is writable', () => {
        const { getByRole } = getComponent()
        const inputEl = getByRole('textbox')
        fireEvent.change(inputEl, { target: { value: inputValue } })
        expect((inputEl as any).value).toBe(inputValue)
    })

    test('Should ensure that input has type value of email', () => {
        const { getByRole } = getComponent()
        const inputEl = getByRole('textbox')

        expect(inputEl.getAttribute('type')).toBe('email')
    })
})

// TODO
// We need to add more tests to this work which is for integration after we add interactivity.
