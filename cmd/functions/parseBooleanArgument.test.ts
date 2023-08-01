// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { parseBooleanArgument } from "./parseBooleanArgument";

describe('parseBooleanArgument', () => {

    describe('with valid input', () => {

        it('returns true when "true" is given', () => {
            const argName = '--foo';
            const value = 'true';
            const result = parseBooleanArgument(argName, value);
            expect(result).toBe(true);
        });

        it('returns false when "false" is given', () => {
            const argName = '--foo';
            const value = 'false';
            const result = parseBooleanArgument(argName, value);
            expect(result).toBe(false);
        });

    });

    describe('with invalid input', () => {

        it('throws TypeError when a non-boolean string is given', () => {
            const argName = '--foo';
            const value = 'abc';
            expect(() => parseBooleanArgument(argName, value)).toThrow(TypeError);
        });

        it('throws TypeError when undefined is given', () => {
            const argName = '--foo';
            expect(() => parseBooleanArgument(argName, undefined as unknown as string)).toThrow(TypeError);
        });

    });

});
