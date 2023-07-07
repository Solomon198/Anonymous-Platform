// NOTE
// We don't have actual translations so we use translation keys since t will
// return the translation key when it can't find translation

import { type RenderResult, customRender } from '../../../utils/test'
import { ListItemWrapper } from '.'

const defaultProps = {
    isMobile: true,
}

const getComponent = (props: { isMobile: boolean }): RenderResult => {
    return customRender(
        <ListItemWrapper {...props}>
            <div>anything</div>
        </ListItemWrapper>
    )
}

describe('ListItemWrapper', () => {
    test('Should render correctly!', () => {
        getComponent(defaultProps)
    })
    test('Should ensure ListItemButton from MUI wraps component if isMobile is true', () => {
        const { getByRole } = getComponent(defaultProps)
        expect(getByRole('button')).toBeInTheDocument()
    })

    test('Should ensure ListItemButton from MUI does not wrap component if isMobile is false', () => {
        const { queryByRole } = getComponent({
            ...defaultProps,
            isMobile: false,
        })
        expect(queryByRole('button')).toBeNull()
    })
})
