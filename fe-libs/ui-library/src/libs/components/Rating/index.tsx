import {
    Rating as MaterialRating,
    type RatingProps,
    type Color,
    colors,
} from '@mui/material'
import { RateWrapper, RatingText, formatNumber } from './utils'

export interface IRating extends RatingProps {
    totalCount?: number
    rateColor?: Color
    totalCountColor?: Color

    textFontSize?: number

    'data-testid'?: string
}

const Rating = (props: IRating): JSX.Element => {
    const {
        totalCount = 0,
        value = 0,
        rateColor = colors.grey[500],
        totalCountColor = colors.grey[500],
        textFontSize = 14,
        ...rest
    } = props
    const formatValues = (
        num: number,
        maximumFractionDigits: number
    ): string => {
        return num.toLocaleString('en-US', { maximumFractionDigits })
    }

    return (
        <RateWrapper>
            {Boolean(value) && (
                <RatingText
                    style={{
                        color: rateColor as string,
                        fontSize: textFontSize,
                    }}
                >
                    {formatValues(value as number, 1)}
                </RatingText>
            )}
            <MaterialRating {...rest} />
            {Boolean(totalCount) && (
                <RatingText
                    style={{
                        color: totalCountColor as string,
                        fontSize: textFontSize,
                    }}
                >
                    {formatNumber(totalCount)}
                </RatingText>
            )}
        </RateWrapper>
    )
}

export default Rating
