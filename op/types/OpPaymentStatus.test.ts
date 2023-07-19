// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainOpPaymentStatus, explainOpPaymentStatusOrUndefined, isOpPaymentStatus, isOpPaymentStatusOrUndefined, OpPaymentStatus, parseOpPaymentStatus, stringifyOpPaymentStatus } from "./OpPaymentStatus";

describe('OpPaymentStatus', () => {

    const validStatuses = [OpPaymentStatus.PROCESSING, OpPaymentStatus.PROCESSED];
    const invalidStatus = 'UNKNOWN';

    describe('isOpPaymentStatus', () => {
        it('should return true for valid OpPaymentStatus', () => {
            validStatuses.forEach((status) => {
                expect(isOpPaymentStatus(status)).toBe(true);
            });
        });

        it('should return false for invalid OpPaymentStatus', () => {
            expect(isOpPaymentStatus(invalidStatus)).toBe(false);
        });
    });

    describe('explainOpPaymentStatus', () => {
        it('should return expected explanation for valid and invalid statuses', () => {
            validStatuses.forEach((status) => {
                // replace 'OK' with the actual expected explanation
                expect(explainOpPaymentStatus(status)).toBe('OK');
            });

            // replace 'OK' with the actual expected explanation for invalid case
            expect(explainOpPaymentStatus(invalidStatus)).toBe('incorrect enum value "UNKNOWN" for OpPaymentStatus: Accepted values PROCESSING, PROCESSED');
        });
    });

    describe('stringifyOpPaymentStatus', () => {
        it('should return correct string representation for valid OpPaymentStatus', () => {
            validStatuses.forEach((status) => {
                expect(stringifyOpPaymentStatus(status)).toBe(status);
            });
        });
    });

    describe('parseOpPaymentStatus', () => {
        it('should parse valid string representation to corresponding OpPaymentStatus', () => {
            validStatuses.forEach((status) => {
                expect(parseOpPaymentStatus(status)).toBe(status);
            });
        });

        it('should return undefined for invalid string representation', () => {
            expect(parseOpPaymentStatus(invalidStatus)).toBeUndefined();
        });
    });

    describe('isOpPaymentStatusOrUndefined', () => {
        it('should return true for valid OpPaymentStatus or undefined', () => {
            validStatuses.forEach((status) => {
                expect(isOpPaymentStatusOrUndefined(status)).toBe(true);
            });
            expect(isOpPaymentStatusOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid OpPaymentStatus', () => {
            expect(isOpPaymentStatusOrUndefined(invalidStatus)).toBe(false);
        });
    });

    describe('explainOpPaymentStatusOrUndefined', () => {
        it('should return expected explanation for valid, invalid, and undefined statuses', () => {
            validStatuses.forEach((status) => {
                // replace 'OK' with the actual expected explanation
                expect(explainOpPaymentStatusOrUndefined(status)).toBe('OK');
            });

            // replace 'OK' with the actual expected explanation for invalid case
            expect(explainOpPaymentStatusOrUndefined(invalidStatus)).toBe('not OpPaymentStatus or undefined');

            // replace 'OK' with the actual expected explanation for undefined case
            expect(explainOpPaymentStatusOrUndefined(undefined)).toBe('OK');
        });
    });
});
