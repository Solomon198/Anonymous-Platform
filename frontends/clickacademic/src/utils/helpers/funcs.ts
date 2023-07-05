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
