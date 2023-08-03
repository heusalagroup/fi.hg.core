// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { AuthEmailQueryParam, isAuthEmailQueryParam, parseAuthEmailQueryParam, stringifyAuthEmailQueryParam } from "./AuthEmailQueryParam";

describe('AuthEmailQueryParam', () => {

    describe('isAuthEmailQueryParam', () => {
        it('should return true when the value is a valid AuthEmailQueryParam', () => {
            const result = isAuthEmailQueryParam(AuthEmailQueryParam.LANGUAGE);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid AuthEmailQueryParam', () => {
            const result = isAuthEmailQueryParam('invalidValue');
            expect(result).toBe(false);
        });
    });

    describe('stringifyAuthEmailQueryParam', () => {
        it('should return a string representation of the AuthEmailQueryParam', () => {
            const result = stringifyAuthEmailQueryParam(AuthEmailQueryParam.LANGUAGE);
            expect(result).toBe('LANGUAGE');
        });

        it('should throw TypeError for unsupported AuthEmailQueryParam values', () => {
            // @ts-ignore
            expect(() => stringifyAuthEmailQueryParam('invalidValue')).toThrowError(TypeError);
        });
    });

    describe('parseAuthEmailQueryParam', () => {
        it('should return an AuthEmailQueryParam when given a valid string', () => {
            let result = parseAuthEmailQueryParam('l');
            expect(result).toBe(AuthEmailQueryParam.LANGUAGE);

            result = parseAuthEmailQueryParam('LANGUAGE');
            expect(result).toBe(AuthEmailQueryParam.LANGUAGE);
        });

        it('should return undefined when given an invalid string', () => {
            const result = parseAuthEmailQueryParam('invalidValue');
            expect(result).toBeUndefined();
        });
    });
});
