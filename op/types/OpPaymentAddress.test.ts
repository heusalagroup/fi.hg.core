// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createOpAddress, explainOpAddress, explainOpAddressOrUndefined, isOpAddress, isOpAddressOrUndefined, OpAddress, parseOpAddress } from "./OpPaymentAddress";
import { CountryCode } from "../../types/CountryCode";

describe('OpAddress', () => {
    const validAddress: OpAddress = {
        country: 'FI' as CountryCode,
        addressLine: ['Street 1', 'Apartment 2']
    };

    const invalidAddress = {
        country: 'Not a country',
        addressLine: 'Not an address line'
    };

    describe('createOpAddress', () => {
        it('should create a valid OpAddress', () => {
            const address = createOpAddress('FI' as CountryCode, ['Street 1', 'Apartment 2']);
            expect(address).toEqual(validAddress);
        });
    });

    describe('isOpAddress', () => {
        it('should return true for valid OpAddress', () => {
            expect(isOpAddress(validAddress)).toBe(true);
        });

        it('should return false for invalid OpAddress', () => {
            expect(isOpAddress(invalidAddress)).toBe(false);
        });
    });

    describe('explainOpAddress', () => {
        it('should return explanation for a valid OpAddress', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpAddress(validAddress)).toBe('OK');
        });
    });

    describe('parseOpAddress', () => {
        it('should return OpAddress for a valid OpAddress', () => {
            expect(parseOpAddress(validAddress)).toEqual(validAddress);
        });

        it('should return undefined for an invalid OpAddress', () => {
            expect(parseOpAddress(invalidAddress)).toBeUndefined();
        });
    });

    describe('isOpAddressOrUndefined', () => {
        it('should return true for valid OpAddress', () => {
            expect(isOpAddressOrUndefined(validAddress)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpAddressOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid OpAddress', () => {
            expect(isOpAddressOrUndefined(invalidAddress)).toBe(false);
        });
    });

    describe('explainOpAddressOrUndefined', () => {
        it('should return explanation for a valid OpAddress', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpAddressOrUndefined(validAddress)).toBe('OK');
        });

        it('should return explanation for undefined', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpAddressOrUndefined(undefined)).toBe('OK');
        });
    });

});
