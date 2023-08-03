// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { isLanguage, Language, parseLanguage, stringifyLanguage } from "./Language";

describe('Language', () => {

    describe('isLanguage', () => {
        it('should return true for valid languages', () => {
            expect(isLanguage('fi')).toBe(true);
            expect(isLanguage('en')).toBe(true);
        });

        it('should return false for invalid languages', () => {
            expect(isLanguage('es')).toBe(false);
            expect(isLanguage('de')).toBe(false);
            expect(isLanguage(123)).toBe(false);
            expect(isLanguage(null)).toBe(false);
        });
    });

    describe('stringifyLanguage', () => {
        it('should return string representation for valid languages', () => {
            expect(stringifyLanguage(Language.FINNISH)).toBe('fi');
            expect(stringifyLanguage(Language.ENGLISH)).toBe('en');
        });

        it('should throw error for invalid languages', () => {
            expect(() => stringifyLanguage('es' as any)).toThrow(TypeError);
        });
    });

    describe('parseLanguage', () => {
        it('should return Language for valid inputs', () => {
            expect(parseLanguage('fi')).toBe(Language.FINNISH);
            expect(parseLanguage('en')).toBe(Language.ENGLISH);
            expect(parseLanguage('FINNISH')).toBe(Language.FINNISH);
            expect(parseLanguage('ENGLISH')).toBe(Language.ENGLISH);
        });

        it('should return undefined for invalid inputs', () => {
            expect(parseLanguage('es')).toBeUndefined();
            expect(parseLanguage('de')).toBeUndefined();
            expect(parseLanguage(123)).toBeUndefined();
            expect(parseLanguage(null)).toBeUndefined();
        });
    });

});
