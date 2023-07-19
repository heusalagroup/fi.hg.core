// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createOpPaymentCreditor, explainOpPaymentCreditor, explainOpPaymentCreditorOrUndefined, isOpPaymentCreditor, isOpPaymentCreditorOrUndefined, OpPaymentCreditor, parseOpPaymentCreditor } from "./OpPaymentCreditor";
import { CountryCode } from "../../types/CountryCode";

describe('OpPaymentCreditor', () => {

    const validCreditor: OpPaymentCreditor = {
        name: 'Test Name',
        iban: 'FI3859991620004143',
        address: {
            country: 'FI' as CountryCode,
            addressLine: ['a1', 'a2']
        }
    };

    const invalidCreditor = {
        name: 123,  // not a string
        iban: true, // not a string
        address: 'Not a valid address'  // not an OpAddress
    };

    describe('createOpPaymentCreditor', () => {
        it('should create a valid OpPaymentCreditor', () => {
            const creditor = createOpPaymentCreditor('Test Name', 'FI3859991620004143', validCreditor.address);
            expect(creditor).toEqual(validCreditor);
        });
    });

    describe('isOpPaymentCreditor', () => {
        it('should return true for valid OpPaymentCreditor', () => {
            expect(isOpPaymentCreditor(validCreditor)).toBe(true);
        });

        it('should return false for invalid OpPaymentCreditor', () => {
            expect(isOpPaymentCreditor(invalidCreditor)).toBe(false);
        });
    });

    describe('explainOpPaymentCreditor', () => {
        it('should return explanation for a valid OpPaymentCreditor', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentCreditor(validCreditor)).toBe('OK');
        });
    });

    describe('parseOpPaymentCreditor', () => {
        it('should return OpPaymentCreditor for a valid OpPaymentCreditor', () => {
            expect(parseOpPaymentCreditor(validCreditor)).toEqual(validCreditor);
        });

        it('should return undefined for an invalid OpPaymentCreditor', () => {
            expect(parseOpPaymentCreditor(invalidCreditor)).toBeUndefined();
        });
    });

    describe('isOpPaymentCreditorOrUndefined', () => {
        it('should return true for valid OpPaymentCreditor', () => {
            expect(isOpPaymentCreditorOrUndefined(validCreditor)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpPaymentCreditorOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid OpPaymentCreditor', () => {
            expect(isOpPaymentCreditorOrUndefined(invalidCreditor)).toBe(false);
        });
    });

    describe('explainOpPaymentCreditorOrUndefined', () => {
        it('should return explanation for a valid OpPaymentCreditor', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentCreditorOrUndefined(validCreditor)).toBe('OK');
        });

        it('should return explanation for undefined', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentCreditorOrUndefined(undefined)).toBe('OK');
        });
    });

});
