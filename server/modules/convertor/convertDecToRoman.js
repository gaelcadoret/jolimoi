const symbolMapping = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
};

/**
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @return {boolean}
 */
const isNumberBetweenRange = (num, min, max) => (min < num) && (num < max)

/**
 * @param {number} num
 * @return {number}
 */
const getBaseSymbolKey = (num) => Object.keys(symbolMapping).reduce(
    (acc, el) => isNumberBetweenRange(Number(num), Number(acc), Number(el))
        ? Number(acc)
        : Number(el)
    , 0);
const isInsideMapping = (num) => Object.prototype.hasOwnProperty.call(symbolMapping, num);
const getRomanNumeral = (initialBaseValue, repeatedQuotientTimes) =>
    symbolMapping[initialBaseValue].toString().repeat(repeatedQuotientTimes)

/**
 * @param {string|number} numAsString
 * @param {string?} strAccumulator
 * @return {string} Converted value in roman numerals format
 */
const convertDecToRoman = (numAsString, strAccumulator = "") => {
    const num = Number(numAsString);

    if (isInsideMapping(num)) {
        return strAccumulator + symbolMapping[num];
    }

    const initialBaseValue = getBaseSymbolKey(num);
    const repeatedQuotientTimes = Math.floor(num / initialBaseValue);
    const remainder = num % initialBaseValue;

    const romanNumeral = getRomanNumeral(initialBaseValue, repeatedQuotientTimes);

    if (remainder > 0) return convertDecToRoman(remainder, strAccumulator + romanNumeral);

    return strAccumulator + romanNumeral;
}

module.exports = convertDecToRoman;
