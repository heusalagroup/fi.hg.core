// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { OpRefundPaymentType } from "./OpRefundPaymentType";
import { createOpRefundRefundObject, explainOpRefundRefundObject, explainOpRefundRefundObjectOrUndefined, isOpRefundRefundObject, isOpRefundRefundObjectOrUndefined, OpRefundRefundObject, parseOpRefundRefundObject } from "./OpRefundRefundObject";
import { OpRefundStatus } from "./OpRefundStatus";

describe('OpRefundRefundObject functions', () => {

    const validObject: OpRefundRefundObject = {
        amount: "3.45",
        status: OpRefundStatus.PROCESSED,
        message: "MAKSUN PALAUTUS. Maksun tiedot: 01.01.2020 Your own refund message",
        currency: "EUR",
        archiveId: "20190524593156999999",
        debtorIban: "FI4550009420888888",
        bookingDate: "2019-05-12",
        paymentType: OpRefundPaymentType.SCT_INST,
        creditorName: "Cedric Creditor",
        transactionId: "A_50009420112088_2019-05-24_20190524593156999999_0",
        transactionDate: "2019-05-11",
        endToEndId: "544652-end2end"
    };

    describe('createOpRefundRefundObject', () => {
        it('should create a valid object', () => {
            const result = createOpRefundRefundObject(
                "3.45",
                OpRefundStatus.PROCESSED,
                "MAKSUN PALAUTUS. Maksun tiedot: 01.01.2020 Your own refund message",
                "EUR",
                "20190524593156999999",
                "FI4550009420888888",
                "2019-05-12",
                OpRefundPaymentType.SCT_INST,
                "Cedric Creditor",
                "A_50009420112088_2019-05-24_20190524593156999999_0",
                "2019-05-11",
                "544652-end2end"
            );

            expect(result).toEqual(validObject);
        });
    });

    describe('isOpRefundRefundObject', () => {
        it('should return true for a valid object', () => {
            expect(isOpRefundRefundObject(validObject)).toBe(true);
        });

        it('should return false for an invalid object', () => {
            const invalidObject = { ...validObject, amount: 12345 }; // changed amount to a number
            expect(isOpRefundRefundObject(invalidObject)).toBe(false);
        });
    });

    describe('explainOpRefundRefundObject', () => {

        it('should explain a valid object correctly', () => {
            expect(explainOpRefundRefundObject(validObject)).toContain('OK'); // Assuming "OK" is part of a valid explanation.
        });

        it('should provide explanations for invalid properties', () => {
            const invalidObject = { ...validObject, amount: 100 }; // changed amount to a number
            expect(explainOpRefundRefundObject(invalidObject)).toContain('property "amount"');
        });

    });

    describe('parseOpRefundRefundObject', () => {
        it('should parse and return a valid object', () => {
            expect(parseOpRefundRefundObject(validObject)).toEqual(validObject);
        });

        it('should return undefined for an invalid object', () => {
            const invalidObject = { ...validObject, archiveId: 12345 }; // changed archiveId to a number
            expect(parseOpRefundRefundObject(invalidObject)).toBeUndefined();
        });
    });

    describe('isOpRefundRefundObjectOrUndefined', () => {
        it('should return true for a valid object', () => {
            expect(isOpRefundRefundObjectOrUndefined(validObject)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpRefundRefundObjectOrUndefined(undefined)).toBe(true);
        });

        it('should return false for an invalid object', () => {
            const invalidObject = { ...validObject, archiveId: 12345 }; // changed archiveId to a number
            expect(isOpRefundRefundObjectOrUndefined(invalidObject)).toBe(false);
        });
    });

    describe('explainOpRefundRefundObjectOrUndefined', () => {
        it('should explain a valid object correctly', () => {
            expect(explainOpRefundRefundObjectOrUndefined(validObject)).toContain('OK'); // Assuming "OK" is part of a valid explanation.
        });

        it('should explain undefined correctly', () => {
            expect(explainOpRefundRefundObjectOrUndefined(undefined)).toContain('OK');
        });

        it('should provide explanations for invalid properties', () => {
            const invalidObject = { ...validObject, amount: 100 }; // changed amount to a number
            expect(explainOpRefundRefundObjectOrUndefined(invalidObject)).toContain('OpRefundRefundObject');
        });
    });

});

