// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { OpRefundPaymentType } from "../types/OpRefundPaymentType";
import { OpRefundStatus } from "../types/OpRefundStatus";
import { createOpRefundResponseDTO, explainOpRefundResponseDTO, explainOpRefundResponseDTOOrUndefined, isOpRefundResponseDTO, isOpRefundResponseDTOOrUndefined, OpRefundResponseDTO, parseOpRefundResponseDTO } from "./OpRefundResponseDTO";

describe('OpRefundResponseDTO functions', () => {
    const validObject: OpRefundResponseDTO = {
        original: {
            archiveId: "20190524593156999999999999999999999",
            message: "Less money, fewer problems",
            reference: "00000000000000482738",
            amount: "12.35",
            bookingDate: "2019-05-12",
            debtorName: "Debbie Debtor"
        },
        refund: {
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
        }
    };

    describe('createOpRefundResponseDTO', () => {
        it('should create a valid object', () => {
            const result = createOpRefundResponseDTO(validObject.original, validObject.refund);
            expect(result).toEqual(validObject);
        });
    });

    describe('isOpRefundResponseDTO', () => {
        it('should return true for a valid object', () => {
            expect(isOpRefundResponseDTO(validObject)).toBe(true);
        });

        it('should return false for an invalid object', () => {
            const invalidObject = { ...validObject, original: null };
            expect(isOpRefundResponseDTO(invalidObject)).toBe(false);
        });
    });

    describe('explainOpRefundResponseDTO', () => {
        it('should explain a valid object correctly', () => {
            expect(explainOpRefundResponseDTO(validObject)).toContain('OK'); // Assuming "OK" is part of a valid explanation.
        });

        it('should provide explanations for invalid properties', () => {
            const invalidObject = { ...validObject, original: null };
            expect(explainOpRefundResponseDTO(invalidObject)).toContain('property "original"');
        });
    });

    describe('parseOpRefundResponseDTO', () => {
        it('should parse and return a valid object', () => {
            expect(parseOpRefundResponseDTO(validObject)).toEqual(validObject);
        });

        it('should return undefined for an invalid object', () => {
            const invalidObject = { ...validObject, refund: null };
            expect(parseOpRefundResponseDTO(invalidObject)).toBeUndefined();
        });
    });

    describe('isOpRefundResponseDTOOrUndefined', () => {
        it('should return true for a valid object', () => {
            expect(isOpRefundResponseDTOOrUndefined(validObject)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpRefundResponseDTOOrUndefined(undefined)).toBe(true);
        });

        it('should return false for an invalid object', () => {
            const invalidObject = { ...validObject, original: null };
            expect(isOpRefundResponseDTOOrUndefined(invalidObject)).toBe(false);
        });
    });

    describe('explainOpRefundResponseDTOOrUndefined', () => {
        it('should explain a valid object correctly', () => {
            expect(explainOpRefundResponseDTOOrUndefined(validObject)).toContain('OK');
        });

        it('should explain undefined correctly', () => {
            expect(explainOpRefundResponseDTOOrUndefined(undefined)).toContain('OK');
        });

        it('should provide explanations for invalid properties', () => {
            const invalidObject = { ...validObject, refund: null };
            expect(explainOpRefundResponseDTOOrUndefined(invalidObject)).toContain('OpRefundResponseDTO');
        });
    });

});
