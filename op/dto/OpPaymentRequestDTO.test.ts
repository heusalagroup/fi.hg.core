// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { CountryCode } from "../../types/CountryCode";
import { Currency } from "../../types/Currency";
import { createOpPaymentRequestDTO, explainOpPaymentRequestDTO, explainOpPaymentRequestDTOOrUndefined, isOpPaymentRequestDTO, isOpPaymentRequestDTOOrUndefined, OpPaymentRequestDTO, parseOpPaymentRequestDTO } from "./OpPaymentRequestDTO";
import { OpPaymentCreditor } from "../types/OpPaymentCreditor";

describe('OpPaymentRequestDTO', () => {

    const validPaymentRequest: OpPaymentRequestDTO = {
        instructionId: '123456',
        creditor: {
            name: 'Test Name',
            iban: 'FI3859991620004143',
            address: {
                country: 'FI' as CountryCode,
                addressLine: ['a1', 'a2']
            }
        } as OpPaymentCreditor,
        debtor: {
            name: 'Test Name',
            iban: 'FI3859991620004143',
            address: {
                country: 'FI' as CountryCode,
                addressLine: ['a1', 'a2']
            }
        },
        instructedAmount: {
            amount: '100.00',
            currency: 'USD' as Currency,
        }
    };

    const invalidPaymentRequest = { unexpectedKey: 'unexpectedValue' };

    describe('createOpPaymentRequestDTO', () => {
        it('should create an OpPaymentRequestDTO', () => {
            const paymentRequest = createOpPaymentRequestDTO(
                validPaymentRequest.instructionId,
                validPaymentRequest.creditor,
                validPaymentRequest.debtor,
                validPaymentRequest.instructedAmount,
            );
            expect(paymentRequest).toEqual(validPaymentRequest);
        });
    });

    describe('isOpPaymentRequestDTO', () => {
        it('should return true for valid OpPaymentRequestDTO', () => {
            expect(isOpPaymentRequestDTO(validPaymentRequest)).toBe(true);
        });

        it('should return false for invalid OpPaymentRequestDTO', () => {
            expect(isOpPaymentRequestDTO(invalidPaymentRequest)).toBe(false);
        });
    });

    describe('explainOpPaymentRequestDTO', () => {
        it('should return expected explanation for valid and invalid requests', () => {
            // replace 'OK' with the actual expected explanation
            expect(explainOpPaymentRequestDTO(validPaymentRequest)).toBe('OK');
            expect(explainOpPaymentRequestDTO(invalidPaymentRequest)).toContain('Value had extra properties: unexpectedKey');
        });
    });

    describe('parseOpPaymentRequestDTO', () => {
        it('should parse valid object to OpPaymentRequestDTO', () => {
            expect(parseOpPaymentRequestDTO(validPaymentRequest)).toEqual(validPaymentRequest);
        });

        it('should return undefined for invalid object', () => {
            expect(parseOpPaymentRequestDTO(invalidPaymentRequest)).toBeUndefined();
        });
    });

    describe('isOpPaymentRequestDTOOrUndefined', () => {
        it('should return true for valid OpPaymentRequestDTO or undefined', () => {
            expect(isOpPaymentRequestDTOOrUndefined(validPaymentRequest)).toBe(true);
            expect(isOpPaymentRequestDTOOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid OpPaymentRequestDTO', () => {
            expect(isOpPaymentRequestDTOOrUndefined(invalidPaymentRequest)).toBe(false);
        });
    });

    describe('explainOpPaymentRequestDTOOrUndefined', () => {
        it('should return expected explanation for valid, invalid, and undefined requests', () => {
            // replace 'OK' with the actual expected explanation
            expect(explainOpPaymentRequestDTOOrUndefined(validPaymentRequest)).toBe('OK');
            expect(explainOpPaymentRequestDTOOrUndefined(invalidPaymentRequest)).toBe('not OpPaymentRequestDTO or undefined');
            expect(explainOpPaymentRequestDTOOrUndefined(undefined)).toBe('OK');
        });
    });

});
