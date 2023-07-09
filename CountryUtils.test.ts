// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { CountryUtils } from "./CountryUtils";
import { CountryCode } from "./types/CountryCode";
import { isArray } from "./types/Array";

describe('CountryUtils', () => {

    const mockTranslationFunction = (key: string) => `lang.${key}`;  // simple mock translation function for testing

    describe('getCountryList', () => {
        it('should return a list of Country objects', () => {
            const countries = CountryUtils.getCountryList();
            expect(countries).toBeDefined();
            expect(isArray(countries)).toBe(true);
        });
    });

    describe('getCountryCodeList', () => {
        it('should return a list of CountryCodes', () => {
            const countryCodes = CountryUtils.getCountryCodeList();
            expect(countryCodes).toBeDefined();
            expect(isArray(countryCodes)).toBe(true);
        });
    });

    describe('createCountryByCode', () => {
        it('should create Country object for valid CountryCode', () => {
            const country = CountryUtils.createCountryByCode(CountryCode.AF);
            expect(country).toBeDefined();
            expect(country.iso2).toEqual(CountryCode.AF);
        });

        it('should throw an error for unknown CountryCode', () => {
            expect(() => CountryUtils.createCountryByCode('UnknownCode' as CountryCode)).toThrowError();
        });
    });

    describe('createCountryAutoCompleteValues', () => {
        it('should create an array of autocomplete mappings', () => {
            const countryCodes = CountryUtils.getCountryCodeList();
            const autoCompleteMappings = CountryUtils.createCountryAutoCompleteValues(countryCodes, mockTranslationFunction);
            expect(autoCompleteMappings).toBeDefined();
            expect(isArray(autoCompleteMappings)).toBe(true);
        });
    });

    describe('parseCountry', () => {

        it('should return Country object for a valid country name', () => {
            const countryName = 'af';
            const country = CountryUtils.parseCountry(countryName, mockTranslationFunction);
            expect(country).toBeDefined();
            expect(country?.iso2).toEqual(CountryCode.AF);
        });

        it('should return Country object for a valid translated country name', () => {
            const countryName = 'lang.countryCode.af.name';
            const country = CountryUtils.parseCountry(countryName, mockTranslationFunction);
            expect(country).toBeDefined();
            expect(country?.iso2).toEqual(CountryCode.AF);
        });

        it('should return undefined for an unknown country name', () => {
            const countryName = 'UnknownCountry';
            const country = CountryUtils.parseCountry(countryName, mockTranslationFunction);
            expect(country).toBeUndefined();
        });

    });

});
