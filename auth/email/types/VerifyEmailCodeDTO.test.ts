// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createVerifyEmailCodeDTO, isVerifyEmailCodeDTO, parseVerifyEmailCodeDTO, stringifyVerifyEmailCodeDTO } from "./VerifyEmailCodeDTO";

describe('VerifyEmailCodeDTO', () => {
    const validEmailTokenDTO = {
        token: '123',
        email: 'test@example.com',
        verified: true,
    };

    const validDTO = {
        token: validEmailTokenDTO,
        code: 'ABC123',
    };

    describe('createVerifyEmailCodeDTO', () => {
        it('should return a valid VerifyEmailCodeDTO', () => {
            const result = createVerifyEmailCodeDTO(validEmailTokenDTO, 'ABC123');
            expect(result).toEqual(validDTO);
        });
    });

    describe('isVerifyEmailCodeDTO', () => {
        it('should return true when the value is a valid VerifyEmailCodeDTO', () => {
            const result = isVerifyEmailCodeDTO(validDTO);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid VerifyEmailCodeDTO', () => {
            const result = isVerifyEmailCodeDTO({token: validEmailTokenDTO});
            expect(result).toBe(false);
        });
    });

    describe('stringifyVerifyEmailCodeDTO', () => {
        it('should return a string representation of the VerifyEmailCodeDTO', () => {
            const result = stringifyVerifyEmailCodeDTO(validDTO);
            expect(result).toBe('VerifyEmailCodeDTO([object Object])');
        });
    });

    describe('parseVerifyEmailCodeDTO', () => {
        it('should return a VerifyEmailCodeDTO when given a valid object', () => {
            const result = parseVerifyEmailCodeDTO(validDTO);
            expect(result).toEqual(validDTO);
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseVerifyEmailCodeDTO({token: validEmailTokenDTO});
            expect(result).toBeUndefined();
        });
    });

});
