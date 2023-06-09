import React from 'react'
import MaterialSelect, { type SelectProps } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

const defaultPlaceHolderText = 'Select'
interface ISelectData {
    label: string
    value: string | number
}

export interface ISelectProps extends SelectProps {
    data: ISelectData[]
}

const Select: React.FC<ISelectProps> = (props: ISelectProps): JSX.Element => {
    const { data, placeholder = defaultPlaceHolderText, ...restProps } = props
    const placeHolderText =
        placeholder == null ? defaultPlaceHolderText : placeholder
    const selectPlaceHolder = { label: placeHolderText, value: placeHolderText }

    return (
        <FormControl focused={false} fullWidth>
            <MaterialSelect defaultValue={placeHolderText} {...restProps}>
                {[selectPlaceHolder, ...data].map(({ label, value }) => (
                    <MenuItem
                        disabled={placeholder === value}
                        key={value}
                        value={value}
                    >
                        {label}
                    </MenuItem>
                ))}
            </MaterialSelect>
        </FormControl>
    )
}

export default Select
