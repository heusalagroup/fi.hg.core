// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createVerifySmsTokenDTO, isVerifySmsTokenDTO, parseVerifySmsTokenDTO, stringifyVerifySmsTokenDTO } from "./VerifySmsTokenDTO";

describe('VerifySmsTokenDTO', () => {
    const validSmsTokenDTO = {
        token: '123',
        sms: '+3587099704',
        verified: true,
    };

    const validDTO = {
        token: validSmsTokenDTO,
    };

    describe('createVerifySmsTokenDTO', () => {
        it('should return a valid VerifySmsTokenDTO', () => {
            const result = createVerifySmsTokenDTO(validSmsTokenDTO);
            expect(result).toEqual(validDTO);
        });
    });

    describe('isVerifySmsTokenDTO', () => {
        it('should return true when the value is a valid VerifySmsTokenDTO', () => {
            const result = isVerifySmsTokenDTO(validDTO);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid VerifySmsTokenDTO', () => {
            const result = isVerifySmsTokenDTO({token: '123'});
            expect(result).toBe(false);
        });
    });

    describe('stringifyVerifySmsTokenDTO', () => {
        it('should return a string representation of the VerifySmsTokenDTO', () => {
            const result = stringifyVerifySmsTokenDTO(validDTO);
            expect(result).toBe('VerifySmsTokenDTO([object Object])');
        });
    });

    describe('parseVerifySmsTokenDTO', () => {
        it('should return a VerifySmsTokenDTO when given a valid object', () => {
            const result = parseVerifySmsTokenDTO(validDTO);
            expect(result).toEqual(validDTO);
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseVerifySmsTokenDTO({token: '123'});
            expect(result).toBeUndefined();
        });
    });

});
