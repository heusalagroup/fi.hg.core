// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { CountryCode, isCountryCode, parseCountryCode } from "./CountryCode";
import { values } from "../functions/values";
import { forEach } from "../functions/forEach";

const ALL_COUNTRY_CODES : string[] = values(CountryCode);

describe('CountryCode', () => {

    describe('isCountryCode', () => {

        forEach(
            ALL_COUNTRY_CODES,
            (code) => {
                it(`should return true for valid country ${code}`, () => {
                    expect(isCountryCode(code)).toBe(true);
                });
            }
        );

        it('should return false for invalid country codes', () => {
            expect(isCountryCode('XX')).toBe(false);
            expect(isCountryCode(123)).toBe(false);
            expect(isCountryCode(null)).toBe(false);
            expect(isCountryCode(undefined)).toBe(false);
        });
    });

    describe('parseCountryCode', () => {

        forEach(
            ALL_COUNTRY_CODES,
            (code) => {
                it(`should return the country code for ${code}`, () => {
                    expect(parseCountryCode(code)).toBe(code);
                });

            }
        );

        it('should return undefined for invalid input', () => {
            expect(parseCountryCode('XX')).toBeUndefined();
            expect(parseCountryCode(123)).toBeUndefined();
            expect(parseCountryCode(null)).toBeUndefined();
            expect(parseCountryCode(undefined)).toBeUndefined();
        });

    });

});
