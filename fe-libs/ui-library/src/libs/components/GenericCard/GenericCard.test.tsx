import React from 'react'
import { customRender } from 'libs/utils/testing'
import { Card } from '@mui/material'
import GenericCard, { IGenericCard } from '.'

const defaultProps: IGenericCard = {
    children: 'Card Content',
}

const getComponent = (props: IGenericCard) =>
    customRender(<GenericCard {...props} />)

describe('GenericCard', () => {
    it('Renders', () => {
        const { container } = getComponent(defaultProps)
        expect(container).toBeInstanceOf(HTMLElement)
    })

    it('Displays children as content', () => {
        const { container } = getComponent(defaultProps)
        expect(container).toHaveTextContent('Card Content')
    })

    it('Passes through other MUI CardProps', () => {
        const testElevation = 12
        const { container } = getComponent({
            ...defaultProps,
            elevation: testElevation,
        })

        const cardElement = container.querySelector('.MuiPaper-elevation12')
        expect(cardElement).toBeInTheDocument()
    })

    it('Forwards the ref', () => {
        const ref = React.createRef<HTMLDivElement>()
        const { container } = getComponent({ ...defaultProps, ref })

        expect(ref.current).not.toBeNull()
    })
})
