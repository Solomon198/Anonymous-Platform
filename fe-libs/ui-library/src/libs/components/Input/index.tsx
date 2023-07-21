import React, { useState } from 'react'
import MaterialInput, { type InputProps } from '@mui/base/Input'
import Error from '../Error'
import { StyledInputElement, StyledInputRoot } from './default.styled'

const CustomInput = React.forwardRef(function CustomInput(
    props: InputProps,
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
                name={props.name ?? 'input'}
                error={Boolean(props.error)}
            />
        </div>
    )
})

const Input: React.FC<InputProps> = (props: InputProps): JSX.Element => {
    return <CustomInput {...props} />
}
export { type InputProps }
export default Input
