// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpTransactionListDTO,
    isOpTransactionListDTO,
    explainOpTransactionListDTO,
    parseOpTransactionListDTO,
    isOpTransactionListDTOOrUndefined,
    explainOpTransactionListDTOOrUndefined
} from "./OpTransactionListDTO";
import { createOpTransactionDTO, OpTransactionDTO } from "./OpTransactionDTO";

describe('OpTransactionListDTO', () => {
    const mockTransaction: OpTransactionDTO = createOpTransactionDTO(
        '100.00', '200.00', '100.00', 'Test', 'EUR', '1234', '1234', 'OKOYFIHH',
        '1234', 'RF1234', '2023-07-21', 'John Doe', '2023-07-21', 'OKOYFIHH', '2023-07-21', 'Jane Doe',
        'FI7450009420999999', 'FI7450009420999999', 'end2end', 1234567890, '101', 'Transaction', '1234-5678-9012-3456'
    );
    const invalidTransaction = {...mockTransaction, amount: 100}; // Invalid because 'amount' is number instead of string.
    const mockTransactionList = createOpTransactionListDTO([mockTransaction, mockTransaction]);
    const invalidTransactionList = [...mockTransactionList, invalidTransaction];

    describe('isOpTransactionListDTO', () => {
        it('validates if a value is OpTransactionListDTO', () => {
            expect(isOpTransactionListDTO(mockTransactionList)).toBeTruthy();
            expect(isOpTransactionListDTO(invalidTransactionList)).toBeFalsy();
        });
    });

    describe('explainOpTransactionListDTO', () => {
        it('provides explanation if a value is not OpTransactionListDTO', () => {
            expect(explainOpTransactionListDTO(mockTransactionList)).toEqual('OK');
            expect(explainOpTransactionListDTO(invalidTransactionList)).toContain('OpTransactionDTO');
        });
    });

    describe('parseOpTransactionListDTO', () => {
        it('parses an OpTransactionListDTO or returns undefined', () => {
            expect(parseOpTransactionListDTO(mockTransactionList)).toEqual(mockTransactionList);
            expect(parseOpTransactionListDTO(invalidTransactionList)).toBeUndefined();
        });
    });

    describe('isOpTransactionListDTOOrUndefined', () => {
        it('validates if a value is OpTransactionListDTO or undefined', () => {
            expect(isOpTransactionListDTOOrUndefined(mockTransactionList)).toBeTruthy();
            expect(isOpTransactionListDTOOrUndefined(invalidTransactionList)).toBeFalsy();
            expect(isOpTransactionListDTOOrUndefined(undefined)).toBeTruthy();
        });
    });

    describe('explainOpTransactionListDTOOrUndefined', () => {
        it('provides explanation if a value is not OpTransactionListDTO or undefined', () => {
            expect(explainOpTransactionListDTOOrUndefined(mockTransactionList)).toEqual('OK');
            expect(explainOpTransactionListDTOOrUndefined(invalidTransactionList)).toContain('not OpTransactionListDTO or undefined');
            expect(explainOpTransactionListDTOOrUndefined(undefined)).toEqual('OK');
        });
    });

});
