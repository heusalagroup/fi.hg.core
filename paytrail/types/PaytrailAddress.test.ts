// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createPaytrailAddress, explainPaytrailAddress, isPaytrailAddress, isPaytrailAddressOrUndefined, parsePaytrailAddress, PaytrailAddress } from "./PaytrailAddress";

describe('PaytrailAddress', () => {

    const streetAddress = 'Fake Street 123';
    const postalCode = '00100';
    const city = 'Luleå';
    const county = 'Norbotten';
    const country = 'SE';

    const validAddress = {
        streetAddress,
        postalCode,
        city,
        country,
        county
    };

    describe('createPaytrailAddress', () => {

        it('should create a PaytrailAddress object when all inputs are valid', () => {
            const result: PaytrailAddress = createPaytrailAddress(streetAddress, postalCode, city, country, county);
            expect(result.streetAddress).toEqual(streetAddress);
            expect(result.postalCode).toEqual(postalCode);
            expect(result.city).toEqual(city);
            expect(result.country).toEqual(country);
            expect(result.county).toEqual(county);
        });

        it('should create a PaytrailAddress object with no county when county is undefined', () => {
            const result: PaytrailAddress = createPaytrailAddress(streetAddress, postalCode, city, country);
            expect(result.streetAddress).toEqual(streetAddress);
            expect(result.postalCode).toEqual(postalCode);
            expect(result.city).toEqual(city);
            expect(result.country).toEqual(country);
            expect(result.county).toBeUndefined();
        });

    });

    describe('isPaytrailAddress', () => {

        it('should return true for valid PaytrailAddress objects', () => {
            expect(isPaytrailAddress(validAddress)).toBe(true);
        });

        it('should return false for invalid objects', () => {
            expect(isPaytrailAddress({ ...validAddress, unknownProperty: 'Test' })).toBe(false);
            expect(isPaytrailAddress({})).toBe(false);
            expect(isPaytrailAddress('string')).toBe(false);
            expect(isPaytrailAddress(null)).toBe(false);
        });

    });

    describe('parsePaytrailAddress', () => {

        it('should return PaytrailAddress object if input is valid', () => {
            expect(parsePaytrailAddress(validAddress)).toEqual(validAddress);
        });

        it('should return undefined if input is invalid', () => {
            expect(parsePaytrailAddress({ ...validAddress, unknownProperty: 'Test' })).toBeUndefined();
            expect(parsePaytrailAddress({})).toBeUndefined();
            expect(parsePaytrailAddress('string')).toBeUndefined();
            expect(parsePaytrailAddress(null)).toBeUndefined();
        });

    });

    describe('isPaytrailAddressOrUndefined', () => {

        it('should return true for valid PaytrailAddress objects or undefined', () => {
            expect(isPaytrailAddressOrUndefined(validAddress)).toBe(true);
            expect(isPaytrailAddressOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid objects', () => {
            expect(isPaytrailAddressOrUndefined({ ...validAddress, unknownProperty: 'Test' })).toBe(false);
            expect(isPaytrailAddressOrUndefined({})).toBe(false);
            expect(isPaytrailAddressOrUndefined('string')).toBe(false);
            expect(isPaytrailAddressOrUndefined(null)).toBe(false);
        });

    });

    describe('explainPaytrailAddress', () => {

        it('should return explanation OK for valid PaytrailAddress objects', () => {
            expect(explainPaytrailAddress(validAddress)).toEqual('OK');
        });

        it('should return an explanation for invalid objects', () => {
            expect(explainPaytrailAddress({})).toContain('property "streetAddress" not string');
            expect(explainPaytrailAddress({ ...validAddress, unknownProperty: 'Test' })).toContain('unknownProperty');
            expect(explainPaytrailAddress({ streetAddress: 123, city: 'Sample City', postalCode: '12345', country: 'Sample Country', county: 'Sample County' })).toContain('property "streetAddress" not string');
        });

    });

});
