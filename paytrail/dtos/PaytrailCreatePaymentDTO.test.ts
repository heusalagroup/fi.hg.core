// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailCreatePaymentDTO, explainPaytrailCreatePaymentDTO, explainPaytrailCreatePaymentDTOOrUndefined, isPaytrailCreatePaymentDTO, isPaytrailCreatePaymentDTOOrUndefined, parsePaytrailCreatePaymentDTO } from "./PaytrailCreatePaymentDTO";
import { PaytrailPaymentMethodGroup } from "../types/PaytrailPaymentMethodGroup";
import { PaytrailProvider } from "../types/PaytrailProvider";

describe('PaytrailCreatePaymentDTO', () => {

    const mockedPaytrailProvider : PaytrailProvider = {
        url: 'https://testurl.com',
        icon: 'https://testiconurl.com',
        svg: 'https://testsvgurl.com',
        group: PaytrailPaymentMethodGroup.CREDIT,
        name: 'testName',
        id: 'testId',
        parameters: [],
    };

    const mockedPaytrailPaymentMethodGroupData = {
        id: PaytrailPaymentMethodGroup.CREDIT,
        name: 'testName',
        icon: 'https://testiconurl.com',
        svg: 'https://testsvgurl.com',
    };

    const mockedReadonlyJsonObject = {
        key: 'testKey',
        value: 'testValue',
    };

    const mockedPaytrailCreatePaymentDTO = {
        transactionId: 'testTransactionId',
        href: 'https://testhref.com',
        terms: 'testTerms',
        groups: [mockedPaytrailPaymentMethodGroupData],
        reference: 'testReference',
        providers: [mockedPaytrailProvider],
        customProviders: mockedReadonlyJsonObject,
    };

    describe('createPaytrailCreatePaymentDTO', () => {
        it('creates PaytrailCreatePaymentDTO correctly', () => {
            const result = createPaytrailCreatePaymentDTO(
                'testTransactionId',
                'https://testhref.com',
                'testTerms',
                [{
                    id: PaytrailPaymentMethodGroup.CREDIT,
                    name: 'testName',
                    icon: 'https://testiconurl.com',
                    svg: 'https://testsvgurl.com',
                }],
                'testReference',
                [mockedPaytrailProvider],
                mockedReadonlyJsonObject
            );
            expect(result).toEqual(mockedPaytrailCreatePaymentDTO);
        });
    });

    describe('isPaytrailCreatePaymentDTO', () => {

        it('validates if an object is PaytrailCreatePaymentDTO', () => {
            const result = isPaytrailCreatePaymentDTO(mockedPaytrailCreatePaymentDTO);
            expect(result).toBe(true);
        });

        it('returns false if the object is not PaytrailCreatePaymentDTO', () => {
            const result = isPaytrailCreatePaymentDTO({
                transactionId: 'testTransactionId',
                // Missing other properties.
            });
            expect(result).toBe(false);
        });

    });

    describe('explainPaytrailCreatePaymentDTO', () => {
        it('explains why an object cannot be parsed into PaytrailCreatePaymentDTO', () => {
            const result = explainPaytrailCreatePaymentDTO({
                transactionId: 'testTransactionId',
                // Missing other properties.
            });
            expect(result).toContain('property "href" not string');
            expect(result).toContain('property "terms" not string');
            expect(result).toContain('property "groups" not PaytrailPaymentMethodGroupData');
            expect(result).toContain('property "reference" not string');
            expect(result).toContain('property "providers" not PaytrailProvider');
            expect(result).not.toContain('property "customProviders" not ReadonlyJsonObject');
        });
    });

    describe('parsePaytrailCreatePaymentDTO', () => {
        it('parses object into PaytrailCreatePaymentDTO if it is valid', () => {
            const result = parsePaytrailCreatePaymentDTO(mockedPaytrailCreatePaymentDTO);
            expect(result).toEqual(mockedPaytrailCreatePaymentDTO);
        });

        it('returns undefined if the object cannot be parsed into PaytrailCreatePaymentDTO', () => {
            const result = parsePaytrailCreatePaymentDTO({
                transactionId: 'testTransactionId',
                // Missing other properties.
            });
            expect(result).toBeUndefined();
        });
    });

    describe('isPaytrailCreatePaymentDTOOrUndefined', () => {
        it('validates if a value is PaytrailCreatePaymentDTO or undefined', () => {
            expect(isPaytrailCreatePaymentDTOOrUndefined(mockedPaytrailCreatePaymentDTO)).toBe(true);
            expect(isPaytrailCreatePaymentDTOOrUndefined(undefined)).toBe(true);
            expect(isPaytrailCreatePaymentDTOOrUndefined({ transactionId: 'testTransactionId' })).toBe(false); // Missing other properties.
        });
    });

    describe('explainPaytrailCreatePaymentDTOOrUndefined', () => {
        it('explains why a value is not PaytrailCreatePaymentDTO or undefined', () => {
            const result = explainPaytrailCreatePaymentDTOOrUndefined({ transactionId: 'testTransactionId' }); // Missing other properties.
            expect(result).toContain('not PaytrailCreatePaymentDTO or undefined');
        });
    });

});
