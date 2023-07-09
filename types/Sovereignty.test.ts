// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { isSovereignty, parseSovereignty, Sovereignty, stringifySovereignty } from "./Sovereignty";

describe('Sovereignty', () => {

    describe('isSovereignty', () => {

        it('should return true for valid Sovereignty value', () => {
            expect(isSovereignty(Sovereignty.UN_MEMBER_STATE)).toBe(true);
        });

        it('should return false for invalid Sovereignty value', () => {
            expect(isSovereignty('invalid')).toBe(false);
            expect(isSovereignty(123)).toBe(false);
            expect(isSovereignty(null)).toBe(false);
            expect(isSovereignty(undefined)).toBe(false);
        });
    });

    describe('stringifySovereignty', () => {
        it('should return correct string for valid Sovereignty value', () => {
            expect(stringifySovereignty(Sovereignty.UN_MEMBER_STATE)).toBe('UN_MEMBER_STATE');
        });

        it('should throw TypeError for invalid Sovereignty value', () => {
            expect(() => stringifySovereignty('invalid' as any)).toThrow(TypeError);
        });
    });

    describe('parseSovereignty', () => {

        it('should return correct Sovereignty value for valid strings', () => {
            expect(parseSovereignty('UN MEMBER STATE')).toBe(Sovereignty.UN_MEMBER_STATE);
            expect(parseSovereignty('UN MEMBER  STATE')).toBe(Sovereignty.UN_MEMBER_STATE);
            expect(parseSovereignty('UN MEMBER   STATE')).toBe(Sovereignty.UN_MEMBER_STATE);
            expect(parseSovereignty('UN_MEMBER_STATE')).toBe(Sovereignty.UN_MEMBER_STATE);
        });

        it('should return undefined for invalid strings', () => {
            expect(parseSovereignty('UN MEMBER')).toBeUndefined();
            expect(parseSovereignty('UN')).toBeUndefined();
            expect(parseSovereignty('UN STATE')).toBeUndefined();
            expect(parseSovereignty('invalid')).toBeUndefined();
            expect(parseSovereignty(123)).toBeUndefined();
            expect(parseSovereignty(null)).toBeUndefined();
            expect(parseSovereignty(undefined)).toBeUndefined();
        });

    });

});
