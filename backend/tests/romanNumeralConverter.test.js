const { convertToRoman } = require('../utils/romanNumeralConverter');

describe('Roman Numeral Converter', () => {
    test('converts 1 to I', () => {
        expect(convertToRoman(1)).toBe('I');
    });

    test('converts 4 to IV', () => {
        expect(convertToRoman(4)).toBe('IV');
    });

    test('converts 9 to IX', () => {
        expect(convertToRoman(9)).toBe('IX');
    });

    test('converts 49 to XLIX', () => {
        expect(convertToRoman(49)).toBe('XLIX');
    });

    test('converts 99 to XCIX', () => {
        expect(convertToRoman(99)).toBe('XCIX');
    });

    test('converts 499 to CDXCIX', () => {
        expect(convertToRoman(499)).toBe('CDXCIX');
    });

    test('converts 999 to CMXCIX', () => {
        expect(convertToRoman(999)).toBe('CMXCIX');
    });

    test('converts 3999 to MMMCMXCIX', () => {
        expect(convertToRoman(3999)).toBe('MMMCMXCIX');
    });

    test('throws error for number less than 1', () => {
        expect(() => convertToRoman(0)).toThrow();
        expect(() => convertToRoman(-1)).toThrow();
    });

    test('throws error for number greater than 3999', () => {
        expect(() => convertToRoman(4000)).toThrow();
    });

    test('throws error for non-integer numbers', () => {
        expect(() => convertToRoman(1.5)).toThrow();
    });
}); 