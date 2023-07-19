// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainOpPaymentType, explainOpPaymentTypeOrUndefined, isOpPaymentType, isOpPaymentTypeOrUndefined, OpPaymentType, parseOpPaymentType, stringifyOpPaymentType } from "./OpPaymentType";

describe('OpPaymentType', () => {
    const validTypes = [OpPaymentType.SEPA_CREDIT_TRANSFER, OpPaymentType.SCT_INST];
    const invalidType = 'UNKNOWN';

    describe('isOpPaymentType', () => {
        it('should return true for valid OpPaymentType', () => {
            validTypes.forEach((type) => {
                expect(isOpPaymentType(type)).toBe(true);
            });
        });

        it('should return false for invalid OpPaymentType', () => {
            expect(isOpPaymentType(invalidType)).toBe(false);
        });
    });

    describe('explainOpPaymentType', () => {
        it('should return expected explanation for valid and invalid types', () => {
            validTypes.forEach((type) => {
                // replace 'OK' with the actual expected explanation
                expect(explainOpPaymentType(type)).toBe('OK');
            });

            // replace 'OK' with the actual expected explanation for invalid case
            expect(explainOpPaymentType(invalidType)).toBe('incorrect enum value "UNKNOWN" for OpPaymentType: Accepted values SEPA_CREDIT_TRANSFER, SCT_INST');
        });
    });

    describe('stringifyOpPaymentType', () => {
        it('should return correct string representation for valid OpPaymentType', () => {
            validTypes.forEach((type) => {
                expect(stringifyOpPaymentType(type)).toBe(type);
            });
        });
    });

    describe('parseOpPaymentType', () => {
        it('should parse valid string representation to corresponding OpPaymentType', () => {
            validTypes.forEach((type) => {
                expect(parseOpPaymentType(type)).toBe(type);
            });
        });

        it('should return undefined for invalid string representation', () => {
            expect(parseOpPaymentType(invalidType)).toBeUndefined();
        });
    });

    describe('isOpPaymentTypeOrUndefined', () => {
        it('should return true for valid OpPaymentType or undefined', () => {
            validTypes.forEach((type) => {
                expect(isOpPaymentTypeOrUndefined(type)).toBe(true);
            });
            expect(isOpPaymentTypeOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid OpPaymentType', () => {
            expect(isOpPaymentTypeOrUndefined(invalidType)).toBe(false);
        });
    });

    describe('explainOpPaymentTypeOrUndefined', () => {
        it('should return expected explanation for valid, invalid, and undefined types', () => {

            validTypes.forEach((type) => {
                // replace 'OK' with the actual expected explanation
                expect(explainOpPaymentTypeOrUndefined(type)).toBe('OK');
            });

            // replace 'OK' with the actual expected explanation for invalid case
            expect(explainOpPaymentTypeOrUndefined(invalidType)).toBe('not OpPaymentType or undefined');

            // replace 'OK' with the actual expected explanation for undefined case
            expect(explainOpPaymentTypeOrUndefined(undefined)).toBe('OK');
        });
    });
});
