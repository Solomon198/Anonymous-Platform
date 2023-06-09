import React from 'react'
import MaterialCheckBox, { type CheckboxProps } from '@mui/material/Checkbox'

export interface ICheckBoxProps extends CheckboxProps {
    'data-testid'?: string
}
const CheckBox: React.FC<ICheckBoxProps> = (
    props: ICheckBoxProps
): JSX.Element => {
    return <MaterialCheckBox {...props} />
}

export default CheckBox
