// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainPaytrailCurrency, isPaytrailCurrency, parsePaytrailCurrency, PaytrailCurrency, stringifyPaytrailCurrency } from "./PaytrailCurrency";

describe('PaytrailCurrency functions', () => {

    const validCurrency = PaytrailCurrency.EUR;

    describe('isPaytrailCurrency', () => {
        it('should return true for valid PaytrailCurrency values', () => {
            expect(isPaytrailCurrency(validCurrency)).toBe(true);
        });

        it('should return false for invalid values', () => {
            expect(isPaytrailCurrency('USD')).toBe(false);
            expect(isPaytrailCurrency(123)).toBe(false);
            expect(isPaytrailCurrency({})).toBe(false);
        });
    });

    describe('explainPaytrailCurrency', () => {
        it('should return explanation OK for valid PaytrailCurrency values', () => {
            expect(explainPaytrailCurrency(validCurrency)).toEqual('OK');
        });

        it('should return an explanation for invalid values', () => {
            expect(explainPaytrailCurrency('USD')).toContain('incorrect enum value');
        });
    });

    describe('stringifyPaytrailCurrency', () => {
        it('should correctly convert PaytrailCurrency to string', () => {
            expect(stringifyPaytrailCurrency(validCurrency)).toEqual('EUR');
        });
    });

    describe('parsePaytrailCurrency', () => {

        it('should correctly parse string into PaytrailCurrency', () => {
            expect(parsePaytrailCurrency('EUR')).toEqual(PaytrailCurrency.EUR);
            expect(parsePaytrailCurrency('eur')).toEqual(PaytrailCurrency.EUR);
        });

        it('should return undefined for invalid strings', () => {
            expect(parsePaytrailCurrency('USD')).toBeUndefined();
            expect(parsePaytrailCurrency(123)).toBeUndefined();
            expect(parsePaytrailCurrency({})).toBeUndefined();
        });

    });

});
