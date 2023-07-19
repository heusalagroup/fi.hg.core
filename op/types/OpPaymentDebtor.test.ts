// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createOpPaymentDebtor, explainOpPaymentDebtor, explainOpPaymentDebtorOrUndefined, isOpPaymentDebtor, isOpPaymentDebtorOrUndefined, OpPaymentDebtor, parseOpPaymentDebtor } from "./OpPaymentDebtor";
import { CountryCode } from "../../types/CountryCode";

describe('OpPaymentDebtor', () => {

    const validDebtor: OpPaymentDebtor = {
        name: 'Test Name',
        iban: 'FI3859991620004143',
        address: {
            country: 'FI' as CountryCode,
            addressLine: ['a1', 'a2']
        }
    };

    const invalidDebtor = {
        name: 123,  // not a string
        iban: true, // not a string
        address: 'Not a valid address'  // not an OpAddress
    };

    describe('createOpPaymentDebtor', () => {
        it('should create a valid OpPaymentDebtor', () => {
            const creditor = createOpPaymentDebtor('Test Name', 'FI3859991620004143', validDebtor.address);
            expect(creditor).toEqual(validDebtor);
        });
    });

    describe('isOpPaymentDebtor', () => {
        it('should return true for valid OpPaymentDebtor', () => {
            expect(isOpPaymentDebtor(validDebtor)).toBe(true);
        });

        it('should return false for invalid OpPaymentDebtor', () => {
            expect(isOpPaymentDebtor(invalidDebtor)).toBe(false);
        });
    });

    describe('explainOpPaymentDebtor', () => {
        it('should return explanation for a valid OpPaymentDebtor', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentDebtor(validDebtor)).toBe('OK');
        });
    });

    describe('parseOpPaymentDebtor', () => {
        it('should return OpPaymentDebtor for a valid OpPaymentDebtor', () => {
            expect(parseOpPaymentDebtor(validDebtor)).toEqual(validDebtor);
        });

        it('should return undefined for an invalid OpPaymentDebtor', () => {
            expect(parseOpPaymentDebtor(invalidDebtor)).toBeUndefined();
        });
    });

    describe('isOpPaymentDebtorOrUndefined', () => {
        it('should return true for valid OpPaymentDebtor', () => {
            expect(isOpPaymentDebtorOrUndefined(validDebtor)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpPaymentDebtorOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid OpPaymentDebtor', () => {
            expect(isOpPaymentDebtorOrUndefined(invalidDebtor)).toBe(false);
        });
    });

    describe('explainOpPaymentDebtorOrUndefined', () => {
        it('should return explanation for a valid OpPaymentDebtor', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentDebtorOrUndefined(validDebtor)).toBe('OK');
        });

        it('should return explanation for undefined', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentDebtorOrUndefined(undefined)).toBe('OK');
        });
    });

});
