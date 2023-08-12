// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createCountry, isCountry, parseCountry } from "./Country";
import { CountryCode } from "./CountryCode";
import { Sovereignty } from "./Sovereignty";

describe('Country', () => {

    describe('createCountry', () => {

        it('should return a country object', () => {
            const country = createCountry(
                CountryCode.AF,
                Sovereignty.UN_MEMBER_STATE,
                'AFG',
                4,
                'Kabul',
                '.af'
            );

            expect(country).toEqual({
                sovereignty: Sovereignty.UN_MEMBER_STATE,
                iso2: CountryCode.AF,
                iso3: 'AFG',
                num: 4,
                subdivision: 'Kabul',
                tld: '.af'
            });

        });

    });

    describe('isCountry', () => {

        it('should return true for valid country objects', () => {
            const country = createCountry(
                CountryCode.AF,
                Sovereignty.UN_MEMBER_STATE,
                'AFG',
                4,
                'Kabul',
                '.af'
            );

            expect(isCountry(country)).toBe(true);
        });

        it('should return false for invalid country objects', () => {
            expect(isCountry('not a country')).toBe(false);
            expect(isCountry(123)).toBe(false);
            expect(isCountry(null)).toBe(false);
            expect(isCountry(undefined)).toBe(false);
        });

    });

    describe('parseCountry', () => {

        it('should return the country object for valid input', () => {
            const country = createCountry(
                CountryCode.AF,
                Sovereignty.UN_MEMBER_STATE,
                'AFG',
                4,
                'Kabul',
                '.af'
            );

            expect(parseCountry(country)).toEqual(country);
        });

        it('should return undefined for invalid input', () => {
            expect(parseCountry('not a country')).toBeUndefined();
            expect(parseCountry(123)).toBeUndefined();
            expect(parseCountry(null)).toBeUndefined();
            expect(parseCountry(undefined)).toBeUndefined();
        });

    });

});
