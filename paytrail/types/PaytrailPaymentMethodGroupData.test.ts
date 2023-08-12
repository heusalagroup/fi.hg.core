// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createPaytrailPaymentMethodGroupData, explainPaytrailPaymentMethodGroupData, explainPaytrailPaymentMethodGroupDataOrUndefined, isPaytrailPaymentMethodGroupData, isPaytrailPaymentMethodGroupDataOrUndefined, parsePaytrailPaymentMethodGroupData } from "./PaytrailPaymentMethodGroupData";
import { PaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";

describe('PaytrailPaymentMethodGroupData', () => {

    const mockedPaytrailPaymentMethodGroupData = {
        id: PaytrailPaymentMethodGroup.CREDIT,
        name: 'testName',
        icon: 'https://testiconurl.com',
        svg: 'https://testsvgurl.com',
    };

    describe('createPaytrailPaymentMethodGroupData', () => {
        it('creates PaytrailPaymentMethodGroupData correctly', () => {
            const result = createPaytrailPaymentMethodGroupData(
                PaytrailPaymentMethodGroup.CREDIT,
                'testName',
                'https://testiconurl.com',
                'https://testsvgurl.com'
            );
            expect(result).toEqual(mockedPaytrailPaymentMethodGroupData);
        });
    });

    describe('isPaytrailPaymentMethodGroupData', () => {
        it('validates if an object is PaytrailPaymentMethodGroupData', () => {
            const result = isPaytrailPaymentMethodGroupData(mockedPaytrailPaymentMethodGroupData);
            expect(result).toBe(true);
        });

        it('returns false if the object is not PaytrailPaymentMethodGroupData', () => {
            const result = isPaytrailPaymentMethodGroupData({
                id: PaytrailPaymentMethodGroup.CREDIT,
                // Missing other properties.
            });
            expect(result).toBe(false);
        });
    });

    describe('explainPaytrailPaymentMethodGroupData', () => {
        it('explains why an object cannot be parsed into PaytrailPaymentMethodGroupData', () => {
            const result = explainPaytrailPaymentMethodGroupData({
                id: PaytrailPaymentMethodGroup.CREDIT,
                // Missing other properties.
            });
            expect(result).toContain('property "name" not string');
            expect(result).toContain('property "icon" not string');
            expect(result).toContain('property "svg" not string');
        });
    });

    describe('parsePaytrailPaymentMethodGroupData', () => {
        it('parses object into PaytrailPaymentMethodGroupData if it is valid', () => {
            const result = parsePaytrailPaymentMethodGroupData(mockedPaytrailPaymentMethodGroupData);
            expect(result).toEqual(mockedPaytrailPaymentMethodGroupData);
        });

        it('returns undefined if the object cannot be parsed into PaytrailPaymentMethodGroupData', () => {
            const result = parsePaytrailPaymentMethodGroupData({
                id: PaytrailPaymentMethodGroup.CREDIT,
                // Missing other properties.
            });
            expect(result).toBeUndefined();
        });
    });

    describe('isPaytrailPaymentMethodGroupDataOrUndefined', () => {
        it('validates if a value is PaytrailPaymentMethodGroupData or undefined', () => {
            expect(isPaytrailPaymentMethodGroupDataOrUndefined(mockedPaytrailPaymentMethodGroupData)).toBe(true);
            expect(isPaytrailPaymentMethodGroupDataOrUndefined(undefined)).toBe(true);
            expect(isPaytrailPaymentMethodGroupDataOrUndefined({ id: PaytrailPaymentMethodGroup.CREDIT })).toBe(false); // Missing other properties.
        });
    });

    describe('explainPaytrailPaymentMethodGroupDataOrUndefined', () => {
        it('explains why a value is not PaytrailPaymentMethodGroupData or undefined', () => {
            const result = explainPaytrailPaymentMethodGroupDataOrUndefined({ id: PaytrailPaymentMethodGroup.CREDIT }); // Missing other properties.
            expect(result).toContain('not PaytrailPaymentMethodGroupData or undefined');
        });
    });

});
