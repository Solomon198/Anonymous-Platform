import Text from '../Text'
import { styled } from '@mui/system'

export const RatingText = styled(Text)(() => ({
    marginRight: 3,
    marginLeft: 3,
    marginTop: 2,
}))

export const RateWrapper = styled('span')(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
}))

//  TODO: This function is to be moved to a shared util lib in the monorepo
export function formatNumber(num: number): string | number {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B'
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num
}
