// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { parseNonEmptyStringArgument } from "./parseNonEmptyStringArgument";

describe('parseNonEmptyStringArgument', () => {

    describe('with valid input', () => {

        it('returns the same string when a non-empty string is given', () => {
            const argName = '--foo=bar';
            const value = 'bar';
            const result = parseNonEmptyStringArgument(argName, value);
            expect(result).toBe(value);
        });

    });

    describe('with invalid input', () => {

        it('throws TypeError when an empty string is given', () => {
            const argName = '--foo';
            const value = '';
            expect(() => parseNonEmptyStringArgument(argName, value)).toThrow(TypeError);
        });

        it('throws TypeError when undefined is given', () => {
            const argName = '--foo';
            expect(() => parseNonEmptyStringArgument(argName, undefined as unknown as string)).toThrow(TypeError);
        });

    });
});
