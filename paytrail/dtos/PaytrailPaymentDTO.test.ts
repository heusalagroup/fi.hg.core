// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailPaymentDTO, explainPaytrailPaymentDTO, isPaytrailPaymentDTO, parsePaytrailPaymentDTO, PaytrailPaymentDTO } from "./PaytrailPaymentDTO";
import { PaytrailCurrency } from "../types/PaytrailCurrency";
import { PaytrailStatus } from "../types/PaytrailStatus";

describe('PaytrailPaymentDTO', () => {

    const mockedPaymentDTO : PaytrailPaymentDTO = {
        transactionId: '681538c4-fc84-11e9-83bc-2ffcef4c3453',
        status: PaytrailStatus.OK,
        amount: 1689,
        currency: PaytrailCurrency.EUR,
        stamp: '15725981193483',
        reference: '4940046476',
        createdAt: '2019-11-01T10:48:39.979Z',
        href: 'https://pay.paytrail.com/pay/681538c4-fc84-11e9-83bc-2ffcef4c3453',
        provider: undefined,
        fillingCode: undefined,
        paidAt: undefined,
        settlementReference: undefined,
    };

    describe('createPaytrailPaymentDTO', () => {
        it('creates PaytrailPaymentDTO correctly', () => {
            const result = createPaytrailPaymentDTO(
                mockedPaymentDTO.transactionId,
                mockedPaymentDTO.status,
                mockedPaymentDTO.amount,
                mockedPaymentDTO.currency,
                mockedPaymentDTO.stamp,
                mockedPaymentDTO.reference,
                mockedPaymentDTO.createdAt,
                mockedPaymentDTO.href
            );
            expect(result).toEqual(mockedPaymentDTO);
        });
    });

    describe('isPaytrailPaymentDTO', () => {

        it('validates if an object is PaytrailPaymentDTO', () => {
            const result = isPaytrailPaymentDTO(mockedPaymentDTO);
            expect(result).toBe(true);
        });

        it('returns false if the object is not PaytrailPaymentDTO', () => {
            const result = isPaytrailPaymentDTO({ ...mockedPaymentDTO, amount: 'invalid' }); // invalid amount property
            expect(result).toBe(false);
        });

    });

    describe('explainPaytrailPaymentDTO', () => {
        it('explains why an object cannot be parsed into PaytrailPaymentDTO', () => {
            const result = explainPaytrailPaymentDTO({ ...mockedPaymentDTO, amount: 'invalid' }); // invalid amount property
            expect(result).toContain('property "amount" not number');
        });
    });

    describe('parsePaytrailPaymentDTO', () => {

        it('parses object into PaytrailPaymentDTO if it is valid', () => {
            const result = parsePaytrailPaymentDTO(mockedPaymentDTO);
            expect(result).toEqual(mockedPaymentDTO);
        });

        it('returns undefined if the object cannot be parsed into PaytrailPaymentDTO', () => {
            const result = parsePaytrailPaymentDTO({ ...mockedPaymentDTO, amount: 'invalid' }); // invalid amount property
            expect(result).toBeUndefined();
        });

    });

});
