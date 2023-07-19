// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createOpPaymentInstructedAmount, explainOpPaymentInstructedAmount, explainOpPaymentInstructedAmountOrUndefined, isOpPaymentInstructedAmount, isOpPaymentInstructedAmountOrUndefined, OpPaymentInstructedAmount, parseOpPaymentInstructedAmount } from "./OpPaymentInstructedAmount";
import { Currency } from "../../types/Currency";

describe('OpPaymentInstructedAmount', () => {
    const validPaymentAmount: OpPaymentInstructedAmount = {
        amount: '100.00',
        currency: 'USD' as Currency
    };

    const invalidPaymentAmount = {
        amount: 'Not a valid amount',
        currency: 'Not a valid currency'
    };

    describe('createOpPaymentInstructedAmount', () => {
        it('should create a valid OpPaymentInstructedAmount', () => {
            const paymentAmount = createOpPaymentInstructedAmount('100.00', 'USD' as Currency);
            expect(paymentAmount).toEqual(validPaymentAmount);
        });
    });

    describe('isOpPaymentInstructedAmount', () => {
        it('should return true for valid OpPaymentInstructedAmount', () => {
            expect(isOpPaymentInstructedAmount(validPaymentAmount)).toBe(true);
        });

        it('should return false for invalid OpPaymentInstructedAmount', () => {
            expect(isOpPaymentInstructedAmount(invalidPaymentAmount)).toBe(false);
        });
    });

    describe('explainOpPaymentInstructedAmount', () => {
        it('should return explanation for a valid OpPaymentInstructedAmount', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentInstructedAmount(validPaymentAmount)).toBe('OK');
        });
    });

    describe('parseOpPaymentInstructedAmount', () => {
        it('should return OpPaymentInstructedAmount for a valid OpPaymentInstructedAmount', () => {
            expect(parseOpPaymentInstructedAmount(validPaymentAmount)).toEqual(validPaymentAmount);
        });

        it('should return undefined for an invalid OpPaymentInstructedAmount', () => {
            expect(parseOpPaymentInstructedAmount(invalidPaymentAmount)).toBeUndefined();
        });
    });

    describe('isOpPaymentInstructedAmountOrUndefined', () => {
        it('should return true for valid OpPaymentInstructedAmount', () => {
            expect(isOpPaymentInstructedAmountOrUndefined(validPaymentAmount)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpPaymentInstructedAmountOrUndefined(undefined)).toBe(true);
        });

        it('should return false for invalid OpPaymentInstructedAmount', () => {
            expect(isOpPaymentInstructedAmountOrUndefined(invalidPaymentAmount)).toBe(false);
        });
    });

    describe('explainOpPaymentInstructedAmountOrUndefined', () => {
        it('should return explanation for a valid OpPaymentInstructedAmount', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentInstructedAmountOrUndefined(validPaymentAmount)).toBe('OK');
        });

        it('should return explanation for undefined', () => {
            // replace 'OK' with what you actually expect
            expect(explainOpPaymentInstructedAmountOrUndefined(undefined)).toBe('OK');
        });
    });

});
