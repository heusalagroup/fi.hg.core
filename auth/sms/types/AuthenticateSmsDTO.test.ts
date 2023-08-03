// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createAuthenticateSmsDTO, isAuthenticateSmsDTO, parseAuthenticateSmsDTO, stringifyAuthenticateSmsDTO } from "./AuthenticateSmsDTO";

describe('AuthenticateSmsDTO', () => {
    let sms : string;

    beforeEach(() => {
        sms = '+3587099704';
    });

    describe('createAuthenticateSmsDTO', () => {
        it('should create a valid AuthenticateSmsDTO object', () => {
            const result = createAuthenticateSmsDTO(sms);
            expect(result).toEqual({sms});
        });
    });

    describe('isAuthenticateSmsDTO', () => {
        it('should return true when the object is a valid AuthenticateSmsDTO', () => {
            const result = isAuthenticateSmsDTO({sms});
            expect(result).toBe(true);
        });

        it('should return false when the object is not a valid AuthenticateSmsDTO', () => {
            const result = isAuthenticateSmsDTO({invalidKey: 'invalidValue'});
            expect(result).toBe(false);
        });
    });

    describe('stringifyAuthenticateSmsDTO', () => {
        it('should return a string representation of the AuthenticateSmsDTO object', () => {
            const result = stringifyAuthenticateSmsDTO({sms});
            expect(result).toBe(`{"sms":"${sms}"}`);
        });
    });

    describe('parseAuthenticateSmsDTO', () => {
        it('should return an AuthenticateSmsDTO object when given a valid object', () => {
            const result = parseAuthenticateSmsDTO({sms});
            expect(result).toEqual({sms});
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseAuthenticateSmsDTO({invalidKey: 'invalidValue'});
            expect(result).toBeUndefined();
        });
    });

});
