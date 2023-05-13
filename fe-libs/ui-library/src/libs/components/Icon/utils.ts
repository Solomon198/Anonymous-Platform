import { type Theme, type Color } from '@mui/material'
import { type ColorNames } from '../Theme'

const getPalleteColor = (theme: Theme, color: Color | ColorNames): Color => {
    const index = (color as string).indexOf('#')
    if (index === -1) {
        return (theme.palette as any)[color as string].main as Color
    }
    return color as Color
}

export { getPalleteColor }
