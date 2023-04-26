import { type ReactNode } from 'react'
import { Card as MaterialCard, type CardProps } from '@mui/material'

// Extending MUI card props to add our custom props
export interface ICard extends CardProps {
    children: ReactNode
}

const Card = (props: ICard): JSX.Element => {
    const { ref, children, ...otherProps } = props
    return (
        <MaterialCard {...otherProps} ref={ref}>
            {children}
        </MaterialCard>
    )
}

export default Card
