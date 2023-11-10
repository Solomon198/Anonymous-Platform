import { rgbToHex } from '.'

const rgbValue = 'rgb(244, 67, 54)'
const hexValue = '#f44336'
describe('HelperFuncs', () => {
    test('should convert RGB values to HEX', () => {
        const hex = rgbToHex(rgbValue)
        expect(hex).toBe(hexValue)
    })
})
