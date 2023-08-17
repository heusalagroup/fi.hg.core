// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainOpRefundPaymentType, explainOpRefundPaymentTypeOrUndefined, isOpRefundPaymentType, isOpRefundPaymentTypeOrUndefined, OpRefundPaymentType, parseOpRefundPaymentType, stringifyOpRefundPaymentType } from "./OpRefundPaymentType";

describe('OpRefundPaymentType functions', () => {
    describe('isOpRefundPaymentType', () => {
        it('should return true for valid payment types', () => {
            expect(isOpRefundPaymentType(OpRefundPaymentType.SEPA_CREDIT_TRANSFER)).toBe(true);
            expect(isOpRefundPaymentType(OpRefundPaymentType.SCT_INST)).toBe(true);
        });

        it('should return false for invalid payment types', () => {
            expect(isOpRefundPaymentType("RANDOM_VALUE")).toBe(false);
            expect(isOpRefundPaymentType(undefined)).toBe(false);
            expect(isOpRefundPaymentType(null)).toBe(false);
        });
    });

    describe('explainOpRefundPaymentType', () => {
        it('should explain valid payment types correctly', () => {
            expect(explainOpRefundPaymentType(OpRefundPaymentType.SEPA_CREDIT_TRANSFER)).toBe('OK');
        });

        it('should explain invalid payment types correctly', () => {
            const invalidValue = "RANDOM_VALUE";
            expect(explainOpRefundPaymentType(invalidValue)).toBe(`incorrect enum value "${invalidValue}" for OpRefundPaymentType: Accepted values SEPA_CREDIT_TRANSFER, SCT_INST`);
        });
    });

    describe('stringifyOpRefundPaymentType', () => {
        it('should stringify valid payment types correctly', () => {
            expect(stringifyOpRefundPaymentType(OpRefundPaymentType.SEPA_CREDIT_TRANSFER)).toBe("SEPA_CREDIT_TRANSFER");
        });

        it('should throw error for invalid payment types', () => {
            expect(() => stringifyOpRefundPaymentType("RANDOM_VALUE" as any)).toThrow("Unsupported enum value: RANDOM_VALUE");
        });
    });

    describe('parseOpRefundPaymentType', () => {

        it('should parse valid payment types correctly', () => {
            expect(parseOpRefundPaymentType("SEPA_CREDIT_TRANSFER")).toBe(OpRefundPaymentType.SEPA_CREDIT_TRANSFER);
        });

        it('should return undefined for invalid payment types', () => {
            expect(parseOpRefundPaymentType("RANDOM_VALUE")).toBeUndefined();
        });

        it('should parse ignoring dashes', () => {
            expect(parseOpRefundPaymentType("SEPA-CREDIT-TRANSFER")).toBe(OpRefundPaymentType.SEPA_CREDIT_TRANSFER);
        });

    });

    describe('isOpRefundPaymentTypeOrUndefined', () => {
        it('should return true for valid payment types or undefined', () => {
            expect(isOpRefundPaymentTypeOrUndefined(OpRefundPaymentType.SEPA_CREDIT_TRANSFER)).toBe(true);
            expect(isOpRefundPaymentTypeOrUndefined(undefined)).toBe(true);
        });

        it('should return false for other invalid types', () => {
            expect(isOpRefundPaymentTypeOrUndefined("RANDOM_VALUE")).toBe(false);
            expect(isOpRefundPaymentTypeOrUndefined(null)).toBe(false);
        });
    });

    describe('explainOpRefundPaymentTypeOrUndefined', () => {

        it('should explain valid payment type', () => {
            expect(explainOpRefundPaymentTypeOrUndefined(OpRefundPaymentType.SEPA_CREDIT_TRANSFER)).toBe('OK');
        });

        it('should explain valid payment type for undefined', () => {
            expect(explainOpRefundPaymentTypeOrUndefined(undefined)).toBe('OK');
        });

        it('should provide explanations for other invalid values', () => {
            expect(explainOpRefundPaymentTypeOrUndefined("RANDOM_VALUE")).toBe("not OpRefundPaymentType or undefined");
        });

    });
});
