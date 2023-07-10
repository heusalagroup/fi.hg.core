// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createInvoiceDTO, explainInvoiceDTO, explainInvoiceDTOOrUndefined, InvoiceDTO, isInvoiceDTO, isInvoiceDTOOrUndefined, parseInvoiceDTO } from "./InvoiceDTO";
import { createInvoiceRowDTO, InvoiceRowDTO } from "./InvoiceRowDTO";
import { PaytrailPaymentProviderListDTO } from "../../../paytrail/dtos/PaytrailPaymentProviderListDTO";
import { PaytrailPaymentMethodGroup } from "../../../paytrail/types/PaytrailPaymentMethodGroup";
import { PaytrailProvider } from "../../../paytrail/types/PaytrailProvider";
import { PaytrailPaymentDTO } from "../../../paytrail/dtos/PaytrailPaymentDTO";
import { PaytrailStatus } from "../../../paytrail/types/PaytrailStatus";
import { PaytrailCurrency } from "../../../paytrail/types/PaytrailCurrency";

describe('InvoiceDTO', () => {

    const validInvoiceRowDTO: InvoiceRowDTO = createInvoiceRowDTO(
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
        1,
        100,
        0.2,
        0.1
    );

    const validPaytrailPaymentProviderListDTO : PaytrailPaymentProviderListDTO = {
        "terms": "Valitsemalla maksutavan hyväksyt <a href=\"https://www.paytrail.com/kuluttaja/maksupalveluehdot\" target=\"_blank\">maksupalveluehdot</a>",
        "providers": [
            {
                "id": "pivo",
                "name": "Pivo",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg",
                "group": PaytrailPaymentMethodGroup.MOBILE
            },
            {
                "id": "osuuspankki",
                "name": "OP",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/osuuspankki.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/osuuspankki.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "nordea",
                "name": "Nordea",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/nordea.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/nordea.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "handelsbanken",
                "name": "Handelsbanken",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/handelsbanken.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/handelsbanken.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "pop",
                "name": "POP Pankki",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/pop.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/pop.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "aktia",
                "name": "Aktia",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/aktia.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/aktia.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "saastopankki",
                "name": "Säästöpankki",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/saastopankki.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/saastopankki.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "omasp",
                "name": "Oma Säästöpankki",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/omasp.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/omasp.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "spankki",
                "name": "S-pankki",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/spankki.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/spankki.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "alandsbanken",
                "name": "Ålandsbanken",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/alandsbanken.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/alandsbanken.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "danske",
                "name": "Danske Bank",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/danske.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/danske.svg",
                "group": PaytrailPaymentMethodGroup.BANK
            },
            {
                "id": "creditcard",
                "name": "Visa",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/visa.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/visa.svg",
                "group": PaytrailPaymentMethodGroup.CREDIT_CARD
            },
            {
                "id": "creditcard",
                "name": "Visa Electron",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/visa-electron.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/visa-electron.svg",
                "group": PaytrailPaymentMethodGroup.CREDIT_CARD
            },
            {
                "id": "creditcard",
                "name": "Mastercard",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/mastercard.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/mastercard.svg",
                "group": PaytrailPaymentMethodGroup.CREDIT_CARD
            },
            {
                "id": "amex",
                "name": "American Express",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/amex.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/amex.svg",
                "group": PaytrailPaymentMethodGroup.CREDIT_CARD
            },
            {
                "id": "collectorb2c",
                "name": "Collector",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/walley.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/walley.svg",
                "group": PaytrailPaymentMethodGroup.CREDIT
            },
            {
                "id": "collectorb2b",
                "name": "Collector B2B",
                "icon": "https://resources.paytrail.com/images/payment-method-logos/walley-yrityslasku.png",
                "svg": "https://resources.paytrail.com/images/payment-method-logos/walley-yrityslasku.svg",
                "group": PaytrailPaymentMethodGroup.CREDIT
            }
        ],
        "groups": [
            {
                "id": PaytrailPaymentMethodGroup.MOBILE,
                "name": "Mobiilimaksutavat",
                "icon": "https://resources.paytrail.com/images/payment-group-icons/mobile.png",
                "svg": "https://resources.paytrail.com/images/payment-group-icons/mobile.svg",
                "providers": [
                    {
                        "id": "pivo",
                        "name": "Pivo",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg",
                        "group": PaytrailPaymentMethodGroup.MOBILE
                    }
                ]
            },
            {
                "id": PaytrailPaymentMethodGroup.BANK,
                "name": "Pankkimaksutavat",
                "icon": "https://resources.paytrail.com/images/payment-group-icons/bank.png",
                "svg": "https://resources.paytrail.com/images/payment-group-icons/bank.svg",
                "providers": [
                    {
                        "id": "osuuspankki",
                        "name": "OP",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/osuuspankki.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/osuuspankki.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "nordea",
                        "name": "Nordea",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/nordea.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/nordea.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "handelsbanken",
                        "name": "Handelsbanken",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/handelsbanken.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/handelsbanken.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "pop",
                        "name": "POP Pankki",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/pop.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/pop.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "aktia",
                        "name": "Aktia",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/aktia.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/aktia.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "saastopankki",
                        "name": "Säästöpankki",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/saastopankki.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/saastopankki.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "omasp",
                        "name": "Oma Säästöpankki",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/omasp.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/omasp.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "spankki",
                        "name": "S-pankki",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/spankki.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/spankki.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "alandsbanken",
                        "name": "Ålandsbanken",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/alandsbanken.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/alandsbanken.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    },
                    {
                        "id": "danske",
                        "name": "Danske Bank",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/danske.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/danske.svg",
                        "group": PaytrailPaymentMethodGroup.BANK
                    }
                ]
            },
            {
                "id": PaytrailPaymentMethodGroup.CREDIT_CARD,
                "name": "Korttimaksutavat",
                "icon": "https://resources.paytrail.com/images/payment-group-icons/creditcard.png",
                "svg": "https://resources.paytrail.com/images/payment-group-icons/creditcard.svg",
                "providers": [
                    {
                        "id": "creditcard",
                        "name": "Visa",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/visa.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/visa.svg",
                        "group": PaytrailPaymentMethodGroup.CREDIT_CARD
                    },
                    {
                        "id": "creditcard",
                        "name": "Visa Electron",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/visa-electron.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/visa-electron.svg",
                        "group": PaytrailPaymentMethodGroup.CREDIT_CARD
                    },
                    {
                        "id": "creditcard",
                        "name": "Mastercard",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/mastercard.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/mastercard.svg",
                        "group": PaytrailPaymentMethodGroup.CREDIT_CARD
                    },
                    {
                        "id": "amex",
                        "name": "American Express",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/amex.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/amex.svg",
                        "group": PaytrailPaymentMethodGroup.CREDIT_CARD
                    }
                ]
            },
            {
                "id": PaytrailPaymentMethodGroup.CREDIT,
                "name": "Lasku- ja osamaksutavat",
                "icon": "https://resources.paytrail.com/images/payment-group-icons/credit.png",
                "svg": "https://resources.paytrail.com/images/payment-group-icons/credit.svg",
                "providers": [
                    {
                        "id": "collectorb2c",
                        "name": "Collector",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/walley.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/walley.svg",
                        "group": PaytrailPaymentMethodGroup.CREDIT
                    },
                    {
                        "id": "collectorb2b",
                        "name": "Collector B2B",
                        "icon": "https://resources.paytrail.com/images/payment-method-logos/walley-yrityslasku.png",
                        "svg": "https://resources.paytrail.com/images/payment-method-logos/walley-yrityslasku.svg",
                        "group": PaytrailPaymentMethodGroup.CREDIT
                    }
                ]
            }
        ]
    };

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

    const validPaytrailCreatePaymentDTO = {
        transactionId: 'testTransactionId',
        href: 'https://testhref.com',
        terms: 'testTerms',
        groups: [mockedPaytrailPaymentMethodGroupData],
        reference: 'testReference',
        providers: [mockedPaytrailProvider],
        customProviders: mockedReadonlyJsonObject,
    };

    const validPaytrailPaymentDTO : PaytrailPaymentDTO = {
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

    const validInvoiceDTO: InvoiceDTO = {
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
        rows: [validInvoiceRowDTO], // Assuming you have defined a valid InvoiceRowDTO as per your previous tests.
        isPaid: true,
        payment: validPaytrailPaymentProviderListDTO, // Assuming you have defined a valid PaytrailPaymentProviderListDTO.
        newTransaction: validPaytrailCreatePaymentDTO, // Assuming you have defined a valid PaytrailCreatePaymentDTO.
        transaction: validPaytrailPaymentDTO, // Assuming you have defined a valid PaytrailPaymentDTO.
    };

    it('createInvoiceDTO should create a valid InvoiceDTO', () => {
        const createdDTO = createInvoiceDTO(
            'invoiceId',
            'clientId',
            'campaignId',
            'groupId',
            'bankAccountId',
            'wcOrderId',
            '2023-07-09',
            '2023-07-01',
            '2023-07-09',
            '2023-08-09',
            '2023-08-01',
            '2023-08-05',
            'referenceNumber',
            'internalNote',
            'extraNotice',
            'webSecret',
            'checkoutStamp',
            false,
            false,
            false,
            false,
            false,
            false,
            30,
            [validInvoiceRowDTO],
            true,
            validPaytrailPaymentProviderListDTO,
            validPaytrailCreatePaymentDTO,
            validPaytrailPaymentDTO
        );
        expect(isInvoiceDTO(createdDTO)).toBe(true);
    });

    it('isInvoiceDTO should return true for valid InvoiceDTO', () => {
        expect(isInvoiceDTO(validInvoiceDTO)).toBe(true);
    });

    it('isInvoiceDTO should return false for invalid InvoiceDTO', () => {
        const invalidDTO = { ...validInvoiceDTO, invoiceId: 123 }; // invoiceId should be a string
        expect(isInvoiceDTO(invalidDTO)).toBe(false);
    });

    it('explainInvoiceDTO should explain valid InvoiceDTO', () => {
        expect(explainInvoiceDTO(validInvoiceDTO)).toContain('OK');
    });

    it('explainInvoiceDTO should explain invalid InvoiceDTO', () => {
        const invalidDTO = { ...validInvoiceDTO, clientId: 123 }; // clientId should be a string
        expect(explainInvoiceDTO(invalidDTO)).toContain('property "clientId" not string');
    });

    it('isInvoiceDTOOrUndefined should return true for valid InvoiceDTO or undefined', () => {
        expect(isInvoiceDTOOrUndefined(validInvoiceDTO)).toBe(true);
        expect(isInvoiceDTOOrUndefined(undefined)).toBe(true);
    });

    it('isInvoiceDTOOrUndefined should return false for invalid InvoiceDTO', () => {
        const invalidDTO = { ...validInvoiceDTO, wcOrderId: 123 }; // wcOrderId should be a string
        expect(isInvoiceDTOOrUndefined(invalidDTO)).toBe(false);
    });

    it('explainInvoiceDTOOrUndefined should explain valid InvoiceDTO or undefined', () => {
        expect(explainInvoiceDTOOrUndefined(validInvoiceDTO)).toContain('OK');
        expect(explainInvoiceDTOOrUndefined(undefined)).toContain('OK');
    });

    it('explainInvoiceDTOOrUndefined should explain invalid InvoiceDTO', () => {
        const invalidDTO = { ...validInvoiceDTO, dueDate: 123 }; // dueDate should be a string
        expect(explainInvoiceDTOOrUndefined(invalidDTO)).toContain('not InvoiceDTO | undefined');
    });

    it('parseInvoiceDTO should return InvoiceDTO when provided with a valid object', () => {
        expect(parseInvoiceDTO(validInvoiceDTO)).toEqual(validInvoiceDTO);
    });

    it('parseInvoiceDTO should return undefined when provided with an invalid object', () => {
        const invalidDTO = { ...validInvoiceDTO, remindDate: 123 }; // remindDate should be a string
        expect(parseInvoiceDTO(invalidDTO)).toBeUndefined();
    });

});
