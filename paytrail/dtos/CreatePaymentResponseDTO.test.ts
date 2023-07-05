// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createCreatePaymentResponseDTO, explainCreatePaymentResponseDTO, explainCreatePaymentResponseDTOOrUndefined, isCreatePaymentResponseDTO, isCreatePaymentResponseDTOOrUndefined, parseCreatePaymentResponseDTO } from "./CreatePaymentResponseDTO";
import { PaytrailPaymentMethodGroup } from "../types/PaytrailPaymentMethodGroup";
import { PaytrailProvider } from "../types/PaytrailProvider";

describe('CreatePaymentResponseDTO', () => {

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

    const mockedCreatePaymentResponseDTO = {
        transactionId: 'testTransactionId',
        href: 'https://testhref.com',
        terms: 'testTerms',
        groups: [mockedPaytrailPaymentMethodGroupData],
        reference: 'testReference',
        providers: [mockedPaytrailProvider],
        customProviders: mockedReadonlyJsonObject,
    };

    describe('createCreatePaymentResponseDTO', () => {
        it('creates CreatePaymentResponseDTO correctly', () => {
            const result = createCreatePaymentResponseDTO(
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
            expect(result).toEqual(mockedCreatePaymentResponseDTO);
        });
    });

    describe('isCreatePaymentResponseDTO', () => {

        it('validates if an object is CreatePaymentResponseDTO', () => {
            const result = isCreatePaymentResponseDTO(mockedCreatePaymentResponseDTO);
            expect(result).toBe(true);
        });

        it('returns false if the object is not CreatePaymentResponseDTO', () => {
            const result = isCreatePaymentResponseDTO({
                transactionId: 'testTransactionId',
                // Missing other properties.
            });
            expect(result).toBe(false);
        });

    });

    describe('explainCreatePaymentResponseDTO', () => {
        it('explains why an object cannot be parsed into CreatePaymentResponseDTO', () => {
            const result = explainCreatePaymentResponseDTO({
                transactionId: 'testTransactionId',
                // Missing other properties.
            });
            expect(result).toContain('property "href" not string');
            expect(result).toContain('property "terms" not string');
            expect(result).toContain('property "groups" not PaytrailPaymentMethodGroupData');
            expect(result).toContain('property "reference" not string');
            expect(result).toContain('property "providers" not PaytrailProvider');
            expect(result).toContain('property "customProviders" not ReadonlyJsonObject');
        });
    });

    describe('parseCreatePaymentResponseDTO', () => {
        it('parses object into CreatePaymentResponseDTO if it is valid', () => {
            const result = parseCreatePaymentResponseDTO(mockedCreatePaymentResponseDTO);
            expect(result).toEqual(mockedCreatePaymentResponseDTO);
        });

        it('returns undefined if the object cannot be parsed into CreatePaymentResponseDTO', () => {
            const result = parseCreatePaymentResponseDTO({
                transactionId: 'testTransactionId',
                // Missing other properties.
            });
            expect(result).toBeUndefined();
        });
    });

    describe('isCreatePaymentResponseDTOOrUndefined', () => {
        it('validates if a value is CreatePaymentResponseDTO or undefined', () => {
            expect(isCreatePaymentResponseDTOOrUndefined(mockedCreatePaymentResponseDTO)).toBe(true);
            expect(isCreatePaymentResponseDTOOrUndefined(undefined)).toBe(true);
            expect(isCreatePaymentResponseDTOOrUndefined({ transactionId: 'testTransactionId' })).toBe(false); // Missing other properties.
        });
    });

    describe('explainCreatePaymentResponseDTOOrUndefined', () => {
        it('explains why a value is not CreatePaymentResponseDTO or undefined', () => {
            const result = explainCreatePaymentResponseDTOOrUndefined({ transactionId: 'testTransactionId' }); // Missing other properties.
            expect(result).toContain('not CreatePaymentResponseDTO or undefined');
        });
    });

});
