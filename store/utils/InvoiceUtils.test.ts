// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { InvoiceDTO } from "../types/invoice/InvoiceDTO";
import { InvoiceUtils } from "./InvoiceUtils";
import { createInvoiceRowDTO, InvoiceRowDTO } from "../types/invoice/InvoiceRowDTO";
import { CurrencyUtils } from "../../CurrencyUtils";

describe('InvoiceUtils', () => {

    describe('totalCentsIncludingVat', () => {

        it('should return 0 when no rows are provided', () => {
            const invoice: InvoiceDTO = {
                invoiceId: 'invoiceId',
                clientId: 'clientId',
                campaignId: 'campaignId',
                groupId: 'groupId',
                bankAccountId: 'bankAccountId',
                wcOrderId: 'wcOrderId',
                updated: '2023-07-09',
                created: '2023-07-01',
                date: '2023-07-09',
                dueDate: '2023-08-09',
                remindDate: '2023-08-01',
                checkoutDate: '2023-08-05',
                referenceNumber: 'referenceNumber',
                internalNote: 'internalNote',
                extraNotice: 'extraNotice',
                webSecret: 'webSecret',
                checkoutStamp: 'checkoutStamp',
                onHold: false,
                isReminded: false,
                onCollection: false,
                isTerminated: false,
                buildDocuments: false,
                sendDocuments: false,
                dueDays: 30,
                isPaid: false,
                rows: [],
            };

            const result = InvoiceUtils.totalCentsIncludingVat(invoice);
            expect(result).toEqual(0);
        });

        it('should return correct sum when single row is provided', () => {

            const row: InvoiceRowDTO = createInvoiceRowDTO(
                'INV1',
                'INV1',
                'PAY1',
                'CAM1',
                'CAM_PAY1',
                'PROD1',
                '123456',
                '2023-01-01T00:00:00Z',
                '2023-01-01T00:00:00Z',
                '2023-01-01T00:00:00Z',
                '2023-12-31T00:00:00Z',
                'Some Product',
                'Internal note',
                2,
                100,
                0.24,
                0
            );

            const invoice: InvoiceDTO = {
                invoiceId: 'invoiceId',
                clientId: 'clientId',
                campaignId: 'campaignId',
                groupId: 'groupId',
                bankAccountId: 'bankAccountId',
                wcOrderId: 'wcOrderId',
                updated: '2023-07-09',
                created: '2023-07-01',
                date: '2023-07-09',
                dueDate: '2023-08-09',
                remindDate: '2023-08-01',
                checkoutDate: '2023-08-05',
                referenceNumber: 'referenceNumber',
                internalNote: 'internalNote',
                extraNotice: 'extraNotice',
                webSecret: 'webSecret',
                checkoutStamp: 'checkoutStamp',
                onHold: false,
                isReminded: false,
                onCollection: false,
                isTerminated: false,
                buildDocuments: false,
                sendDocuments: false,
                dueDays: 30,
                isPaid: false,
                rows: [row],
            };

            const itemSum = CurrencyUtils.getCents(
                CurrencyUtils.getSumWithVat(
                    row.price,
                    row.amount,
                    row.vatPercent,
                    row.discountPercent
                )
            );

            const result = InvoiceUtils.totalCentsIncludingVat(invoice);
            expect(result).toEqual(itemSum);
        });

        it('should return correct sum when multiple rows are provided', () => {
            const rows: InvoiceRowDTO[] = [
                createInvoiceRowDTO(
                    'INV1',
                    'INV1',
                    'PAY1',
                    'CAM1',
                    'CAM_PAY1',
                    'PROD1',
                    '123456',
                    '2023-01-01T00:00:00Z',
                    '2023-01-01T00:00:00Z',
                    '2023-01-01T00:00:00Z',
                    '2023-12-31T00:00:00Z',
                    'Some Product',
                    'Internal note',
                    2,
                    100,
                    0.24,
                    0
                ),
                createInvoiceRowDTO(
                    'INV1',
                    'INV1',
                    'PAY1',
                    'CAM1',
                    'CAM_PAY1',
                    'PROD1',
                    '123456',
                    '2023-01-01T00:00:00Z',
                    '2023-01-01T00:00:00Z',
                    '2023-01-01T00:00:00Z',
                    '2023-12-31T00:00:00Z',
                    'Some Product',
                    'Internal note',
                    3,
                    200,
                    0.24,
                    0
                ),
            ];

            const invoice: InvoiceDTO = {
                invoiceId: 'invoiceId',
                clientId: 'clientId',
                campaignId: 'campaignId',
                groupId: 'groupId',
                bankAccountId: 'bankAccountId',
                wcOrderId: 'wcOrderId',
                updated: '2023-07-09',
                created: '2023-07-01',
                date: '2023-07-09',
                dueDate: '2023-08-09',
                remindDate: '2023-08-01',
                checkoutDate: '2023-08-05',
                referenceNumber: 'referenceNumber',
                internalNote: 'internalNote',
                extraNotice: 'extraNotice',
                webSecret: 'webSecret',
                checkoutStamp: 'checkoutStamp',
                onHold: false,
                isReminded: false,
                onCollection: false,
                isTerminated: false,
                buildDocuments: false,
                sendDocuments: false,
                dueDays: 30,
                isPaid: false,
                rows: rows,
            };


            const expectedSum = rows.reduce((prev, item) => {
                const itemSum = CurrencyUtils.getCents(
                    CurrencyUtils.getSumWithVat(
                        item.price,
                        item.amount,
                        item.vatPercent,
                        item.discountPercent
                    )
                );
                return prev + itemSum;
            }, 0);

            const result = InvoiceUtils.totalCentsIncludingVat(invoice);
            expect(result).toEqual(expectedSum);
        });

    });

});
