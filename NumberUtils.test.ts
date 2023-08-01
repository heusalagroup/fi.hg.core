// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { NumberUtils } from "./NumberUtils";

describe('NumberUtils', () => {

    describe('#parseNumber', () => {

        it('returns a number when a valid string number is given', () => {
            const value = '123.45';
            const result = NumberUtils.parseNumber(value);
            expect(result).toEqual(123.45);
        });

        it('returns a number when a valid numeric value is given', () => {
            const value = 123.45;
            const result = NumberUtils.parseNumber(value);
            expect(result).toEqual(123.45);
        });

        it('returns undefined when undefined is given', () => {
            const result = NumberUtils.parseNumber(undefined);
            expect(result).toBeUndefined();
        });

        it('returns undefined when a non-numeric string is given', () => {
            const value = 'abc';
            const result = NumberUtils.parseNumber(value);
            expect(result).toBeUndefined();
        });

        it('returns undefined when NaN is given', () => {
            const value = NaN;
            const result = NumberUtils.parseNumber(value);
            expect(result).toBeUndefined();
        });

        it('returns undefined when a string with whitespaces only is given', () => {
            const value = '     ';
            const result = NumberUtils.parseNumber(value);
            expect(result).toBeUndefined();
        });

    });

});
