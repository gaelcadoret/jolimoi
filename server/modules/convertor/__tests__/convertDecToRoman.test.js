const convertDecToRoman = require("../convertDecToRoman");

describe("convertDecToRoman", () => {
    describe("Should return basic conversion if inside mapping", () => {
        it("Should convert dec to romain numerals 1 => I", () => {
            expect(convertDecToRoman("1")).toBe("I");
        });

        it("Should convert dec to romain numerals 4 => IV", () => {
            expect(convertDecToRoman("4")).toBe("IV");
        });

        it("Should convert dec to romain numerals 5 => V", () => {
            expect(convertDecToRoman("5")).toBe("V");
        });

        it("Should convert dec to romain numerals 9 => IX", () => {
            expect(convertDecToRoman("9")).toBe("IX");
        });

        it("Should convert dec to romain numerals 10 => X", () => {
            expect(convertDecToRoman("10")).toBe("X");
        });

        it("Should convert dec to romain numerals 40 => XL", () => {
            expect(convertDecToRoman("40")).toBe("XL");
        });

        it("Should convert dec to romain numerals 50 => L", () => {
            expect(convertDecToRoman("50")).toBe("L");
        });

        it("Should convert dec to romain numerals 90 => XC", () => {
            expect(convertDecToRoman("90")).toBe("XC");
        });

        it("Should convert dec to romain numerals 100 => C", () => {
            expect(convertDecToRoman("100")).toBe("C");
        });
    })

    describe("Should return more complex conversion", () => {
        it("Should convert dec to romain numerals 3 => III", () => {
            expect(convertDecToRoman("3")).toBe("III");
        });

        it("Should convert dec to romain numerals 8 => VIII", () => {
            expect(convertDecToRoman("8")).toBe("VIII");
        });

        it("Should convert dec to romain numerals 12 => XII", () => {
            expect(convertDecToRoman("12")).toBe("XII");
        });

        it("Should convert dec to romain numerals 41 => XLI", () => {
            expect(convertDecToRoman("41")).toBe("XLI");
        });

        it("Should convert dec to romain numerals 48 => XLVIII", () => {
            expect(convertDecToRoman("48")).toBe("XLVIII");
        });

        it("Should convert dec to romain numerals 72 => LXXII", () => {
            expect(convertDecToRoman("72")).toBe("LXXII");
        });
    });
});
