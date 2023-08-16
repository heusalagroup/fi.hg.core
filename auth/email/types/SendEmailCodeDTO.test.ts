// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.


import { Language } from "../../../types/Language";
import {
    createSendEmailCodeDTO,
    isSendEmailCodeDTO,
    parseSendEmailCodeDTO,
    stringifySendEmailCodeDTO
} from "./SendEmailCodeDTO";

describe('SendEmailCodeDTO', () => {
    const validEmailTokenDTO = {
        token: '123',
        email: 'test@example.com',
        verified: true,
    };

    const validDTO = {
        token: validEmailTokenDTO,
        code: 'ABC123',
        lang: Language.ENGLISH
    };

    describe('createSendEmailCodeDTO', () => {
        it('should return a valid SendEmailCodeDTO', () => {
            const result = createSendEmailCodeDTO(validEmailTokenDTO, 'ABC123', Language.ENGLISH);
            expect(result).toEqual(validDTO);
        });
    });

    describe('isSendEmailCodeDTO', () => {
        it('should return true when the value is a valid SendEmailCodeDTO', () => {
            const result = isSendEmailCodeDTO(validDTO);
            expect(result).toBe(true);
        });

        it('should return false when the value is not a valid SendEmailCodeDTO', () => {
            const result = isSendEmailCodeDTO({token: validEmailTokenDTO});
            expect(result).toBe(false);
        });
    });

    describe('stringifySendEmailCodeDTO', () => {
        it('should return a string representation of the SendEmailCodeDTO', () => {
            const result = stringifySendEmailCodeDTO(validDTO);
            expect(result).toBe('SendEmailCode([object Object])');
        });
    });

    describe('parseSendEmailCodeDTO', () => {
        it('should return a SendEmailCodeDTO when given a valid object', () => {
            const result = parseSendEmailCodeDTO(validDTO);
            expect(result).toEqual(validDTO);
        });

        it('should return undefined when given an invalid object', () => {
            const result = parseSendEmailCodeDTO({token: validEmailTokenDTO});
            expect(result).toBeUndefined();
        });
    });

});
