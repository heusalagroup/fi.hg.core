// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { EXPLAIN_OK } from "../../types/explain";
import { createOpRefundRequestDTO, explainOpRefundRequestDTO, explainOpRefundRequestDTOOrUndefined, isOpRefundRequestDTO, isOpRefundRequestDTOOrUndefined, OpRefundRequestDTO, parseOpRefundRequestDTO } from "./OpRefundRequestDTO";

describe('OpRefundRequestDTO', () => {

    const validDTO: OpRefundRequestDTO = {
        archiveId: "12345",
        amount: "100",
        message: "refund",
        accountIban: "FI4550009420888888",
        transactionDate: "2023-01-14",
        endToEndId: "12345-end2end"
    };

    describe('createOpRefundRequestDTO', () => {
        it('creates a valid DTO', () => {
            const result = createOpRefundRequestDTO(
                "12345", "100", "refund", "FI4550009420888888", "2023-01-14", "12345-end2end"
            );
            expect(result).toEqual(validDTO);
        });
    });

    describe('isOpRefundRequestDTO', () => {
        it('returns true for valid DTO', () => {
            expect(isOpRefundRequestDTO(validDTO)).toBeTruthy();
        });

        it('returns false for invalid DTO', () => {
            const invalidDTO = { ...validDTO, archiveId: 12345 }; // made archiveId a number
            expect(isOpRefundRequestDTO(invalidDTO)).toBeFalsy();
        });
    });

    describe('explainOpRefundRequestDTO', () => {
        it('explains valid DTO as OK', () => {
            expect(explainOpRefundRequestDTO(validDTO)).toBe(EXPLAIN_OK);
        });

        it('provides explanations for invalid properties', () => {
            const invalidDTO = { ...validDTO, amount: 100 }; // made amount a number
            expect(explainOpRefundRequestDTO(invalidDTO)).toContain('property "amount"');
        });
    });

    describe('parseOpRefundRequestDTO', () => {
        it('parses and returns valid DTO', () => {
            expect(parseOpRefundRequestDTO(validDTO)).toEqual(validDTO);
        });

        it('returns undefined for invalid DTO', () => {
            const invalidDTO = { ...validDTO, archiveId: 12345 }; // made archiveId a number
            expect(parseOpRefundRequestDTO(invalidDTO)).toBeUndefined();
        });
    });

    describe('isOpRefundRequestDTOOrUndefined', () => {
        it('returns true for valid DTO', () => {
            expect(isOpRefundRequestDTOOrUndefined(validDTO)).toBeTruthy();
        });

        it('returns true for undefined', () => {
            expect(isOpRefundRequestDTOOrUndefined(undefined)).toBeTruthy();
        });

        it('returns false for invalid DTO', () => {
            const invalidDTO = { ...validDTO, archiveId: 12345 }; // made archiveId a number
            expect(isOpRefundRequestDTOOrUndefined(invalidDTO)).toBeFalsy();
        });
    });

    describe('explainOpRefundRequestDTOOrUndefined', () => {
        it('explains valid DTO as OK', () => {
            expect(explainOpRefundRequestDTOOrUndefined(validDTO)).toBe(EXPLAIN_OK);
        });

        it('explains undefined as OK', () => {
            expect(explainOpRefundRequestDTOOrUndefined(undefined)).toBe(EXPLAIN_OK);
        });

        it('provides explanations for invalid properties', () => {
            const invalidDTO = { ...validDTO, amount: 100 }; // made amount a number
            expect(explainOpRefundRequestDTOOrUndefined(invalidDTO)).toContain('not OpPaymentRefundRequestDTO or undefined');
        });
    });

});
