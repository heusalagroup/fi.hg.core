// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { parseIntegerArgument } from "./parseIntegerArgument";

describe('CommandArgumentUtils', () => {

    describe('#parseIntegerArgument', () => {

        it('parses valid integer string to a number', () => {
            const argName = '--foo=42';
            const value = '42';
            const result = parseIntegerArgument(argName, value);
            expect(result).toBe(42);
        });

        it('throws TypeError on invalid integer string', () => {
            const argName = '--foo=42.5';
            const value = '42.5'; // or any non-integer string
            expect(() => parseIntegerArgument(argName, value)).toThrow(TypeError);
        });

        it('throws TypeError with correct error message on invalid integer string', () => {
            const argName = '--foo=42.5';
            const value = '42.5'; // or any non-integer string
            expect(() => parseIntegerArgument(argName, value)).toThrow(`Argument ${argName}: not integer`);
        });

    });

});
