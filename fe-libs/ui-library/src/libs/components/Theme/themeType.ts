export const colorNames = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
    'text',
] as const
export type ColorNames = (typeof colorNames)[number]
