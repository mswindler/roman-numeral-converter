/**
 * Converts an integer to its Roman numeral representation
 * @param {number} num - The number to convert (1-3999)
 * @returns {string} The Roman numeral representation
 * @throws {Error} If the number is out of range
 */
function convertToRoman(num) {
    if (num < 1 || num > 3999 || !Number.isInteger(num)) {
        throw new Error('Number must be an integer between 1 and 3999');
    }

    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let result = '';
    let remaining = num;

    for (const { value, symbol } of romanNumerals) {
        while (remaining >= value) {
            result += symbol;
            remaining -= value;
        }
    }

    return result;
}

module.exports = { convertToRoman }; 