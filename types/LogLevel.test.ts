import {
    LogLevel,
    isLogLevel,
    stringifyLogLevel,
    parseLogLevel,
} from "./LogLevel";

describe("LogLevel", () => {
    test("isLogLevel()", () => {
        expect(isLogLevel(LogLevel.DEBUG)).toBe(true);
        expect(isLogLevel(LogLevel.INFO)).toBe(true);
        expect(isLogLevel(LogLevel.WARN)).toBe(true);
        expect(isLogLevel(LogLevel.ERROR)).toBe(true);
        expect(isLogLevel(LogLevel.NONE)).toBe(true);
        expect(isLogLevel(-1)).toBe(false);
        expect(isLogLevel("DEBUG")).toBe(false);
    });

    test("stringifyLogLevel()", () => {
        expect(stringifyLogLevel(LogLevel.DEBUG)).toBe("DEBUG");
        expect(stringifyLogLevel(LogLevel.INFO)).toBe("INFO");
        expect(stringifyLogLevel(LogLevel.WARN)).toBe("WARN");
        expect(stringifyLogLevel(LogLevel.ERROR)).toBe("ERROR");
        expect(stringifyLogLevel(LogLevel.NONE)).toBe("NONE");
    });
});