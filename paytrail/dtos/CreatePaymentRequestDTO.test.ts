// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PaytrailCurrency } from "../types/PaytrailCurrency";
import { PaytrailCustomer } from "../types/PaytrailCustomer";
import { PaytrailCallbackUrl } from "../types/PaytrailCallbackUrl";
import { PaytrailLanguage } from "../types/PaytrailLanguage";
import { createCreatePaymentRequestDTO, CreatePaymentRequestDTO, isCreatePaymentRequestDTO, parseCreatePaymentRequestDTO } from "./CreatePaymentRequestDTO";

describe('CreatePaymentRequestDTO', () => {

    const validDTO : CreatePaymentRequestDTO = {
        stamp: 'stamp',
        reference: 'reference',
        amount: 100,
        currency: PaytrailCurrency.EUR,
        language: PaytrailLanguage.EN,
        customer: {
            email: 'john.doe@example.org',
            firstName: 'John',
            lastName: 'Doe',
            phone: '358451031234',
            vatId: 'FI02454583',
            companyName: 'Example company'
        },
        redirectUrls: {
            success: 'https://example.org/51/success',
            cancel: 'https://example.org/51/cancel'
        },
    };

    const invalidDTO : any = {
        stamp: 'stamp',
        reference: 'reference',
        amount: '100', // should be a number
        currency: PaytrailCurrency.EUR,
        language: PaytrailLanguage.EN,
        customer: {} as PaytrailCustomer,
        redirectUrls: {} as PaytrailCallbackUrl,
    };

    describe('createCreatePaymentRequestDTO', () => {

        it('should return an object matching the input arguments', () => {
            const dto = createCreatePaymentRequestDTO(
                validDTO.stamp,
                validDTO.reference,
                validDTO.amount,
                validDTO.currency,
                validDTO.language,
                validDTO.customer,
                validDTO.redirectUrls
            );
            expect(dto).toEqual(validDTO);
        });

    });

    describe('isCreatePaymentRequestDTO', () => {

        it('should return true for a valid DTO', () => {
            expect(isCreatePaymentRequestDTO(validDTO)).toBe(true);
        });

        it('should return false for an invalid DTO', () => {
            expect(isCreatePaymentRequestDTO(invalidDTO)).toBe(false);
        });

    });

    describe('parseCreatePaymentRequestDTO', () => {

        it('should return the original object for a valid DTO', () => {
            expect(parseCreatePaymentRequestDTO(validDTO)).toEqual(validDTO);
        });

        it('should return undefined for an invalid DTO', () => {
            expect(parseCreatePaymentRequestDTO(invalidDTO)).toBeUndefined();
        });

    });

});
