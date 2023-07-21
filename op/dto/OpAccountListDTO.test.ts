// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAccountDTO } from './OpAccountDTO';
import {
    OpAccountListDTO,
    createOpAccountListDTO,
    isOpAccountListDTO,
    explainOpAccountListDTO,
    parseOpAccountListDTO,
    isOpAccountListDTOOrUndefined,
    explainOpAccountListDTOOrUndefined
} from './OpAccountListDTO';

describe('OpAccountListDTO', () => {
    const validOpAccountDTO: OpAccountDTO = {
        bic: 'OKOYFIHH',
        iban: 'FI7450009420999999',
        name: 'Companys payroll account',
        balance: '-12.3',
        currency: 'EUR',
        surrogateId: 'rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==',
        productNames: {
            property1: 'string',
            property2: 'string'
        }
    };
    const validOpAccountListDTO: OpAccountListDTO = [validOpAccountDTO, validOpAccountDTO];
    const invalidOpAccountListDTO = [validOpAccountDTO, 'invalid data'];

    describe('createOpAccountListDTO', () => {
        it('should create a valid OpAccountListDTO object', () => {
            expect(createOpAccountListDTO([validOpAccountDTO, validOpAccountDTO])).toEqual(validOpAccountListDTO);
        });
    });

    describe('isOpAccountListDTO', () => {
        it('should return true for a valid OpAccountListDTO', () => {
            expect(isOpAccountListDTO(validOpAccountListDTO)).toBe(true);
        });

        it('should return false for an invalid OpAccountListDTO', () => {
            expect(isOpAccountListDTO(invalidOpAccountListDTO)).toBe(false);
        });
    });

    describe('explainOpAccountListDTO', () => {
        it('should return OK for a valid OpAccountListDTO', () => {
            expect(explainOpAccountListDTO(validOpAccountListDTO)).toBe('OK');
        });

        it('should return explanation for an invalid OpAccountListDTO', () => {
            expect(explainOpAccountListDTO(invalidOpAccountListDTO)).toContain('OpAccountDTO');
        });
    });

    describe('parseOpAccountListDTO', () => {
        it('should return valid OpAccountListDTO object for a valid input', () => {
            expect(parseOpAccountListDTO(validOpAccountListDTO)).toEqual(validOpAccountListDTO);
        });

        it('should return undefined for an invalid input', () => {
            expect(parseOpAccountListDTO(invalidOpAccountListDTO)).toBeUndefined();
        });
    });

    describe('isOpAccountListDTOOrUndefined', () => {
        it('should return true for a valid OpAccountListDTO', () => {
            expect(isOpAccountListDTOOrUndefined(validOpAccountListDTO)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpAccountListDTOOrUndefined(undefined)).toBe(true);
        });

        it('should return false for an invalid OpAccountListDTO', () => {
            expect(isOpAccountListDTOOrUndefined(invalidOpAccountListDTO)).toBe(false);
        });
    });

    describe('explainOpAccountListDTOOrUndefined', () => {
        it('should return OK for a valid OpAccountListDTO', () => {
            expect(explainOpAccountListDTOOrUndefined(validOpAccountListDTO)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            expect(explainOpAccountListDTOOrUndefined(undefined)).toBe('OK');
        });

        it('should return explanation for an invalid OpAccountListDTO', () => {
            expect(explainOpAccountListDTOOrUndefined(invalidOpAccountListDTO)).toContain('OpAccountListDTO');
        });
    });

});
