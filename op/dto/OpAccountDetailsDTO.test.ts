// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { createOpAccountDetailsDTO, explainOpAccountDetailsDTO, explainOpAccountDetailsDTOOrUndefined, isOpAccountDetailsDTO, isOpAccountDetailsDTOOrUndefined, parseOpAccountDetailsDTO } from "./OpAccountDetailsDTO";

describe('OpAccountDetailsDTO functions', () => {
    const validOpAccountDetailsDTO = {
        bic: 'OKOYFIHH',
        iban: 'FI7450009499999999',
        dueDate: '29.11.2019',
        ownerId: '1234567-8',
        currency: 'EUR',
        netBalance: '222.22',
        accountName: 'Some name given by client',
        creditLimit: 0,
        surrogateId: 'rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==',
        accountOwner: 'Firstname Lastname',
        creationDate: '29.11.2011',
        grossBalance: '222.22',
        intraDayLimit: '222.22'
    };

    const invalidOpAccountDetailsDTO = {
        bic: 'OKOYFIHH',
        iban: 'FI7450009499999999',
        dueDate: '29.11.2019',
        ownerId: '1234567-8',
        currency: 'EUR',
        netBalance: '222.22',
        accountName: 'Some name given by client',
        creditLimit: 'invalid',
        surrogateId: 'rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==',
        accountOwner: 'Firstname Lastname',
        creationDate: '29.11.2011',
        grossBalance: '222.22',
        intraDayLimit: '222.22'
    };

    describe('createOpAccountDetailsDTO', () => {
        it('should create an OpAccountDetailsDTO', () => {
            const account = createOpAccountDetailsDTO(
                'OKOYFIHH',
                'FI7450009499999999',
                '29.11.2019',
                '1234567-8',
                'EUR',
                '222.22',
                'Some name given by client',
                0,
                'rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==',
                'Firstname Lastname',
                '29.11.2011',
                '222.22',
                '222.22');
            expect(account).toEqual(validOpAccountDetailsDTO);
        });
    });

    describe('isOpAccountDetailsDTO', () => {
        it('should return true for a valid OpAccountDetailsDTO', () => {
            expect(isOpAccountDetailsDTO(validOpAccountDetailsDTO)).toBe(true);
        });

        it('should return false for an invalid OpAccountDetailsDTO', () => {
            expect(isOpAccountDetailsDTO(invalidOpAccountDetailsDTO)).toBe(false);
        });
    });

    describe('explainOpAccountDetailsDTO', () => {

        it('should return OK for a valid OpAccountDetailsDTO', () => {
            expect(explainOpAccountDetailsDTO(validOpAccountDetailsDTO)).toBe('OK');
        });

        it('should return explanation for an invalid OpAccountDetailsDTO', () => {
            expect(explainOpAccountDetailsDTO(invalidOpAccountDetailsDTO)).toContain('property "creditLimit"');
        });

    });
    describe('parseOpAccountDetailsDTO', () => {
        it('should return the given value if it is a valid OpAccountDetailsDTO', () => {
            expect(parseOpAccountDetailsDTO(validOpAccountDetailsDTO)).toEqual(validOpAccountDetailsDTO);
        });

        it('should return undefined if the given value is not a valid OpAccountDetailsDTO', () => {
            expect(parseOpAccountDetailsDTO(invalidOpAccountDetailsDTO)).toBeUndefined();
        });
    });

    describe('isOpAccountDetailsDTOOrUndefined', () => {
        it('should return true for a valid OpAccountDetailsDTO', () => {
            expect(isOpAccountDetailsDTOOrUndefined(validOpAccountDetailsDTO)).toBe(true);
        });

        it('should return true for undefined', () => {
            expect(isOpAccountDetailsDTOOrUndefined(undefined)).toBe(true);
        });

        it('should return false for an invalid OpAccountDetailsDTO', () => {
            expect(isOpAccountDetailsDTOOrUndefined(invalidOpAccountDetailsDTO)).toBe(false);
        });
    });

    describe('explainOpAccountDetailsDTOOrUndefined', () => {
        it('should return OK for a valid OpAccountDetailsDTO', () => {
            expect(explainOpAccountDetailsDTOOrUndefined(validOpAccountDetailsDTO)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            expect(explainOpAccountDetailsDTOOrUndefined(undefined)).toBe('OK');
        });

        it('should return explanation for an invalid OpAccountDetailsDTO', () => {
            expect(explainOpAccountDetailsDTOOrUndefined(invalidOpAccountDetailsDTO)).toContain('not OpAccountDetailsDTO or undefined');
        });
    });

});
