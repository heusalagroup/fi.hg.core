// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createAuthenticateEmailDTO, isAuthenticateEmailDTO, parseAuthenticateEmailDTO, stringifyAuthenticateEmailDTO } from "./AuthenticateEmailDTO";

describe('AuthenticateEmailDTO', () => {
    let email : string;

    beforeEach(() => {
        email = 'test@gmail.com';
    });

    describe('createAuthenticateEmailDTO', () => {
        it('should create a valid AuthenticateEmailDTO object', () => {
            const result = createAuthenticateEmailDTO(email);
            expect(result).toEqual({email});
        });
    });

    describe('isAuthenticateEmailDTO', () => {
        it('should return true when the object is a valid AuthenticateEmailDTO', () => {
            const result = isAuthenticateEmailDTO({email});
            expect(result).toBe(true);
        });

        it('should return false when the object is not a valid AuthenticateEmailDTO', () => {
            const result = isAuthenticateEmailDTO({invalidKey: 'invalidValue'});
            expect(result).toBe(false);
        });
    });

    describe('stringifyAuthenticateEmailDTO', () => {
        it('should return a string representation of the AuthenticateEmailDTO object', () => {
            const result = stringifyAuthenticateEmailDTO({email});
            expect(result).toBe(`{"email":"${email}"}`);
        });
    });

    describe('parseAuthenticateEmailDTO', () => {
        it('should return an AuthenticateEmailDTO object when given a valid object', () => {
            const result = parseAuthenticateEmailDTO({email});
            expect(result).toEqual({email});
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseAuthenticateEmailDTO({invalidKey: 'invalidValue'});
            expect(result).toBeUndefined();
        });
    });

});
