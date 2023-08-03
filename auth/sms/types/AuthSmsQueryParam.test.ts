// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { AuthSmsQueryParam, isAuthSmsQueryParam, parseAuthSmsQueryParam, stringifyAuthSmsQueryParam } from "./AuthSmsQueryParam";

describe('AuthSmsQueryParam', () => {

    describe('isAuthSmsQueryParam', () => {
        it('should return true when the value is a valid AuthSmsQueryParam', () => {
            const result = isAuthSmsQueryParam(AuthSmsQueryParam.LANGUAGE);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid AuthSmsQueryParam', () => {
            const result = isAuthSmsQueryParam('invalidValue');
            expect(result).toBe(false);
        });
    });

    describe('stringifyAuthSmsQueryParam', () => {
        it('should return a string representation of the AuthSmsQueryParam', () => {
            const result = stringifyAuthSmsQueryParam(AuthSmsQueryParam.LANGUAGE);
            expect(result).toBe('LANGUAGE');
        });

        it('should throw TypeError for unsupported AuthSmsQueryParam values', () => {
            // @ts-ignore
            expect(() => stringifyAuthSmsQueryParam('invalidValue')).toThrowError(TypeError);
        });
    });

    describe('parseAuthSmsQueryParam', () => {
        it('should return an AuthSmsQueryParam when given a valid string', () => {
            let result = parseAuthSmsQueryParam('l');
            expect(result).toBe(AuthSmsQueryParam.LANGUAGE);

            result = parseAuthSmsQueryParam('LANGUAGE');
            expect(result).toBe(AuthSmsQueryParam.LANGUAGE);
        });

        it('should return undefined when given an invalid string', () => {
            const result = parseAuthSmsQueryParam('invalidValue');
            expect(result).toBeUndefined();
        });
    });
});
