import React from 'react'
import Typography, { type TypographyProps } from '@mui/material/Typography'

export type TTypographyProps = TypographyProps
const Text: React.FC<TypographyProps> = (
    props: TypographyProps
): JSX.Element => {
    return (
        <Typography textTransform="capitalize" {...props}>
            {props.children}
        </Typography>
    )
}
export default Text
