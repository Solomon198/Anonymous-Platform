import React from 'react'
import MaterialInput, { type InputProps } from '@mui/base/Input'

import { StyledInputElement, StyledInputRoot } from './default.styled'

const CustomInput = React.forwardRef(function CustomInput(
    props: InputProps,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const { slots, ...other } = props
    return (
        <MaterialInput
            slots={{
                root: StyledInputRoot,
                input: StyledInputElement,
                ...slots,
            }}
            {...other}
            ref={ref}
        />
    )
})

const Input = (props: InputProps): JSX.Element => {
    return <CustomInput {...props} />
}
export { type InputProps }
export default Input
