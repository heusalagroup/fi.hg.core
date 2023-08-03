// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    JwtPayload,
    createJwtPayload,
    isJwtPayload,
    stringifyJwtPayload,
    parseJwtPayload
} from './JwtPayload';

describe('JwtPayload', () => {
    let validPayload: JwtPayload;
    const exp = 123456;
    const aud = 'testAud';
    const sub = 'testSub';

    beforeEach(() => {
        validPayload = createJwtPayload(exp, aud, sub);
    });

    describe('createJwtPayload', () => {
        it('should create a JwtPayload object', () => {
            expect(validPayload).toEqual({ exp, aud, sub });
        });
    });

    describe('isJwtPayload', () => {

        it('should return true for a valid payload', () => {
            expect(isJwtPayload(validPayload)).toBe(true);
        });

        it('should return false for a payload with additional properties', () => {
            const invalidPayload = { ...validPayload, extraProp: 'extra' };
            expect(isJwtPayload(invalidPayload)).toBe(false);
        });

        it('should return true for a payload with missing properties', () => {
            let { sub, ...invalidPayload } = { ...validPayload };
            expect(isJwtPayload(invalidPayload)).toBe(true);
        });

    });

    describe('stringifyJwtPayload', () => {
        it('should return a string representation of a JwtPayload', () => {
            expect(stringifyJwtPayload(validPayload)).toBe(JSON.stringify(validPayload));
        });
    });

    describe('parseJwtPayload', () => {
        it('should parse a valid payload', () => {
            expect(parseJwtPayload(validPayload)).toEqual(validPayload);
        });

        it('should return undefined for an invalid payload', () => {
            const invalidPayload = { ...validPayload, extraProp: 'extra' };
            expect(parseJwtPayload(invalidPayload)).toBeUndefined();
        });
    });

});
