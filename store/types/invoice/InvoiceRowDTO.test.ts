// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createInvoiceRowDTO, explainInvoiceRowDTO, InvoiceRowDTO, isInvoiceRowDTO, parseInvoiceRowDTO } from "./InvoiceRowDTO";

describe('InvoiceRowDTO', () => {

    const validInvoiceRow: InvoiceRowDTO = createInvoiceRowDTO(
        'INV1',
        'INV1',
        'PAY1',
        'CAM1',
        'CAM_PAY1',
        'PROD1',
        '1234',
        '2023-01-01T00:00:00Z',
        '2023-01-01T00:00:00Z',
        '2023-01-01T00:00:00Z',
        '2023-12-31T00:00:00Z',
        'Some Product',
        'Internal note',
        1,
        100,
        0.2,
        0.1
    );

    const invalidInvoiceRow: any = {
        foo: 'bar'
    };

    describe('createInvoiceRowDTO', () => {
        it('creates a valid InvoiceRowDTO object', () => {
            expect(validInvoiceRow).toHaveProperty('invoiceRowId');
            expect(validInvoiceRow).toHaveProperty('invoiceId');
            expect(validInvoiceRow).toHaveProperty('paymentId');
            expect(validInvoiceRow).toHaveProperty('campaignId');
            expect(validInvoiceRow).toHaveProperty('campaignPaymentId');
            expect(validInvoiceRow).toHaveProperty('productId');
            expect(validInvoiceRow).toHaveProperty('updated');
            expect(validInvoiceRow).toHaveProperty('created');
            expect(validInvoiceRow).toHaveProperty('startDate');
            expect(validInvoiceRow).toHaveProperty('endDate');
            expect(validInvoiceRow).toHaveProperty('description');
            expect(validInvoiceRow).toHaveProperty('internalNote');
            expect(validInvoiceRow).toHaveProperty('amount');
            expect(validInvoiceRow).toHaveProperty('price');
            expect(validInvoiceRow).toHaveProperty('vatPercent');
            expect(validInvoiceRow).toHaveProperty('discountPercent');
        });
    });

    describe('isInvoiceRowDTO', () => {
        it('validates a correct InvoiceRowDTO object', () => {
            expect(isInvoiceRowDTO(validInvoiceRow)).toBe(true);
        });

        it('invalidates an incorrect object', () => {
            expect(isInvoiceRowDTO(invalidInvoiceRow)).toBe(false);
        });
    });

    describe('explainInvoiceRowDTO', () => {
        it('explains a correct InvoiceRowDTO object', () => {
            // assuming that the explain* methods return a readable representation
            expect(explainInvoiceRowDTO(validInvoiceRow)).toBe('OK');
        });

        it('explains an incorrect object', () => {
            // assuming that the explain* methods return 'Invalid' for invalid entries
            expect(explainInvoiceRowDTO(invalidInvoiceRow)).toContain('Value had extra properties: foo');
        });
    });

    describe('parseInvoiceRowDTO', () => {
        it('parses a correct InvoiceRowDTO object', () => {
            expect(parseInvoiceRowDTO(validInvoiceRow)).toEqual(validInvoiceRow);
        });

        it('returns undefined for an incorrect object', () => {
            expect(parseInvoiceRowDTO(invalidInvoiceRow)).toBeUndefined();
        });
    });

});
