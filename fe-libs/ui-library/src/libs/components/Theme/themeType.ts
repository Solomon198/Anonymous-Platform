export const colorNames = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
] as const
export type ColorNames = (typeof colorNames)[number]
