// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createOpPaymentResponseDTO, explainOpPaymentResponseDTO, explainOpPaymentResponseDTOOrUndefined, isOpPaymentResponseDTO, isOpPaymentResponseDTOOrUndefined, parseOpPaymentResponseDTO } from "./OpPaymentResponseDTO";
import { OpPaymentStatus } from "../types/OpPaymentStatus";
import { OpPaymentType } from "../types/OpPaymentType";
import { Currency } from "../../types/Currency";

describe('OpPaymentResponseDTO', () => {

    describe('createOpPaymentResponseDTO', () => {

        it('creates a valid DTO given valid inputs', () => {
            const validDtoOrigin = {
                "amount": "3.45",
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            const validDto = createOpPaymentResponseDTO(
                "3.45",
                OpPaymentStatus.PROCESSED,
                Currency.EUR,
                "20190524593156999999",
                "FI4550009420888888",
                "Ultimate Debtor",
                "2019-05-12",
                OpPaymentType.SCT_INST,
                "FI4550009420999999",
                "Cedric Creditor",
                "Ultimate Creditor",
                "A_50009420112088_2019-05-24_20190524593156999999_0",
                "2019-05-11",
                "544652-end2end",
            );

            expect(isOpPaymentResponseDTO(validDto)).toBe(true);
            expect(validDto).toStrictEqual(validDtoOrigin);
        });

    });

    describe('isOpPaymentResponseDTO', () => {

        it('returns true for valid DTO', () => {
            const validDto = {
                "amount": "3.45",
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(isOpPaymentResponseDTO(validDto)).toBe(true);
        });

        it('returns false for invalid DTO', () => {
            const invalidDto = {
                "amount": 3.45,
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(isOpPaymentResponseDTO(invalidDto)).toBe(false);
        });

    });

    describe('explainOpPaymentResponseDTO', () => {

        it('returns "OK" for valid DTO', () => {
            const validDto = {
                "amount": "3.45",
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(explainOpPaymentResponseDTO(validDto)).toBe('OK');
        });

        it('explains the problem for invalid DTO', () => {
            const invalidDto = {
                "amount": 3.45,
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(explainOpPaymentResponseDTO(invalidDto)).toContain('property "amount" not string');
        });

    });

    describe('parseOpPaymentResponseDTO', () => {

        it('returns DTO for valid input', () => {
            const validDto = {
                "amount": "3.45",
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(parseOpPaymentResponseDTO(validDto)).toEqual(validDto);
        });

        it('returns undefined for invalid input', () => {
            const invalidDto = {
                "amount": 3.45,
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(parseOpPaymentResponseDTO(invalidDto)).toBeUndefined();
        });

    });

    describe('isOpPaymentResponseDTOOrUndefined', () => {
        it('returns true for valid DTO or undefined', () => {
            const validDto = {
                "amount": "3.45",
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(isOpPaymentResponseDTOOrUndefined(validDto)).toBe(true);
            expect(isOpPaymentResponseDTOOrUndefined(undefined)).toBe(true);
        });

        it('returns false for invalid DTO', () => {
            const invalidDto = { /* Invalid properties here */ };

            expect(isOpPaymentResponseDTOOrUndefined(invalidDto)).toBe(false);
        });
    });

    describe('explainOpPaymentResponseDTOOrUndefined', () => {
        it('returns "Ok" for valid DTO or undefined', () => {
            const validDto = {
                "amount": "3.45",
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(explainOpPaymentResponseDTOOrUndefined(validDto)).toBe('OK');
            expect(explainOpPaymentResponseDTOOrUndefined(undefined)).toBe('OK');
        });

        it('explains the problem for invalid DTO', () => {
            const invalidDto = {
                "amount": 3.45,
                "status": "PROCESSED",
                "currency": "EUR",
                "archiveId": "20190524593156999999",
                "debtorIban": "FI4550009420888888",
                "ultimateDebtorName": "Ultimate Debtor",
                "bookingDate": "2019-05-12",
                "paymentType": "SCT_INST",
                "creditorIban": "FI4550009420999999",
                "creditorName": "Cedric Creditor",
                "ultimateCreditorName": "Ultimate Creditor",
                "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                "transactionDate": "2019-05-11",
                "endToEndId": "544652-end2end"
            };

            expect(explainOpPaymentResponseDTOOrUndefined(invalidDto)).toContain('not OpPaymentResponseDTO or undefined');
        });
    });

});
