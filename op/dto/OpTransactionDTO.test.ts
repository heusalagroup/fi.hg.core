// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpTransactionDTO,
    isOpTransactionDTO,
    explainOpTransactionDTO,
    parseOpTransactionDTO,
    isOpTransactionDTOOrUndefined,
    explainOpTransactionDTOOrUndefined,
    OpTransactionDTO
} from './OpTransactionDTO';

describe('OpTransactionDTO', () => {

    const mockTransaction: OpTransactionDTO = createOpTransactionDTO(
        '100.00', '200.00', '100.00', 'Test', 'EUR', '1234', '1234', 'OKOYFIHH',
        '1234', 'RF1234', '2023-07-21', 'John Doe', '2023-07-21', 'OKOYFIHH', '2023-07-21', 'Jane Doe',
        'FI7450009420999999', 'FI7450009420999999', 'end2end', 1234567890, '123', 'Transaction', '1234-5678-9012-3456'
    );

    const invalidTransaction = {...mockTransaction, amount: 100}; // Invalid because 'amount' is number instead of string.

    describe('isOpTransactionDTO', () => {
        it('validates if a value is OpTransactionDTO', () => {
            expect(isOpTransactionDTO(mockTransaction)).toBeTruthy();
            expect(isOpTransactionDTO(invalidTransaction)).toBeFalsy();
        });
    });

    describe('explainOpTransactionDTO', () => {
        it('provides explanation if a value is not OpTransactionDTO', () => {
            expect(explainOpTransactionDTO(mockTransaction)).toEqual('OK');
            expect(explainOpTransactionDTO(invalidTransaction)).toContain('amount');
        });
    });

    describe('parseOpTransactionDTO', () => {
        it('parses an OpTransactionDTO or returns undefined', () => {
            expect(parseOpTransactionDTO(mockTransaction)).toEqual(mockTransaction);
            expect(parseOpTransactionDTO(invalidTransaction)).toBeUndefined();
        });
    });

    describe('isOpTransactionDTOOrUndefined', () => {
        it('validates if a value is OpTransactionDTO or undefined', () => {
            expect(isOpTransactionDTOOrUndefined(mockTransaction)).toBeTruthy();
            expect(isOpTransactionDTOOrUndefined(invalidTransaction)).toBeFalsy();
            expect(isOpTransactionDTOOrUndefined(undefined)).toBeTruthy();
        });
    });

    describe('explainOpTransactionDTOOrUndefined', () => {
        it('provides explanation if a value is not OpTransactionDTO or undefined', () => {
            expect(explainOpTransactionDTOOrUndefined(mockTransaction)).toEqual('OK');
            expect(explainOpTransactionDTOOrUndefined(invalidTransaction)).toContain('not OpTransactionDTO or undefined');
            expect(explainOpTransactionDTOOrUndefined(undefined)).toEqual('OK');
        });
    });

});
