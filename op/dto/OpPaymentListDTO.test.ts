// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpPaymentResponseDTO } from "./OpPaymentResponseDTO";
import { createOpPaymentListDTO, explainOpPaymentListDTO, explainOpPaymentListDTOOrUndefined, isOpPaymentListDTO, isOpPaymentListDTOOrUndefined, parseOpPaymentListDTO } from "./OpPaymentListDTO";
import { OpPaymentStatus } from "../types/OpPaymentStatus";
import { OpPaymentType } from "../types/OpPaymentType";
import { Currency } from "../../types/Currency";

const MOCK_PAYMENT_RESPONSE: OpPaymentResponseDTO = {
    "amount": "3.45",
    "status": OpPaymentStatus.PROCESSED,
    "currency": Currency.EUR,
    "archiveId": "20190524593156999999",
    "debtorIban": "FI4550009420888888",
    "ultimateDebtorName": "Ultimate Debtor",
    "bookingDate": "2019-05-12",
    "paymentType": OpPaymentType.SCT_INST,
    "creditorIban": "FI4550009420999999",
    "creditorName": "Cedric Creditor",
    "ultimateCreditorName": "Ultimate Creditor",
    "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
    "transactionDate": "2019-05-11",
    "endToEndId": "544652-end2end"
};

const MOCK_PAYMENT_LIST: readonly OpPaymentResponseDTO[] = [MOCK_PAYMENT_RESPONSE];

describe('OpPaymentListDTO functions', () => {

    describe('createOpPaymentListDTO', () => {
        it('should create OpPaymentListDTO from given OpPaymentResponseDTO array', () => {
            const result = createOpPaymentListDTO(MOCK_PAYMENT_LIST);
            expect(result).toEqual(MOCK_PAYMENT_LIST);
        });
    });

    describe('isOpPaymentListDTO', () => {
        it('should correctly identify OpPaymentListDTO', () => {
            expect(isOpPaymentListDTO(MOCK_PAYMENT_LIST)).toBe(true);
            expect(isOpPaymentListDTO({})).toBe(false);
        });
    });

    describe('explainOpPaymentListDTO', () => {
        it('should provide correct explanation for OpPaymentListDTO', () => {
            expect(explainOpPaymentListDTO(MOCK_PAYMENT_LIST)).toEqual('OK');
            expect(explainOpPaymentListDTO({})).toEqual('not OpPaymentResponseDTO');
        });
    });

    describe('parseOpPaymentListDTO', () => {
        it('should parse OpPaymentListDTO correctly', () => {
            expect(parseOpPaymentListDTO(MOCK_PAYMENT_LIST)).toEqual(MOCK_PAYMENT_LIST);
            expect(parseOpPaymentListDTO({})).toBeUndefined();
        });
    });

    describe('isOpPaymentListDTOOrUndefined', () => {
        it('should correctly identify OpPaymentListDTO or undefined', () => {
            expect(isOpPaymentListDTOOrUndefined(MOCK_PAYMENT_LIST)).toBe(true);
            expect(isOpPaymentListDTOOrUndefined(undefined)).toBe(true);
            expect(isOpPaymentListDTOOrUndefined({})).toBe(false);
        });
    });

    describe('explainOpPaymentListDTOOrUndefined', () => {
        it('should provide correct explanation for OpPaymentListDTO or undefined', () => {
            expect(explainOpPaymentListDTOOrUndefined(MOCK_PAYMENT_LIST)).toEqual('OK');
            expect(explainOpPaymentListDTOOrUndefined(undefined)).toEqual('OK');
            expect(explainOpPaymentListDTOOrUndefined({})).toEqual('not OpPaymentListDTO or undefined');
        });
    });

});
