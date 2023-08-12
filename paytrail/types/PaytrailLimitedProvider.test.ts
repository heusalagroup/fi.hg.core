// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createPaytrailLimitedProvider, explainPaytrailLimitedProvider, explainPaytrailLimitedProviderOrUndefined, isPaytrailLimitedProvider, isPaytrailLimitedProviderOrUndefined, parsePaytrailLimitedProvider } from "./PaytrailLimitedProvider";
import { PaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";

describe('PaytrailLimitedProvider', () => {

    const mockedPaytrailLimitedProvider = {
        id: 'testId',
        name: 'testName',
        icon: 'https://testiconurl.com',
        svg: 'https://testsvgurl.com',
        group: PaytrailPaymentMethodGroup.MOBILE,
    };

    describe('createPaytrailLimitedProvider', () => {

        it('creates PaytrailLimitedProvider correctly', () => {
            const result = createPaytrailLimitedProvider(
                'testId',
                'testName',
                PaytrailPaymentMethodGroup.MOBILE,
                'https://testiconurl.com',
                'https://testsvgurl.com',
            );
            expect(result).toEqual(mockedPaytrailLimitedProvider);
        });

    });

    describe('isPaytrailLimitedProvider', () => {

        it('validates if an object is PaytrailLimitedProvider', () => {
            const result = isPaytrailLimitedProvider(mockedPaytrailLimitedProvider);
            expect(result).toBe(true);
        });

        it('returns false if the object is not PaytrailLimitedProvider', () => {
            const result = isPaytrailLimitedProvider({
                id: 'testId',
                // Missing other properties.
            });
            expect(result).toBe(false);
        });

    });

    describe('explainPaytrailLimitedProvider', () => {
        it('explains why an object cannot be parsed into PaytrailLimitedProvider', () => {
            const result = explainPaytrailLimitedProvider({
                id: 'testId',
                // Missing other properties.
            });
            expect(result).toContain('property "icon" not string');
        });
    });

    describe('parsePaytrailLimitedProvider', () => {

        it('parses object into PaytrailLimitedProvider if it is valid', () => {
            const result = parsePaytrailLimitedProvider(mockedPaytrailLimitedProvider);
            expect(result).toEqual(mockedPaytrailLimitedProvider);
        });

        it('returns undefined if the object cannot be parsed into PaytrailLimitedProvider', () => {
            const result = parsePaytrailLimitedProvider({
                id: 'testId',
                // Missing other properties.
            });
            expect(result).toBeUndefined();
        });

    });

    describe('isPaytrailLimitedProviderOrUndefined', () => {
        it('validates if a value is PaytrailLimitedProvider', () => {
            expect(isPaytrailLimitedProviderOrUndefined(mockedPaytrailLimitedProvider)).toBe(true);
            expect(isPaytrailLimitedProviderOrUndefined({ id: 'testId' })).toBe(false); // Missing other properties.
        });
        it('validates if a value is undefined', () => {
            expect(isPaytrailLimitedProviderOrUndefined(undefined)).toBe(true);
        });
    });

    describe('explainPaytrailLimitedProviderOrUndefined', () => {
        it('explains why a value is not PaytrailLimitedProvider or undefined', () => {
            const result = explainPaytrailLimitedProviderOrUndefined({ id: 'testId' }); // Missing other properties.
            expect(result).toContain('not PaytrailLimitedProvider or undefined');
        });
    });

});
