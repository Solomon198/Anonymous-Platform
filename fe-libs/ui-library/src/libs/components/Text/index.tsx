import Typography, { type TypographyProps } from '@mui/material/Typography'

export type TTypographyProps = TypographyProps
const Text = (props: TypographyProps): JSX.Element => {
    return (
        <Typography textTransform="capitalize" {...props}>
            {props.children}
        </Typography>
    )
}
export default Text
