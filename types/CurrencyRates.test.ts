// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createCurrencyRates, CurrencyRates, explainCurrencyRates, isCurrencyRates, parseCurrencyRates, stringifyCurrencyRates } from "./CurrencyRates";
import { Currency } from "./Currency";

describe('CurrencyRates', () => {

    const validRates: CurrencyRates = {
        [Currency.EUR]: 1,
        [Currency.USD]: 1.2,
        [Currency.GBP]: 0.85
    };

    const invalidRates = {
        [Currency.EUR]: 1,
        [Currency.USD]: "1.2",
        [Currency.GBP]: 0.85
    };

    describe('createCurrencyRates', () => {

        it('should correctly create CurrencyRates object', () => {
            const rates = createCurrencyRates(1.2, 0.85);
            expect(rates).toEqual(validRates);
        });

    });

    describe('isCurrencyRates', () => {

        it('should correctly identify valid CurrencyRates', () => {
            expect(isCurrencyRates(validRates)).toBe(true);
        });

        it('should correctly identify invalid CurrencyRates', () => {
            expect(isCurrencyRates(invalidRates)).toBe(false);
        });

    });

    describe('explainCurrencyRates', () => {

        it('should correctly explain valid CurrencyRates', () => {
            const explanation = explainCurrencyRates(validRates);
            expect(explanation).toBe('OK');
        });

        it('should correctly explain invalid CurrencyRates', () => {
            const explanation = explainCurrencyRates(invalidRates);
            expect(explanation).toContain('property "USD" not number');
        });

    });

    describe('stringifyCurrencyRates', () => {

        it('should correctly stringify valid CurrencyRates', () => {
            const stringified = stringifyCurrencyRates(validRates);
            expect(stringified).toEqual('CurrencyRates([object Object])');
        });

        it('should throw an error for invalid CurrencyRates', () => {
            expect(
                // @ts-ignore
                () => stringifyCurrencyRates(invalidRates)
            ).toThrowError('Not CurrencyRates');
        });

    });

    describe('parseCurrencyRates', () => {

        it('should correctly parse valid CurrencyRates', () => {
            const parsed = parseCurrencyRates(validRates);
            expect(parsed).toEqual(validRates);
        });

        it('should return undefined for invalid CurrencyRates', () => {
            const parsed = parseCurrencyRates(invalidRates);
            expect(parsed).toBeUndefined();
        });

    });

});
