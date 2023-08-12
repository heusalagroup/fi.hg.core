// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createEmailTokenDTO, explainEmailTokenDTOOrUndefined, isEmailTokenDTO, isEmailTokenDTOOrUndefined, parseEmailTokenDTO, stringifyEmailTokenDTO } from "./EmailTokenDTO";

describe('EmailTokenDTO', () => {

    const validDTO = {
        token: '123',
        email: 'test@example.com',
        verified: true,
    };

    describe('createEmailTokenDTO', () => {
        it('should return a valid EmailTokenDTO', () => {
            const result = createEmailTokenDTO('123', 'test@example.com', true);
            expect(result).toEqual(validDTO);
        });
    });

    describe('isEmailTokenDTO', () => {

        it('should return true when the value is a valid EmailTokenDTO', () => {
            const result = isEmailTokenDTO(validDTO);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid EmailTokenDTO', () => {
            const result = isEmailTokenDTO({token: 123, email: 'test@example.com'});
            expect(result).toBe(false);
        });

    });

    describe('stringifyEmailTokenDTO', () => {
        it('should return a string representation of the EmailTokenDTO', () => {
            const result = stringifyEmailTokenDTO(validDTO);
            expect(result).toBe(JSON.stringify(validDTO));
        });
    });

    describe('parseEmailTokenDTO', () => {

        it('should return an EmailTokenDTO when given a valid object', () => {
            const result = parseEmailTokenDTO(validDTO);
            expect(result).toEqual(validDTO);
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseEmailTokenDTO({token: 123, email: 'test@example.com'});
            expect(result).toBeUndefined();
        });

    });

    describe('isEmailTokenDTOOrUndefined', () => {

        it('should return true when the value is a valid EmailTokenDTO or undefined', () => {
            let result = isEmailTokenDTOOrUndefined(validDTO);
            expect(result).toBe(true);

            result = isEmailTokenDTOOrUndefined(undefined);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid EmailTokenDTO and not undefined', () => {
            const result = isEmailTokenDTOOrUndefined({token: 123, email: 'test@example.com'});
            expect(result).toBe(false);
        });

    });

    describe('explainEmailTokenDTOOrUndefined', () => {

        it('should return "Ok" when the value is a valid EmailTokenDTO or undefined', () => {
            let result = explainEmailTokenDTOOrUndefined(validDTO);
            expect(result).toBe('OK');

            result = explainEmailTokenDTOOrUndefined(undefined);
            expect(result).toBe('OK');
        });

        it('should return explanation when the value is not a valid EmailTokenDTO and not undefined', () => {
            const result = explainEmailTokenDTOOrUndefined({token: 123, email: 'test@example.com'});
            expect(result).toBe('not EmailTokenDTO or undefined');
        });

    });

});
