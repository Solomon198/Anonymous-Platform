import React, { useState } from 'react'
import { Input as MaterialInput, type InputProps } from '@mui/base/Input'
import Error from '../Error'
import { StyledInputElement, StyledInputRoot } from './default.styled'

type CustomInputProps = {
    errorMessage?: string
} & InputProps
const CustomInput = React.forwardRef(function CustomInput(
    props: CustomInputProps,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const { slots, ...other } = props

    const [touched, setTouched] = useState(false)

    return (
        <div>
            <MaterialInput
                slots={{
                    root: StyledInputRoot,
                    input: StyledInputElement,
                    ...slots,
                }}
                {...other}
                ref={ref}
                onBlur={() => {
                    setTouched(true)
                }}
            />
            <Error
                touched={touched}
                required={Boolean(props.required)}
                error={props.errorMessage ?? ''}
            />
        </div>
    )
})

const Input: React.FC<CustomInputProps> = (
    props: CustomInputProps
): JSX.Element => {
    return <CustomInput {...props} />
}
export { type CustomInputProps }
export default Input
