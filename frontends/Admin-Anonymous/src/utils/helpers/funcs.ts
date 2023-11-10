import { type ZodObject } from 'zod'
export function rgbToHex(rgb: string): string {
    // Extract the individual RGB components
    const regex = /(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})/
    const matches = regex.exec(rgb) as RegExpExecArray
    const r = parseInt(matches[1])
    const g = parseInt(matches[2])
    const b = parseInt(matches[3])

    // Convert the RGB values to hexadecimal
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')

    return `#${hex}`
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function validateSchema(schema: ZodObject<any>, data: any) {
    const result = schema.safeParse(data)
    if (result.success) {
        return { success: true, errors: {} }
    }
    const errorObject = result.error.errors.reduce((prev: any, curr: any) => {
        prev[curr.path[0]] = {
            message: curr.message,
            code: curr.code,
        }
        return prev
    }, {})
    return { success: false, errors: errorObject }
}
