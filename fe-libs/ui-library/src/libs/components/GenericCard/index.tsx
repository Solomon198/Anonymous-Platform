import { type ReactNode } from 'react'
import { Card, type CardProps } from '@mui/material'

// Extending MUI card props to add our custom props
export interface IGenericCard extends CardProps {
    children: ReactNode
}

const GenericCard = (props: IGenericCard): JSX.Element => {
    const { ref, children, ...otherProps } = props
    return (
        <Card {...otherProps} ref={ref}>
            {children}
        </Card>
    )
}

export default GenericCard
