import MaterialSelect, { type SelectProps } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

interface ISelectData {
    label: string
    value: string | number
}
export interface ISelectProps extends SelectProps {
    data: ISelectData[]
}

const Select = (props: ISelectProps): JSX.Element => {
    const { data, placeholder } = props
    const selectPlaceHolder = { label: 'Select', value: 'Select' }

    return (
        <FormControl fullWidth>
            <MaterialSelect
                sx={{
                    borderRadius: 10,
                    '&.Mui-focused': {
                        bgcolor: 'transparent',
                        color: 'transparent',
                    },
                }}
            >
                {[selectPlaceHolder, ...data].map(({ label, value }) => (
                    <MenuItem
                        disabled={
                            value === props.value || placeholder === value
                        }
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
