// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpIdentificationScheme, explainOpIdentificationSchemeOrUndefined, isOpIdentificationScheme, isOpIdentificationSchemeOrUndefined, OpIdentificationScheme, parseOpIdentificationScheme, stringifyOpIdentificationScheme } from "./OpIdentificationScheme";

describe('OpIdentificationScheme', () => {

    describe('isOpIdentificationScheme', () => {
        it('should correctly identify OpIdentificationScheme', () => {
            expect(isOpIdentificationScheme(OpIdentificationScheme.BIC)).toBe(true);
            expect(isOpIdentificationScheme('NotValidEnum')).toBe(false);
        });
    });

    describe('explainOpIdentificationScheme', () => {
        it('should provide correct explanation for OpIdentificationScheme', () => {
            expect(explainOpIdentificationScheme(OpIdentificationScheme.BIC)).toEqual('OK');
            expect(explainOpIdentificationScheme('NotValidEnum')).toEqual('incorrect enum value "NotValidEnum" for OpIdentificationScheme: Accepted values BIC, COID, TXID, SOSE, UNSTRUCTURED_ORG, UNSTRUCTURED_PERSON');
        });
    });

    describe('stringifyOpIdentificationScheme', () => {
        it('should correctly stringify OpIdentificationScheme', () => {
            expect(stringifyOpIdentificationScheme(OpIdentificationScheme.BIC)).toEqual('BIC');
            // @ts-ignore
            expect(() => stringifyOpIdentificationScheme('NotValidEnum')).toThrowError(); // Assuming the stringifyEnum function throws error for invalid enums
        });
    });

    describe('parseOpIdentificationScheme', () => {
        it('should correctly parse string to OpIdentificationScheme', () => {
            expect(parseOpIdentificationScheme('BIC')).toEqual(OpIdentificationScheme.BIC);
            expect(parseOpIdentificationScheme('NotValidEnum')).toBeUndefined();
        });
    });

    describe('isOpIdentificationSchemeOrUndefined', () => {
        it('should correctly identify OpIdentificationScheme or undefined', () => {
            expect(isOpIdentificationSchemeOrUndefined(OpIdentificationScheme.BIC)).toBe(true);
            expect(isOpIdentificationSchemeOrUndefined(undefined)).toBe(true);
            expect(isOpIdentificationSchemeOrUndefined('NotValidEnum')).toBe(false);
        });
    });

    describe('explainOpIdentificationSchemeOrUndefined', () => {
        it('should provide correct explanation for OpIdentificationScheme or undefined', () => {
            expect(explainOpIdentificationSchemeOrUndefined(OpIdentificationScheme.BIC)).toEqual('OK');
            expect(explainOpIdentificationSchemeOrUndefined(undefined)).toEqual('OK');
            expect(explainOpIdentificationSchemeOrUndefined('NotValidEnum')).toEqual('not OpIdentificationScheme or undefined');
        });
    });

});
