// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainOpRefundStatus, explainOpRefundStatusOrUndefined, isOpRefundStatus, isOpRefundStatusOrUndefined, OpRefundStatus, parseOpRefundStatus, stringifyOpRefundStatus } from "./OpRefundStatus";

describe('OpRefundStatus functions', () => {
    describe('isOpRefundStatus', () => {
        it('should return true for valid statuses', () => {
            expect(isOpRefundStatus(OpRefundStatus.PROCESSING)).toBe(true);
            expect(isOpRefundStatus(OpRefundStatus.PROCESSED)).toBe(true);
        });

        it('should return false for invalid statuses', () => {
            expect(isOpRefundStatus("RANDOM_VALUE")).toBe(false);
            expect(isOpRefundStatus(undefined)).toBe(false);
            expect(isOpRefundStatus(null)).toBe(false);
        });
    });

    describe('explainOpRefundStatus', () => {
        it('should explain valid statuses correctly', () => {
            expect(explainOpRefundStatus(OpRefundStatus.PROCESSING)).toBe('OK');
        });

        it('should explain invalid statuses correctly', () => {
            const invalidValue = "RANDOM_VALUE";
            expect(explainOpRefundStatus(invalidValue)).toBe(`incorrect enum value "${invalidValue}" for RefundStatus: Accepted values PROCESSING, PROCESSED`);
        });
    });

    describe('stringifyOpRefundStatus', () => {
        it('should stringify valid statuses correctly', () => {
            expect(stringifyOpRefundStatus(OpRefundStatus.PROCESSING)).toBe("PROCESSING");
        });

        it('should throw error for invalid statuses', () => {
            expect(() => stringifyOpRefundStatus("RANDOM_VALUE" as any)).toThrow("Unsupported enum value: RANDOM_VALUE");
        });
    });

    describe('parseOpRefundStatus', () => {
        it('should parse valid statuses correctly', () => {
            expect(parseOpRefundStatus("PROCESSING")).toBe(OpRefundStatus.PROCESSING);
        });

        it('should return undefined for invalid statuses', () => {
            expect(parseOpRefundStatus("RANDOM_VALUE")).toBeUndefined();
        });

        it('should parse ignoring spaces and dashes', () => {
            expect(parseOpRefundStatus("PRO CES SING")).toBe(OpRefundStatus.PROCESSING);
            expect(parseOpRefundStatus("PRO-CES-SING")).toBe(OpRefundStatus.PROCESSING);
        });
    });

    describe('isOpRefundStatusOrUndefined', () => {
        it('should return true for valid statuses or undefined', () => {
            expect(isOpRefundStatusOrUndefined(OpRefundStatus.PROCESSING)).toBe(true);
            expect(isOpRefundStatusOrUndefined(undefined)).toBe(true);
        });

        it('should return false for other invalid types', () => {
            expect(isOpRefundStatusOrUndefined("RANDOM_VALUE")).toBe(false);
            expect(isOpRefundStatusOrUndefined(null)).toBe(false);
        });
    });

    describe('explainOpRefundStatusOrUndefined', () => {
        it('should explain valid statuses or undefined correctly', () => {
            expect(explainOpRefundStatusOrUndefined(OpRefundStatus.PROCESSING)).toBe('OK');
            expect(explainOpRefundStatusOrUndefined(undefined)).toBe('OK');
        });

        it('should provide explanations for other invalid values', () => {
            expect(explainOpRefundStatusOrUndefined("RANDOM_VALUE")).toBe("not RefundStatus or undefined");
        });
    });

});
