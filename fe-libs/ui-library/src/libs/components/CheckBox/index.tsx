import MaterialCheckBox, { type CheckboxProps } from '@mui/material/Checkbox'

export interface ICheckBoxProps extends CheckboxProps {
    'data-testid'?: string
}
const CheckBox = (props: ICheckBoxProps): JSX.Element => {
    return <MaterialCheckBox {...props} />
}

export default CheckBox
