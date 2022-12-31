import { SiType, isSiType, stringifySiType, parseSiType } from "./SiType";

describe("SiType", () => {

    describe("SiType", () => {
        it("should have the correct values", () => {
            expect(SiType.NONE).toBe("NONE");
            expect(SiType.KILO).toBe("KILO");
            expect(SiType.MEGA).toBe("MEGA");
            expect(SiType.GIGA).toBe("GIGA");
            expect(SiType.TERA).toBe("TERA");
            expect(SiType.PETA).toBe("PETA");
            expect(SiType.EXA).toBe("EXA");
            expect(SiType.ZETTA).toBe("ZETTA");
            expect(SiType.YOTTA).toBe("YOTTA");

            // Check that there are the correct number of assertions
            expect.assertions(9);
        });
    });

    describe("isSiType", () => {

        it("should return true for valid SiType values", () => {
            expect(isSiType(SiType.NONE)).toBe(true);
            expect(isSiType(SiType.KILO)).toBe(true);
            expect(isSiType(SiType.MEGA)).toBe(true);
            expect(isSiType(SiType.GIGA)).toBe(true);
            expect(isSiType(SiType.TERA)).toBe(true);
            expect(isSiType(SiType.PETA)).toBe(true);
            expect(isSiType(SiType.EXA)).toBe(true);
            expect(isSiType(SiType.ZETTA)).toBe(true);
            expect(isSiType(SiType.YOTTA)).toBe(true);

            // Check that there are the correct number of assertions
            expect.assertions(9);
        });

        it("should return false for invalid SiType values", () => {

            expect(isSiType("invalid value")).toBe(false);
            expect(isSiType(null)).toBe(false);
            expect(isSiType(undefined)).toBe(false);
            expect(isSiType(123)).toBe(false);
            expect(isSiType(true)).toBe(false);
            expect(isSiType({})).toBe(false);
            expect(isSiType([])).toBe(false);
            expect(isSiType(() => {})).toBe(false);

            // Check that there are the correct number of assertions
            expect.assertions(8);  // update this value as needed

        });
    });

    describe("stringifySiType", () => {
        it("should return the correct string representation for SiType values", () => {

            expect(stringifySiType(SiType.NONE)).toBe("NONE");
            expect(stringifySiType(SiType.KILO)).toBe("KILO");
            expect(stringifySiType(SiType.MEGA)).toBe("MEGA");
            expect(stringifySiType(SiType.GIGA)).toBe("GIGA");
            expect(stringifySiType(SiType.TERA)).toBe("TERA");
            expect(stringifySiType(SiType.PETA)).toBe("PETA");
            expect(stringifySiType(SiType.EXA)).toBe("EXA");
            expect(stringifySiType(SiType.ZETTA)).toBe("ZETTA");
            expect(stringifySiType(SiType.YOTTA)).toBe("YOTTA");

            // Check that there are the correct number of assertions
            expect.assertions(9);

        });

        it("should throw an error for invalid SiType values", () => {

            // @ts-ignore
            expect(() => stringifySiType("invalid value")).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifySiType(null)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifySiType(undefined)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifySiType(123)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifySiType(true)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifySiType({})).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifySiType([])).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifySiType(() => {})).toThrowError(TypeError);

            // Check that there are the correct number of assertions
            expect.assertions(8);  // update this value as needed

        });
    });

    describe("parseSiType", () => {
        it("should return the correct SiType value for string inputs", () => {

            expect(parseSiType("NONE")).toBe(SiType.NONE);
            expect(parseSiType("KILO")).toBe(SiType.KILO);
            expect(parseSiType("MEGA")).toBe(SiType.MEGA);
            expect(parseSiType("GIGA")).toBe(SiType.GIGA);
            expect(parseSiType("TERA")).toBe(SiType.TERA);
            expect(parseSiType("PETA")).toBe(SiType.PETA);
            expect(parseSiType("EXA")).toBe(SiType.EXA);
            expect(parseSiType("ZETTA")).toBe(SiType.ZETTA);
            expect(parseSiType("YOTTA")).toBe(SiType.YOTTA);

            expect(parseSiType("none")).toBe(SiType.NONE);
            expect(parseSiType("kilo")).toBe(SiType.KILO);
            expect(parseSiType("mega")).toBe(SiType.MEGA);
            expect(parseSiType("giga")).toBe(SiType.GIGA);
            expect(parseSiType("tera")).toBe(SiType.TERA);
            expect(parseSiType("peta")).toBe(SiType.PETA);
            expect(parseSiType("exa")).toBe(SiType.EXA);
            expect(parseSiType("zetta")).toBe(SiType.ZETTA);
            expect(parseSiType("yotta")).toBe(SiType.YOTTA);

            expect(parseSiType("")).toBe(SiType.NONE);
            expect(parseSiType("k")).toBe(SiType.KILO);
            expect(parseSiType("M")).toBe(SiType.MEGA);
            expect(parseSiType("G")).toBe(SiType.GIGA);
            expect(parseSiType("T")).toBe(SiType.TERA);
            expect(parseSiType("P")).toBe(SiType.PETA);
            expect(parseSiType("E")).toBe(SiType.EXA);
            expect(parseSiType("Z")).toBe(SiType.ZETTA);
            expect(parseSiType("Y")).toBe(SiType.YOTTA);

            // Check that there are the correct number of assertions
            expect.assertions(9*3);

        });

        it("should return undefined value for non-string inputs", () => {

            expect(parseSiType(123)).toBeUndefined();
            expect(parseSiType(null)).toBeUndefined();
            expect(parseSiType(undefined)).toBeUndefined();
            expect(parseSiType(true)).toBeUndefined();
            expect(parseSiType(false)).toBeUndefined();
            expect(parseSiType({})).toBeUndefined();
            expect(parseSiType([])).toBeUndefined();
            expect(parseSiType(() => {})).toBeUndefined();

            // Check that there are the correct number of assertions
            expect.assertions(8);  // update this value as needed

        });

        it("should return undefined for invalid inputs", () => {

            expect(parseSiType("K")).toBeUndefined();
            expect(parseSiType("m")).toBeUndefined();
            expect(parseSiType("g")).toBeUndefined();
            expect(parseSiType("t")).toBeUndefined();
            expect(parseSiType("p")).toBeUndefined();
            expect(parseSiType("e")).toBeUndefined();
            expect(parseSiType("z")).toBeUndefined();
            expect(parseSiType("y")).toBeUndefined();

            expect(parseSiType("invalid value")).toBe(undefined);
            expect(parseSiType("A")).toBe(undefined);
            expect(parseSiType("B")).toBe(undefined);
            expect(parseSiType("C")).toBe(undefined);
            expect(parseSiType("abc")).toBe(undefined);
            expect(parseSiType("foo")).toBe(undefined);
            expect(parseSiType("bar")).toBe(undefined);
            expect(parseSiType("baz")).toBe(undefined);

            // Check that there are the correct number of assertions
            expect.assertions(16);  // update this value as needed

        });
    });

});
