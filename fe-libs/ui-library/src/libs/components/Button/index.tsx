import MaterialButton from '@mui/material/Button'
import { Loader, ELoader } from '../Loader'
import { type ButtonProps, type SxProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const defaultLoaderSize = 10

enum LoadingPosition {
    start = 'start',
    end = 'end',
}
// Extending MUI button props to add our custom props
export interface IButton extends ButtonProps {
    text: string
    loaderSize?: number
    loaderColor?: string

    loadingPosition?: 'start' | 'end'

    textLoaderSpace?: 1 | 2 | 3 | 4 | 5
    loading?: boolean

    'data-testid'?: string
}
const Button = (props: IButton): JSX.Element => {
    const { palette } = useTheme()
    const {
        ref,
        text,
        loaderSize,
        loading,
        textLoaderSpace,
        loadingPosition = LoadingPosition.end,
        variant = 'contained',
        loaderColor,
    } = props

    const adjustLoaderSize =
        loaderSize !== null ? loaderSize : defaultLoaderSize
    const loaderConfig: SxProps = {
        color: palette.buttonSpinner[variant],
    }

    // preconditions
    if (loaderColor !== null) {
        loaderConfig.color = loaderColor
    }
    if (loadingPosition === 'start') {
        loaderConfig.marginRight =
            textLoaderSpace !== null ? textLoaderSpace : 2
    } else {
        loaderConfig.marginLeft = textLoaderSpace !== null ? textLoaderSpace : 2
    }
    const showLoaderLeft =
        loading === true && loadingPosition === LoadingPosition.start
    const showLoaderRight =
        loading === true && loadingPosition === LoadingPosition.end

    const LoadingComponent = (): JSX.Element => (
        <Loader
            sx={{
                ...loaderConfig,
                color: palette.buttonSpinner[variant],
            }}
            size={adjustLoaderSize}
            type={ELoader.Circular}
        />
    )
    return (
        <MaterialButton
            {...props}
            // Don't place this line above the rest props
            style={{
                textTransform: 'capitalize',
                ...props?.style,
            }}
            ref={ref}
        >
            {showLoaderLeft && LoadingComponent()}
            {text}
            {showLoaderRight && LoadingComponent()}
        </MaterialButton>
    )
}

export default Button
