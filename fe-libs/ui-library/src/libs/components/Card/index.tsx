import React from 'react'
import { type ReactNode } from 'react'
import { Card as MaterialCard, type CardProps } from '@mui/material'

// Extending MUI card props to add our custom props
export interface ICard extends CardProps {
    children: ReactNode
}

const Card: React.FC<ICard> = (props: ICard): JSX.Element => {
    const { children, ...otherProps } = props
    return <MaterialCard {...otherProps}>{children}</MaterialCard>
}

export default Card
