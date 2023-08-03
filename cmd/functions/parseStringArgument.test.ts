// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { parseStringArgument } from "./parseStringArgument";

describe('parseStringArgument', () => {

    describe('with valid input', () => {
        it('should return the same string', () => {
            const argName = '--foo=bar';
            const value = 'bar';
            const result = parseStringArgument(argName, value);
            expect(result).toBe(value);
        });
        it('should return the same integer string', () => {
            const argName = '--foo=123';
            const value = '123';
            const result = parseStringArgument(argName, value);
            expect(result).toBe(value);
        });
        it('should return the same number as string', () => {
            const argName = '--foo=123';
            const value = 123;
            // @ts-ignore
            const result = parseStringArgument(argName, value);
            expect(result).toBe("123");
        });
    });

    describe('with undefined input', () => {
        it('should throw TypeError', () => {
            const argName = '--foo';
            expect(() => parseStringArgument(argName, undefined as unknown as string)).toThrow(TypeError);
        });
    });

    describe('with null input', () => {
        it('should throw TypeError', () => {
            const argName = '--foo';
            expect(() => parseStringArgument(argName, null as unknown as string)).toThrow(TypeError);
        });
    });

});
