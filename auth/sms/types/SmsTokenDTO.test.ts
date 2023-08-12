// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createSmsTokenDTO, explainSmsTokenDTOOrUndefined, isSmsTokenDTO, isSmsTokenDTOOrUndefined, parseSmsTokenDTO, stringifySmsTokenDTO } from "./SmsTokenDTO";

describe('SmsTokenDTO', () => {

    const validDTO = {
        token: '123',
        sms: '+3587099704',
        verified: true,
    };

    describe('createSmsTokenDTO', () => {
        it('should return a valid SmsTokenDTO', () => {
            const result = createSmsTokenDTO('123', '+3587099704', true);
            expect(result).toEqual(validDTO);
        });
    });

    describe('isSmsTokenDTO', () => {

        it('should return true when the value is a valid SmsTokenDTO', () => {
            const result = isSmsTokenDTO(validDTO);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid SmsTokenDTO', () => {
            const result = isSmsTokenDTO({token: 123, sms: '+3587099704'});
            expect(result).toBe(false);
        });

    });

    describe('stringifySmsTokenDTO', () => {
        it('should return a string representation of the SmsTokenDTO', () => {
            const result = stringifySmsTokenDTO(validDTO);
            expect(result).toBe(JSON.stringify(validDTO));
        });
    });

    describe('parseSmsTokenDTO', () => {

        it('should return an SmsTokenDTO when given a valid object', () => {
            const result = parseSmsTokenDTO(validDTO);
            expect(result).toEqual(validDTO);
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseSmsTokenDTO({token: 123, sms: '+3587099704'});
            expect(result).toBeUndefined();
        });

    });

    describe('isSmsTokenDTOOrUndefined', () => {

        it('should return true when the value is a valid SmsTokenDTO or undefined', () => {
            let result = isSmsTokenDTOOrUndefined(validDTO);
            expect(result).toBe(true);

            result = isSmsTokenDTOOrUndefined(undefined);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid SmsTokenDTO and not undefined', () => {
            const result = isSmsTokenDTOOrUndefined({token: 123, sms: '+3587099704'});
            expect(result).toBe(false);
        });

    });

    describe('explainSmsTokenDTOOrUndefined', () => {

        it('should return "Ok" when the value is a valid SmsTokenDTO or undefined', () => {
            let result = explainSmsTokenDTOOrUndefined(validDTO);
            expect(result).toBe('OK');

            result = explainSmsTokenDTOOrUndefined(undefined);
            expect(result).toBe('OK');
        });

        it('should return explanation when the value is not a valid SmsTokenDTO and not undefined', () => {
            const result = explainSmsTokenDTOOrUndefined({token: 123, sms: '+3587099704'});
            expect(result).toBe('not SmsTokenDTO or undefined');
        });

    });

});
