// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainPaytrailLanguage, explainPaytrailLanguageOrUndefined, isPaytrailLanguage, isPaytrailLanguageOrUndefined, parsePaytrailLanguage, PaytrailLanguage, stringifyPaytrailLanguage } from "./PaytrailLanguage";

describe('PaytrailLanguage', () => {

    const validLanguages = [PaytrailLanguage.FI, PaytrailLanguage.SV, PaytrailLanguage.EN];

    const invalidLanguage = 'ES';

    describe('isPaytrailLanguage', () => {

        validLanguages.forEach(language => {
            it(`should return true for "${language}"`, () => {
                expect(isPaytrailLanguage(language)).toBe(true);
            });
        });

        it(`should return false for invalid language`, () => {
            expect(isPaytrailLanguage(invalidLanguage)).toBe(false);
        });

    });

    describe('explainPaytrailLanguage', () => {

        validLanguages.forEach(language => {
            it(`should return OK for "${language}"`, () => {
                expect(explainPaytrailLanguage(language)).toEqual('OK');
            });
        });

        it(`should return an explanation for invalid language`, () => {
            expect(explainPaytrailLanguage(invalidLanguage)).toContain('incorrect enum value "ES" for PaytrailLanguage: Accepted values FI, SV, EN');
        });

    });

    describe('stringifyPaytrailLanguage', () => {

        validLanguages.forEach(language => {
            it(`should correctly stringify "${language}"`, () => {
                expect(stringifyPaytrailLanguage(language)).toEqual(language);
            });
        });

    });

    describe('parsePaytrailLanguage', () => {

        validLanguages.forEach(language => {
            it(`should correctly parse "${language}"`, () => {
                expect(parsePaytrailLanguage(language)).toEqual(language);
            });
        });

        it(`should return undefined for invalid language`, () => {
            expect(parsePaytrailLanguage(invalidLanguage)).toBeUndefined();
        });

    });

    describe('isPaytrailLanguageOrUndefined', () => {

        it(`should return true for undefined`, () => {
            expect(isPaytrailLanguageOrUndefined(undefined)).toBe(true);
        });

        validLanguages.forEach(language => {
            it(`should return true for "${language}"`, () => {
                expect(isPaytrailLanguageOrUndefined(language)).toBe(true);
            });
        });

        it(`should return false for invalid language`, () => {
            expect(isPaytrailLanguageOrUndefined(invalidLanguage)).toBe(false);
        });

    });

    describe('explainPaytrailLanguageOrUndefined', () => {

        it(`should return OK for undefined`, () => {
            expect(explainPaytrailLanguageOrUndefined(undefined)).toEqual('OK');
        });

        validLanguages.forEach(language => {
            it(`should return OK for "${language}"`, () => {
                expect(explainPaytrailLanguageOrUndefined(language)).toEqual('OK');
            });
        });

        it(`should return an explanation for invalid language`, () => {
            expect(explainPaytrailLanguageOrUndefined(invalidLanguage)).toContain('not PaytrailLanguage or undefined');
        });

    });

});
