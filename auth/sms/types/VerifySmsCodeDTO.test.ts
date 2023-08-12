// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createVerifySmsCodeDTO, isVerifySmsCodeDTO, parseVerifySmsCodeDTO, stringifyVerifySmsCodeDTO } from "./VerifySmsCodeDTO";

describe('VerifySmsCodeDTO', () => {
    const validSmsTokenDTO = {
        token: '123',
        sms: '+3587099704',
        verified: true,
    };

    const validDTO = {
        token: validSmsTokenDTO,
        code: 'ABC123',
    };

    describe('createVerifySmsCodeDTO', () => {
        it('should return a valid VerifySmsCodeDTO', () => {
            const result = createVerifySmsCodeDTO(validSmsTokenDTO, 'ABC123');
            expect(result).toEqual(validDTO);
        });
    });

    describe('isVerifySmsCodeDTO', () => {
        it('should return true when the value is a valid VerifySmsCodeDTO', () => {
            const result = isVerifySmsCodeDTO(validDTO);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid VerifySmsCodeDTO', () => {
            const result = isVerifySmsCodeDTO({token: validSmsTokenDTO});
            expect(result).toBe(false);
        });
    });

    describe('stringifyVerifySmsCodeDTO', () => {
        it('should return a string representation of the VerifySmsCodeDTO', () => {
            const result = stringifyVerifySmsCodeDTO(validDTO);
            expect(result).toBe('VerifySmsCodeDTO([object Object])');
        });
    });

    describe('parseVerifySmsCodeDTO', () => {
        it('should return a VerifySmsCodeDTO when given a valid object', () => {
            const result = parseVerifySmsCodeDTO(validDTO);
            expect(result).toEqual(validDTO);
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseVerifySmsCodeDTO({token: validSmsTokenDTO});
            expect(result).toBeUndefined();
        });
    });

});
