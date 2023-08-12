// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createPaytrailCallbackUrl, explainPaytrailCallbackUrl, isPaytrailCallbackUrl, parsePaytrailCallbackUrl } from "./PaytrailCallbackUrl";

describe('PaytrailCallbackUrl', () => {

    const validCallbackUrl = {
        success: 'https://example.org/51/success',
        cancel: 'https://example.org/51/cancel'
    };

    describe('createPaytrailCallbackUrl', () => {

        it('should create a valid PaytrailCallbackUrl object', () => {
            const result = createPaytrailCallbackUrl(
                validCallbackUrl.success,
                validCallbackUrl.cancel
            );
            expect(result).toEqual(validCallbackUrl);
        });

    });

    describe('isPaytrailCallbackUrl', () => {

        it('should return true for valid PaytrailCallbackUrl objects', () => {
            expect(isPaytrailCallbackUrl(validCallbackUrl)).toBe(true);
        });

        it('should return false for invalid objects', () => {
            expect(isPaytrailCallbackUrl({ ...validCallbackUrl, unknownProperty: 'Test' })).toBe(false);
            expect(isPaytrailCallbackUrl({})).toBe(false);
            expect(isPaytrailCallbackUrl('string')).toBe(false);
            expect(isPaytrailCallbackUrl(null)).toBe(false);
        });

    });

    describe('parsePaytrailCallbackUrl', () => {

        it('should return PaytrailCallbackUrl object if input is valid', () => {
            expect(parsePaytrailCallbackUrl(validCallbackUrl)).toEqual(validCallbackUrl);
        });

        it('should return undefined if input is invalid', () => {
            expect(parsePaytrailCallbackUrl({ ...validCallbackUrl, unknownProperty: 'Test' })).toBeUndefined();
            expect(parsePaytrailCallbackUrl({})).toBeUndefined();
            expect(parsePaytrailCallbackUrl('string')).toBeUndefined();
            expect(parsePaytrailCallbackUrl(null)).toBeUndefined();
        });

    });

    describe('explainPaytrailCallbackUrl', () => {

        it('should return explanation OK for valid PaytrailCallbackUrl objects', () => {
            expect(explainPaytrailCallbackUrl(validCallbackUrl)).toEqual('OK');
        });

        it('should return an explanation for invalid objects', () => {
            expect(explainPaytrailCallbackUrl({})).toContain('property "success" not string');
            expect(explainPaytrailCallbackUrl({ ...validCallbackUrl, unknownProperty: 'Test' })).toContain('unknownProperty');
            expect(explainPaytrailCallbackUrl({ success: 123, cancel: 'https://example.com/cancel' })).toContain('property "success" not string');
        });

    });

});
