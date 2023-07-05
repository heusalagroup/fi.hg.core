// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailComission, explainPaytrailComission, isPaytrailComission, parsePaytrailComission } from "./PaytrailComission";

describe('PaytrailComission', () => {

    const validComission = {
        merchant: '695874',
        amount: 250
    };

    describe('createPaytrailComission', () => {

        it('should create a valid PaytrailComission object', () => {
            const result = createPaytrailComission(validComission.merchant, validComission.amount);
            expect(result).toEqual(validComission);
        });

    });

    describe('isPaytrailComission', () => {

        it('should return true for valid PaytrailComission objects', () => {
            expect(isPaytrailComission(validComission)).toBe(true);
        });

        it('should return false for invalid objects', () => {
            expect(isPaytrailComission({ ...validComission, unknownProperty: 'Test' })).toBe(false);
            expect(isPaytrailComission({})).toBe(false);
            expect(isPaytrailComission('string')).toBe(false);
            expect(isPaytrailComission(null)).toBe(false);
        });

    });

    describe('parsePaytrailComission', () => {

        it('should return PaytrailComission object if input is valid', () => {
            expect(parsePaytrailComission(validComission)).toEqual(validComission);
        });

        it('should return undefined if input is invalid', () => {
            expect(parsePaytrailComission({ ...validComission, unknownProperty: 'Test' })).toBeUndefined();
            expect(parsePaytrailComission({})).toBeUndefined();
            expect(parsePaytrailComission('string')).toBeUndefined();
            expect(parsePaytrailComission(null)).toBeUndefined();
        });

    });

    describe('explainPaytrailComission', () => {

        it('should return explanation OK for valid PaytrailComission objects', () => {
            expect(explainPaytrailComission(validComission)).toEqual('OK');
        });

        it('should return an explanation for invalid objects', () => {
            expect(explainPaytrailComission({})).toContain('property "merchant" not string');
            expect(explainPaytrailComission({ ...validComission, unknownProperty: 'Test' })).toContain('unknownProperty');
            expect(explainPaytrailComission({ merchant: 123, amount: 250 })).toContain('property "merchant" not string');
            expect(explainPaytrailComission({ merchant: '695874', amount: '250' })).toContain('property "amount" not number');
        });

    });

});
