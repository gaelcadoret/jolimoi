const successResponse = (data) => ({
    success: true,
    data,
    timestamp: Date.now(),
});

const symbolMapping = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M",
}

const splitNumber = (acc, el, idx) => {
    const res = el.toString().padEnd(idx + 1, "0");

    return [
        ...acc,
        res,
    ]
};

/**
 * Break the number into Thousands, Hundreds, Tens and Ones
 * @param {number} num
 * @return {array} - array of string
 */
const breakNumber = (num) => num.toString().split("").reverse().reduce(splitNumber, []);

const getLarger = (num) => {
    return Object.keys(symbolMapping).reduce((acc, el) => {
        if ((Number(num) > Number(acc)) && (Number(num) < Number(el))) {
            return Number(el);
        } else {
            return Number(acc);
        }
    }, 0);
};

const getSmaller = (num) => {
    return Object.keys(symbolMapping).reduce((acc, el) => {
        if ((Number(num) > Number(acc)) && (Number(num) < Number(el))) {
            return Number(acc);
        } else {
            return Number(el);
        }
    }, 0);
};

const getDiff = (a, b) => Math.abs(a - b);

const isInsideMapping = (num) => symbolMapping.hasOwnProperty(num);
const getDistance = (a, b) => Math.abs(a - b);
const getNearest = (num) => {
    if (getDistance(num, getLarger(num)) < getDistance(num, getSmaller(num))) {
        return getLarger(num);
    } else {
        return getSmaller(num);
    }
}
const convertSingleNum = (num, idx) => {
    const divisor = Number("1".padEnd(idx + 1, "0"));
    console.log("divisor", divisor);
    const repeatSymbolCounter = num / divisor;

    console.log("repeatSymbolCounter", repeatSymbolCounter);

    if (repeatSymbolCounter <= 3) {
        return symbolMapping[divisor].repeat(repeatSymbolCounter);
    }


    if (isInsideMapping(num)) {
        console.log("inside mapping.")
        return symbolMapping[num];
    }

    console.log("not inside mapping !")

    console.log("num", num)

    console.log("getSmaller", getSmaller(num))
    console.log("Smaller symbol", symbolMapping[Number(getSmaller(num))])
    console.log("getDiff", getDiff(num, getSmaller(num)))

    // dizaine ou centaine multiple de 3 !!
    if (getDiff(num, getSmaller(num)) <= 3) {
        console.log("smaller + diff");
        console.log("result", symbolMapping[getSmaller(num)].padEnd( getDiff(num, getSmaller(num)) + 1, "I" ) );
        return symbolMapping[getSmaller(num)].padEnd( getDiff(num, getSmaller(num)) + 1, "I" );

    } else {
        console.log("larger - 1");
        console.log("result", symbolMapping[getLarger(num)].padStart( 2, symbolMapping[Number(getSmaller(num))] ) );
        return symbolMapping[getLarger(num)].padStart( 2, symbolMapping[Number(getSmaller(num))] );
    }

    // return symbolMapping[getLarger(num)].padStart( getDiff(getLarger(num), num) + 1, symbolMapping[getSmaller(num)] )
}

/**
 * @param {array} numbers
 */
const convertArray = (numbers) => {
    return numbers.map(convertSingleNum).reverse();
}

/**
 *
 * @param {string} decimalNumber
 * @return {string}
 */
const convertDecToRoman = (decimalNumber) => {
    const num = Number(decimalNumber);

    const numberSplitted = breakNumber(num);

    console.log("numberSplitted", numberSplitted);

    return convertArray(numberSplitted).join("");
}

const convertor = (req, res) => {
    const { data } = req.body;
    console.log("body", data);

    return res.json(
        successResponse(convertDecToRoman(data))
    );
};

module.exports = convertor;


