// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { EXPLAIN_OK } from "../../types/explain";
import { createOpRefundOriginalObject, explainOpRefundOriginalObject, explainOpRefundOriginalObjectOrUndefined, isOpRefundOriginalObject, isOpRefundOriginalObjectOrUndefined, OpRefundOriginalObject, parseOpRefundOriginalObject } from "./OpRefundOriginalObject";

describe('OpRefundOriginalObject', () => {

    const validObject: OpRefundOriginalObject = {
        archiveId: "20190524593156999999999999999999999",
        message: "Less money, fewer problems",
        reference: "00000000000000482738",
        amount: "12.35",
        bookingDate: "2019-05-12",
        debtorName: "Debbie Debtor"
    };

    describe('createOpRefundOriginalObject', () => {
        it('creates a valid object', () => {
            const result = createOpRefundOriginalObject(
                "20190524593156999999999999999999999",
                "Less money, fewer problems",
                "00000000000000482738",
                "12.35",
                "2019-05-12",
                "Debbie Debtor"
            );
            expect(result).toEqual(validObject);
        });
    });

    describe('isOpRefundOriginalObject', () => {
        it('returns true for valid object', () => {
            expect(isOpRefundOriginalObject(validObject)).toBeTruthy();
        });

        it('returns false for invalid object', () => {
            const invalidObject = { ...validObject, archiveId: 12345 }; // made archiveId a number
            expect(isOpRefundOriginalObject(invalidObject)).toBeFalsy();
        });
    });

    describe('explainOpRefundOriginalObject', () => {
        it('explains valid object as OK', () => {
            expect(explainOpRefundOriginalObject(validObject)).toBe(EXPLAIN_OK);
        });

        it('provides explanations for invalid properties', () => {
            const invalidObject = { ...validObject, amount: 100 }; // made amount a number
            expect(explainOpRefundOriginalObject(invalidObject)).toContain('property "amount"');
        });
    });

    describe('parseOpRefundOriginalObject', () => {
        it('parses and returns valid object', () => {
            expect(parseOpRefundOriginalObject(validObject)).toEqual(validObject);
        });

        it('returns undefined for invalid object', () => {
            const invalidObject = { ...validObject, archiveId: 12345 }; // made archiveId a number
            expect(parseOpRefundOriginalObject(invalidObject)).toBeUndefined();
        });
    });

    describe('isOpRefundOriginalObjectOrUndefined', () => {
        it('returns true for valid object', () => {
            expect(isOpRefundOriginalObjectOrUndefined(validObject)).toBeTruthy();
        });

        it('returns true for undefined', () => {
            expect(isOpRefundOriginalObjectOrUndefined(undefined)).toBeTruthy();
        });

        it('returns false for invalid object', () => {
            const invalidObject = { ...validObject, archiveId: 12345 }; // made archiveId a number
            expect(isOpRefundOriginalObjectOrUndefined(invalidObject)).toBeFalsy();
        });
    });

    describe('explainOpRefundOriginalObjectOrUndefined', () => {
        it('explains valid object as OK', () => {
            expect(explainOpRefundOriginalObjectOrUndefined(validObject)).toBe(EXPLAIN_OK);
        });

        it('explains undefined as OK', () => {
            expect(explainOpRefundOriginalObjectOrUndefined(undefined)).toBe(EXPLAIN_OK);
        });

        it('provides explanations for invalid properties', () => {
            const invalidObject = { ...validObject, amount: 100 }; // made amount a number
            expect(explainOpRefundOriginalObjectOrUndefined(invalidObject)).toContain('OpRefundOriginalObject');
        });
    });

});
