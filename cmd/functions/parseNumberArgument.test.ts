// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { parseNumberArgument } from "./parseNumberArgument";

describe('parseNumberArgument', () => {

    describe('with valid input', () => {
        it('returns a number when a valid string number is given', () => {
            const argName = '--foo';
            const value = '123.45';
            const result = parseNumberArgument(argName, value);
            expect(result).toBe(123.45);
        });

        it('returns a number when a valid numeric value is given', () => {
            const argName = '--foo';
            const value = '123';
            const result = parseNumberArgument(argName, value);
            expect(result).toBe(123);
        });
    });

    describe('with undefined input', () => {
        it('throws TypeError', () => {
            const argName = '--foo';
            expect(() => parseNumberArgument(argName, undefined as unknown as string)).toThrow(TypeError);
        });
    });

    describe('with non-numeric string input', () => {
        it('throws TypeError', () => {
            const argName = '--foo';
            const value = 'abc';
            expect(() => parseNumberArgument(argName, value)).toThrow(TypeError);
        });
    });

    describe('with NaN input', () => {
        it('throws TypeError', () => {
            const argName = '--foo';
            const value = NaN;
            // @ts-ignore
            expect(() => parseNumberArgument(argName, value)).toThrow(TypeError);
        });
    });

    describe('with string with whitespaces only', () => {
        it('throws TypeError', () => {
            const argName = '--foo';
            const value = '     ';
            expect(() => parseNumberArgument(argName, value)).toThrow(TypeError);
        });
    });

});
