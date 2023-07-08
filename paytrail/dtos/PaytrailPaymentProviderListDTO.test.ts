// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createPaytrailPaymentProviderListDTO, explainPaytrailPaymentProviderListDTO, isPaytrailPaymentProviderListDTO, parsePaytrailPaymentProviderListDTO, PaytrailPaymentProviderListDTO } from "./PaytrailPaymentProviderListDTO";
import { PaytrailPaymentMethodGroup } from "../types/PaytrailPaymentMethodGroup";

describe('PaytrailPaymentProviderListDTO', () => {

    const mockedPaymentDTO : PaytrailPaymentProviderListDTO = {
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

    describe('createPaytrailPaymentProviderListDTO', () => {
        it('creates PaytrailPaymentProviderListDTO correctly', () => {
            const result = createPaytrailPaymentProviderListDTO(
                mockedPaymentDTO.terms,
                mockedPaymentDTO.groups,
                mockedPaymentDTO.providers,
            );
            expect(result).toEqual(mockedPaymentDTO);
        });
    });

    describe('isPaytrailPaymentProviderListDTO', () => {

        it('validates if an object is PaytrailPaymentProviderListDTO', () => {
            const result = isPaytrailPaymentProviderListDTO(mockedPaymentDTO);
            expect(result).toBe(true);
        });

        it('returns false if the object is not PaytrailPaymentProviderListDTO', () => {
            const result = isPaytrailPaymentProviderListDTO({ ...mockedPaymentDTO, amount: 'invalid' }); // invalid amount property
            expect(result).toBe(false);
        });

    });

    describe('explainPaytrailPaymentProviderListDTO', () => {
        it('explains why an object cannot be parsed into PaytrailPaymentProviderListDTO', () => {
            const result = explainPaytrailPaymentProviderListDTO({ ...mockedPaymentDTO, amount: 'invalid' }); // invalid amount property
            expect(result).toContain('Value had extra properties: amount');
        });
    });

    describe('parsePaytrailPaymentProviderListDTO', () => {

        it('parses object into PaytrailPaymentProviderListDTO if it is valid', () => {
            const result = parsePaytrailPaymentProviderListDTO(mockedPaymentDTO);
            expect(result).toEqual(mockedPaymentDTO);
        });

        it('returns undefined if the object cannot be parsed into PaytrailPaymentProviderListDTO', () => {
            const result = parsePaytrailPaymentProviderListDTO({ ...mockedPaymentDTO, amount: 'invalid' }); // invalid amount property
            expect(result).toBeUndefined();
        });

    });

});
