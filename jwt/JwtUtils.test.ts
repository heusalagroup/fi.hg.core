// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JwtUtils } from './JwtUtils';

describe('JwtUtils', () => {

    let currentTime: number;

    beforeEach(() => {
        currentTime = Math.floor(Date.now() / 1000);
        jest.spyOn(Date, 'now').mockImplementation(() => currentTime * 1000);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('calculateExpirationInDays', () => {
        it('should correctly calculate the expiration timestamp in days', () => {
            const days = 1;
            expect(JwtUtils.calculateExpirationInDays(days)).toEqual(currentTime + days * 24 * 60 * 60);
        });
    });

    describe('calculateExpirationInMinutes', () => {
        it('should correctly calculate the expiration timestamp in minutes', () => {
            const minutes = 60;
            expect(JwtUtils.calculateExpirationInMinutes(minutes)).toEqual(currentTime + minutes * 60);
        });
    });

    describe('createAudPayloadExpiringInDays', () => {
        it('should correctly create a payload with aud and expiration in days', () => {
            const aud = 'testAud';
            const days = 1;
            expect(JwtUtils.createAudPayloadExpiringInDays(aud, days)).toEqual({ aud, exp: currentTime + days * 24 * 60 * 60 });
        });
    });

    describe('createAudPayloadExpiringInMinutes', () => {
        it('should correctly create a payload with aud and expiration in minutes', () => {
            const aud = 'testAud';
            const minutes = 60;
            expect(JwtUtils.createAudPayloadExpiringInMinutes(aud, minutes)).toEqual({ aud, exp: currentTime + minutes * 60 });
        });
    });

    describe('createSubPayloadExpiringInDays', () => {
        it('should correctly create a payload with sub and expiration in days', () => {
            const sub = 'testSub';
            const days = 1;
            expect(JwtUtils.createSubPayloadExpiringInDays(sub, days)).toEqual({ sub, exp: currentTime + days * 24 * 60 * 60 });
        });
    });

    describe('createSubPayloadExpiringInMinutes', () => {
        it('should correctly create a payload with sub and expiration in minutes', () => {
            const sub = 'testSub';
            const minutes = 60;
            expect(JwtUtils.createSubPayloadExpiringInMinutes(sub, minutes)).toEqual({ sub, exp: currentTime + minutes * 60 });
        });
    });

});
