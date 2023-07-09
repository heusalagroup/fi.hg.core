// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency, explainCurrency, isCurrency, parseCurrency, stringifyCurrency } from './Currency';

describe('Currency', () => {

    describe('isCurrency', () => {

        it('should return true for valid currencies', () => {
            expect(isCurrency(Currency.EUR)).toBe(true);
            expect(isCurrency(Currency.USD)).toBe(true);
            expect(isCurrency(Currency.GBP)).toBe(true);
        });

        it('should return false for invalid currencies', () => {
            expect(isCurrency('XYZ')).toBe(false);
            expect(isCurrency(null)).toBe(false);
            expect(isCurrency(undefined)).toBe(false);
        });

    });

    describe('explainCurrency', () => {

        it('should return explanation for valid currencies', () => {
            expect(explainCurrency(Currency.EUR)).toContain('OK');
            expect(explainCurrency(Currency.USD)).toContain('OK');
            expect(explainCurrency(Currency.GBP)).toContain('OK');
        });

        it('should return explanation for invalid currencies', () => {
            expect(explainCurrency('XYZ')).toContain('incorrect enum value "XYZ" for Currency: Accepted values EUR, USD, GBP');
            expect(explainCurrency(null)).toContain('incorrect enum value "null" for Currency: Accepted values EUR, USD, GBP');
            expect(explainCurrency(undefined)).toContain('incorrect enum value "undefined" for Currency: Accepted values EUR, USD, GBP');
        });
    });

    describe('stringifyCurrency', () => {

        it('should return string representation for valid currencies', () => {
            expect(stringifyCurrency(Currency.EUR)).toBe('EUR');
            expect(stringifyCurrency(Currency.USD)).toBe('USD');
            expect(stringifyCurrency(Currency.GBP)).toBe('GBP');
        });

        it('should throw an error for invalid currencies', () => {
            expect(
                // @ts-ignore
                () => stringifyCurrency('XYZ')
            ).toThrowError('Unsupported Currency value');
        });

    });

    describe('parseCurrency', () => {

        it('should parse string to currency for valid strings', () => {
            expect(parseCurrency('EUR')).toBe(Currency.EUR);
            expect(parseCurrency('USD')).toBe(Currency.USD);
            expect(parseCurrency('GBP')).toBe(Currency.GBP);
        });

        it('should return undefined for invalid strings', () => {
            expect(parseCurrency('XYZ')).toBeUndefined();
            expect(parseCurrency(null)).toBeUndefined();
            expect(parseCurrency(undefined)).toBeUndefined();
        });

    });

});
