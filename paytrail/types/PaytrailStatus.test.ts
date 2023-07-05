// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainPaytrailStatus, explainPaytrailStatusOrUndefined, isPaytrailStatus, isPaytrailStatusOrUndefined, parsePaytrailStatus, PaytrailStatus, stringifyPaytrailStatus } from "./PaytrailStatus";

describe('PaytrailStatus functions', () => {

    const validStatuses = [
        PaytrailStatus.NEW,
        PaytrailStatus.OK,
        PaytrailStatus.FAIL,
        PaytrailStatus.PENDING,
        PaytrailStatus.DELAYED,
    ];
    const validStatusTexts = [
        'NEW',
        'OK',
        'FAIL',
        'PENDING',
        'DELAYED',
    ];
    const invalidStatus = 'invalid_status';

    describe('isPaytrailStatus', () => {

        validStatuses.forEach(status => {
            it(`should return true for "${status}"`, () => {
                expect(isPaytrailStatus(status)).toBe(true);
            });
        });

        it(`should return false for invalid status`, () => {
            expect(isPaytrailStatus(invalidStatus)).toBe(false);
        });

    });

    describe('explainPaytrailStatus', () => {

        validStatuses.forEach(status => {
            it(`should return OK for "${status}"`, () => {
                expect(explainPaytrailStatus(status)).toEqual('OK');
            });
        });

        it(`should return an explanation for invalid status`, () => {
            expect(explainPaytrailStatus(invalidStatus)).toContain('incorrect enum value "invalid_status" for PaytrailStatus: Accepted values new, ok, fail, pending, delayed');
        });

    });

    describe('stringifyPaytrailStatus', () => {

        validStatuses.forEach((status, index) => {
            it(`should correctly stringify "${status}"`, () => {
                expect(stringifyPaytrailStatus(status)).toEqual(validStatusTexts[index]);
            });
        });

    });

    describe('parsePaytrailStatus', () => {

        validStatuses.forEach(status => {
            it(`should correctly parse "${status}"`, () => {
                expect(parsePaytrailStatus(status)).toEqual(status);
            });
        });

        it(`should return undefined for invalid status`, () => {
            expect(parsePaytrailStatus(invalidStatus)).toBeUndefined();
        });

    });

    describe('isPaytrailStatusOrUndefined', () => {

        it(`should return true for undefined`, () => {
            expect(isPaytrailStatusOrUndefined(undefined)).toBe(true);
        });

        validStatuses.forEach(status => {
            it(`should return true for "${status}" or undefined`, () => {
                expect(isPaytrailStatusOrUndefined(status)).toBe(true);
            });
        });

        it(`should return false for invalid status`, () => {
            expect(isPaytrailStatusOrUndefined(invalidStatus)).toBe(false);
        });

    });

    describe('explainPaytrailStatusOrUndefined', () => {

        it(`should return OK for undefined`, () => {
            expect(explainPaytrailStatusOrUndefined(undefined)).toEqual('OK');
        });

        validStatuses.forEach(status => {
            it(`should return OK for "${status}"`, () => {
                expect(explainPaytrailStatusOrUndefined(status)).toEqual('OK');
            });
        });

        it(`should return an explanation for invalid status`, () => {
            expect(explainPaytrailStatusOrUndefined(invalidStatus)).toContain('not PaytrailStatus or undefined');
        });

    });

});
