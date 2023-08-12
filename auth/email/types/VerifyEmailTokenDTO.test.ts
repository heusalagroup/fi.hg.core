// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createVerifyEmailTokenDTO, isVerifyEmailTokenDTO, parseVerifyEmailTokenDTO, stringifyVerifyEmailTokenDTO } from "./VerifyEmailTokenDTO";

describe('VerifyEmailTokenDTO', () => {
    const validEmailTokenDTO = {
        token: '123',
        email: 'test@example.com',
        verified: true,
    };

    const validDTO = {
        token: validEmailTokenDTO,
    };

    describe('createVerifyEmailTokenDTO', () => {
        it('should return a valid VerifyEmailTokenDTO', () => {
            const result = createVerifyEmailTokenDTO(validEmailTokenDTO);
            expect(result).toEqual(validDTO);
        });
    });

    describe('isVerifyEmailTokenDTO', () => {
        it('should return true when the value is a valid VerifyEmailTokenDTO', () => {
            const result = isVerifyEmailTokenDTO(validDTO);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid VerifyEmailTokenDTO', () => {
            const result = isVerifyEmailTokenDTO({token: '123'});
            expect(result).toBe(false);
        });
    });

    describe('stringifyVerifyEmailTokenDTO', () => {
        it('should return a string representation of the VerifyEmailTokenDTO', () => {
            const result = stringifyVerifyEmailTokenDTO(validDTO);
            expect(result).toBe('VerifyEmailTokenDTO([object Object])');
        });
    });

    describe('parseVerifyEmailTokenDTO', () => {
        it('should return a VerifyEmailTokenDTO when given a valid object', () => {
            const result = parseVerifyEmailTokenDTO(validDTO);
            expect(result).toEqual(validDTO);
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseVerifyEmailTokenDTO({token: '123'});
            expect(result).toBeUndefined();
        });
    });

});
