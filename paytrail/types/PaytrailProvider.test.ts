// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createPaytrailProvider, explainPaytrailProvider, explainPaytrailProviderOrUndefined, isPaytrailProvider, isPaytrailProviderOrUndefined, parsePaytrailProvider } from "./PaytrailProvider";
import { PaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";

describe('PaytrailProvider', () => {

    const mockedPaytrailFormField = {
        name: 'testName',
        value: 'testValue',
    };

    const mockedPaytrailProvider = {
        url: 'https://testurl.com',
        icon: 'https://testiconurl.com',
        svg: 'https://testsvgurl.com',
        group: PaytrailPaymentMethodGroup.MOBILE,
        name: 'testName',
        id: 'testId',
        parameters: [mockedPaytrailFormField],
    };

    describe('createPaytrailProvider', () => {

        it('creates PaytrailProvider correctly', () => {
            const result = createPaytrailProvider(
                'https://testiconurl.com',
                'https://testsvgurl.com',
                PaytrailPaymentMethodGroup.MOBILE,
                'testName',
                'testId',
                'https://testurl.com',
                [mockedPaytrailFormField]
            );
            expect(result).toEqual(mockedPaytrailProvider);
        });

    });

    describe('isPaytrailProvider', () => {

        it('validates if an object is PaytrailProvider', () => {
            const result = isPaytrailProvider(mockedPaytrailProvider);
            expect(result).toBe(true);
        });

        it('returns false if the object is not PaytrailProvider', () => {
            const result = isPaytrailProvider({
                url: 'https://testurl.com',
                // Missing other properties.
            });
            expect(result).toBe(false);
        });

    });

    describe('explainPaytrailProvider', () => {
        it('explains why an object cannot be parsed into PaytrailProvider', () => {
            const result = explainPaytrailProvider({
                url: 'https://testurl.com',
                // Missing other properties.
            });
            expect(result).toContain('property "icon" not string');
        });
    });

    describe('parsePaytrailProvider', () => {

        it('parses object into PaytrailProvider if it is valid', () => {
            const result = parsePaytrailProvider(mockedPaytrailProvider);
            expect(result).toEqual(mockedPaytrailProvider);
        });

        it('returns undefined if the object cannot be parsed into PaytrailProvider', () => {
            const result = parsePaytrailProvider({
                url: 'https://testurl.com',
                // Missing other properties.
            });
            expect(result).toBeUndefined();
        });

    });

    describe('isPaytrailProviderOrUndefined', () => {
        it('validates if a value is PaytrailProvider or undefined', () => {
            expect(isPaytrailProviderOrUndefined(mockedPaytrailProvider)).toBe(true);
            expect(isPaytrailProviderOrUndefined(undefined)).toBe(true);
            expect(isPaytrailProviderOrUndefined({ url: 'https://testurl.com' })).toBe(false); // Missing other properties.
        });
    });

    describe('explainPaytrailProviderOrUndefined', () => {
        it('explains why a value is not PaytrailProvider or undefined', () => {
            const result = explainPaytrailProviderOrUndefined({ url: 'https://testurl.com' }); // Missing other properties.
            expect(result).toContain('not PaytrailProvider or undefined');
        });
    });

});
