// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAccountDTO, createOpAccountDTO, isOpAccountDTO, explainOpAccountDTO, parseOpAccountDTO, isOpAccountDTOOrUndefined, explainOpAccountDTOOrUndefined } from './OpAccountDTO';

describe('OpAccountDTO', () => {
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
    const invalidOpAccountDTO = {
        bic: 1234,
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

    describe('createOpAccountDTO', () => {

        it('should create a valid OpAccountDTO object', () => {
            expect(createOpAccountDTO('OKOYFIHH', 'FI7450009420999999', 'Companys payroll account', '-12.3', 'EUR', 'rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==', { property1: 'string', property2: 'string' }))
            .toEqual(validOpAccountDTO);
        });

    });

    describe('isOpAccountDTO', () => {

        it('should return true for a valid OpAccountDTO', () => {
            expect(isOpAccountDTO(validOpAccountDTO)).toBe(true);
        });

        it('should return false for an invalid OpAccountDTO', () => {
            expect(isOpAccountDTO(invalidOpAccountDTO)).toBe(false);
        });

    });

    describe('explainOpAccountDTO', () => {

        it('should return OK for a valid OpAccountDTO', () => {
            expect(explainOpAccountDTO(validOpAccountDTO)).toBe('OK');
        });

        it('should return explanation for an invalid OpAccountDTO', () => {
            expect(explainOpAccountDTO(invalidOpAccountDTO)).toContain('property "bic"');
        });

    });

    describe('parseOpAccountDTO', () => {

        it('should return valid OpAccountDTO object for a valid input', () => {
            expect(parseOpAccountDTO(validOpAccountDTO)).toEqual(validOpAccountDTO);
        });

        it('should return undefined for an invalid input', () => {
            expect(parseOpAccountDTO(invalidOpAccountDTO)).toBeUndefined();
        });

    });

    describe('isOpAccountDTOOrUndefined', () => {

        it('should return true for a valid OpAccountDTO', () => {
            expect(isOpAccountDTOOrUndefined(validOpAccountDTO)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpAccountDTOOrUndefined(undefined)).toBe(true);
        });

        it('should return false for an invalid OpAccountDTO', () => {
            expect(isOpAccountDTOOrUndefined(invalidOpAccountDTO)).toBe(false);
        });

    });

    describe('explainOpAccountDTOOrUndefined', () => {

        it('should return OK for a valid OpAccountDTO', () => {
            expect(explainOpAccountDTOOrUndefined(validOpAccountDTO)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            expect(explainOpAccountDTOOrUndefined(undefined)).toBe('OK');
        });

        it('should return explanation for an invalid OpAccountDTO', () => {
            expect(explainOpAccountDTOOrUndefined(invalidOpAccountDTO)).toContain('not OpAccountDTO or undefined');
        });

    });

});
