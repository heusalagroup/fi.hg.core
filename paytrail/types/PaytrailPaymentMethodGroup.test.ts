// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainPaytrailPaymentMethodGroup, explainPaytrailPaymentMethodGroupOrUndefined, isPaytrailPaymentMethodGroup, isPaytrailPaymentMethodGroupOrUndefined, parsePaytrailPaymentMethodGroup, PaytrailPaymentMethodGroup, stringifyPaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";

describe('PaytrailPaymentMethodGroup', () => {

    const validGroups = [
        PaytrailPaymentMethodGroup.MOBILE,
        PaytrailPaymentMethodGroup.BANK,
        PaytrailPaymentMethodGroup.CREDIT_CARD,
        PaytrailPaymentMethodGroup.CREDIT,
    ];

    const validGroupTexts = [
        'MOBILE',
        'BANK',
        'CREDIT_CARD',
        'CREDIT',
    ];

    const invalidGroup = 'cash';

    describe('isPaytrailPaymentMethodGroup', () => {

        validGroups.forEach(group => {
            it(`should return true for "${group}"`, () => {
                expect(isPaytrailPaymentMethodGroup(group)).toBe(true);
            });
        });

        it(`should return false for invalid group`, () => {
            expect(isPaytrailPaymentMethodGroup(invalidGroup)).toBe(false);
        });

    });

    describe('explainPaytrailPaymentMethodGroup', () => {

        validGroups.forEach(group => {
            it(`should return OK for "${group}"`, () => {
                expect(explainPaytrailPaymentMethodGroup(group)).toEqual('OK');
            });
        });

        it(`should return an explanation for invalid group`, () => {
            expect(explainPaytrailPaymentMethodGroup(invalidGroup)).toContain('incorrect enum value "cash" for PaytrailPaymentMethodGroup: Accepted values mobile, bank, creditcard, credit');
        });

    });

    describe('stringifyPaytrailPaymentMethodGroup', () => {

        validGroups.forEach((group, index) => {
            it(`should correctly stringify "${group}"`, () => {
                expect(stringifyPaytrailPaymentMethodGroup(group)).toEqual(validGroupTexts[index]);
            });
        });

    });

    describe('parsePaytrailPaymentMethodGroup', () => {

        validGroups.forEach(group => {
            it(`should correctly parse "${group}"`, () => {
                expect(parsePaytrailPaymentMethodGroup(group)).toEqual(group);
            });
        });

        it(`should return undefined for invalid group`, () => {
            expect(parsePaytrailPaymentMethodGroup(invalidGroup)).toBeUndefined();
        });

    });

    describe('isPaytrailPaymentMethodGroupOrUndefined', () => {

        it(`should return true for undefined`, () => {
            expect(isPaytrailPaymentMethodGroupOrUndefined(undefined)).toBe(true);
        });

        validGroups.forEach(group => {
            it(`should return true for "${group}"`, () => {
                expect(isPaytrailPaymentMethodGroupOrUndefined(group)).toBe(true);
            });
        });

        it(`should return false for invalid group`, () => {
            expect(isPaytrailPaymentMethodGroupOrUndefined(invalidGroup)).toBe(false);
        });

    });

    describe('explainPaytrailPaymentMethodGroupOrUndefined', () => {

        it(`should return OK for undefined`, () => {
            expect(explainPaytrailPaymentMethodGroupOrUndefined(undefined)).toEqual('OK');
        });

        validGroups.forEach(group => {
            it(`should return OK for "${group}"`, () => {
                expect(explainPaytrailPaymentMethodGroupOrUndefined(group)).toEqual('OK');
            });
        });

        it(`should return an explanation for invalid group`, () => {
            expect(explainPaytrailPaymentMethodGroupOrUndefined(invalidGroup)).toContain('not PaytrailPaymentMethodGroup or undefined');
        });

    });

});
