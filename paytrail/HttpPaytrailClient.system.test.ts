// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import "../../jest/matchers";
import { HttpPaytrailClient } from "./HttpPaytrailClient";
import { PaytrailClient } from "./PaytrailClient";
import { createPaytrailCustomer } from "./types/PaytrailCustomer";
import { createPaytrailItem } from "./types/PaytrailItem";
import { createPaytrailCallbackUrl } from "./types/PaytrailCallbackUrl";
import { PaytrailCurrency } from "./types/PaytrailCurrency";
import { PaytrailLanguage } from "./types/PaytrailLanguage";
import { createPaytrailAddress } from "./types/PaytrailAddress";
import { LogLevel } from "../types/LogLevel";

// Note: This is a system test intended to run on NodeJS but these imports will
//       warn about error on frontend projects which do not have the node module
// @ts-ignore
import { HgNode } from "../../node/HgNode";
// @ts-ignore
import { NodeRequestClient } from "../../node/requestClient/node/NodeRequestClient";

import { RequestClientImpl } from "../RequestClientImpl";
import { keys } from "../functions/keys";
import { isNonEmptyString } from "../types/String";
import { every } from "../functions/every";

const TEST_API_URL = 'https://services.paytrail.com';
const TEST_MERCHANT_ID = '375917';
const TEST_MERCHANT_SECRET_KEY = 'SAIPPUAKAUPPIAS';

// Test constants
const TEST_STAMP = '29858472953';
const TEST_REFERENCE = '9187445';
const TEST_AMOUNT = 1590;
const TEST_CURRENCY = PaytrailCurrency.EUR;
const TEST_LANGUAGE = PaytrailLanguage.FI;
const TEST_UNIT_PRICE = 1590;
const TEST_UNITS = 1;
const TEST_VAT_PERCENTAGE = 24;
const TEST_PRODUCT_CODE = "#927502759";
const TEST_DELIVERY_DATE = "2018-03-07";
const TEST_DESCRIPTION = "Cat ladder";
const TEST_CATEGORY = "Pet supplies";

const TEST_CUSTOMER_EMAIL = "erja.esimerkki@example.org";
const TEST_CUSTOMER_FIRST_NAME = "Erja";
const TEST_CUSTOMER_LAST_NAME = "Esimerkki";
const TEST_CUSTOMER_PHONE = "+358501234567";
const TEST_CUSTOMER_VAT_ID = "FI12345671";

const TEST_DELIVERY_ADDRESS_STREET = "Hämeenkatu 6 B";
const TEST_DELIVERY_ADDRESS_POSTAL_CODE = "33100";
const TEST_DELIVERY_ADDRESS_CITY = "Tampere";
const TEST_DELIVERY_ADDRESS_COUNTY = "Pirkanmaa";
const TEST_DELIVERY_ADDRESS_COUNTRY = "FI";
const TEST_INVOICING_ADDRESS_STREET = "Testikatu 1";
const TEST_INVOICING_ADDRESS_POSTAL_CODE = "00510";
const TEST_INVOICING_ADDRESS_CITY = "Helsinki";
const TEST_INVOICING_ADDRESS_COUNTY = "Uusimaa";
const TEST_INVOICING_ADDRESS_COUNTRY = "FI";
const TEST_CALLBACK_URL_SUCCESS = "https://ecom.example.org/success";
const TEST_CALLBACK_URL_CANCEL = "https://ecom.example.org/cancel";

describe('system', () => {

    describe('HttpPaytrailClient', () => {

        let client : PaytrailClient;

        beforeAll( () => {
            HgNode.initialize();
            HttpPaytrailClient.setLogLevel(LogLevel.NONE);
            RequestClientImpl.setLogLevel(LogLevel.NONE);
            NodeRequestClient.setLogLevel(LogLevel.NONE);
        });

        beforeEach(() => {
            client = HttpPaytrailClient.create(TEST_MERCHANT_ID, TEST_MERCHANT_SECRET_KEY, TEST_API_URL);
        });

        describe('#createPayment', () => {

            it('should return a successful response with valid input', async () => {

                const UNIQUE_TEST_STAMP : string = `${TEST_STAMP}-${Date.now()}`;
                const UNIQUE_TEST_REFERENCE : string = `${TEST_REFERENCE}-${Date.now()}`;

                const payment = await client.createPayment(
                    UNIQUE_TEST_STAMP,
                    UNIQUE_TEST_REFERENCE,
                    TEST_AMOUNT,
                    createPaytrailCustomer(
                        TEST_CUSTOMER_EMAIL,
                        TEST_CUSTOMER_FIRST_NAME,
                        TEST_CUSTOMER_LAST_NAME,
                        TEST_CUSTOMER_PHONE,
                        TEST_CUSTOMER_VAT_ID,
                    ),
                    [
                        createPaytrailItem(
                            TEST_UNIT_PRICE,
                            TEST_UNITS,
                            TEST_VAT_PERCENTAGE,
                            TEST_PRODUCT_CODE,
                            TEST_DESCRIPTION,
                            TEST_CATEGORY,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            TEST_DELIVERY_DATE,
                        )
                    ],
                    createPaytrailCallbackUrl(
                        TEST_CALLBACK_URL_SUCCESS,
                        TEST_CALLBACK_URL_CANCEL
                    ),
                    createPaytrailCallbackUrl(
                        TEST_CALLBACK_URL_SUCCESS,
                        TEST_CALLBACK_URL_CANCEL
                    ),
                    TEST_CURRENCY,
                    TEST_LANGUAGE,
                    createPaytrailAddress(
                        TEST_DELIVERY_ADDRESS_STREET,
                        TEST_DELIVERY_ADDRESS_POSTAL_CODE,
                        TEST_DELIVERY_ADDRESS_CITY,
                        TEST_DELIVERY_ADDRESS_COUNTRY,
                        TEST_DELIVERY_ADDRESS_COUNTY,
                    ),
                    createPaytrailAddress(
                        TEST_INVOICING_ADDRESS_STREET,
                        TEST_INVOICING_ADDRESS_POSTAL_CODE,
                        TEST_INVOICING_ADDRESS_CITY,
                        TEST_INVOICING_ADDRESS_COUNTRY,
                        TEST_INVOICING_ADDRESS_COUNTY,
                    ),
                );

                expect(payment).toBeDefined();
                expect(payment?.transactionId).toBeDefined(); // like `3426108e-1caa-11ee-ad14-871a14c22a32`
                expect(payment?.href).toBe(`https://pay.paytrail.com/pay/${payment?.transactionId}`);
                expect(payment?.terms).toBe('Valitsemalla maksutavan hyväksyt <a href="https://www.paytrail.com/kuluttaja/maksupalveluehdot" target="_blank">maksupalveluehdot</a>');
                expect(payment?.reference).toBeDefined(); // Like `6248669867`

                expect(payment?.groups).toBeArray();
                expect(payment?.groups?.length).toBe(4);
                expect(payment?.groups[0]).toStrictEqual({
                    "icon": "https://resources.paytrail.com/images/payment-group-icons/credit.png",
                    "id": "credit",
                    "name": "Lasku- ja osamaksutavat",
                    "svg": "https://resources.paytrail.com/images/payment-group-icons/credit.svg",
                });
                expect(payment?.groups[1]).toStrictEqual({
                    "icon": "https://resources.paytrail.com/images/payment-group-icons/mobile.png",
                    "id": "mobile",
                    "name": "Mobiilimaksutavat",
                    "svg": "https://resources.paytrail.com/images/payment-group-icons/mobile.svg",
                });
                expect(payment?.groups[2]).toStrictEqual({
                    "icon": "https://resources.paytrail.com/images/payment-group-icons/creditcard.png",
                    "id": "creditcard",
                    "name": "Korttimaksutavat",
                    "svg": "https://resources.paytrail.com/images/payment-group-icons/creditcard.svg",
                });
                expect(payment?.groups[3]).toStrictEqual({
                    "icon": "https://resources.paytrail.com/images/payment-group-icons/bank.png",
                    "id": "bank",
                    "name": "Pankkimaksutavat",
                    "svg": "https://resources.paytrail.com/images/payment-group-icons/bank.svg",
                });

                // payment.customProviders

                expect(payment?.customProviders).toBeRegularObject();
                expect(keys(payment?.customProviders)).toStrictEqual(['applepay']);

                expect((payment?.customProviders?.applepay as any)?.parameters).toBeArray();

                // payment.customProviders.applepay.parameters
                expect(
                    every(
                        (payment?.customProviders?.applepay as any)?.parameters,
                        (item: any) : boolean => isNonEmptyString(item?.name) && isNonEmptyString(item?.value)
                    )
                ).toBe(true);

                // payment.customProviders.applepay.parameters looks like:
                // ```
                // [
                // {
                //     "name": "checkout-transaction-id",
                //     "value": "88f33fd2-1cab-11ee-bc95-ff97cca17a7f"
                // },
                // {
                //     "name": "checkout-account",
                //     "value": "375917"
                // },
                // {
                //     "name": "checkout-method",
                //     "value": "POST"
                // },
                // {
                //     "name": "checkout-algorithm",
                //     "value": "sha256"
                // },
                // {
                //     "name": "checkout-timestamp",
                //     "value": "2023-07-07T09:49:15.777Z"
                // },
                // {
                //     "name": "checkout-nonce",
                //     "value": "115509cb-ae9f-4dc1-9fa8-18335eb52740"
                // },
                // {
                //     "name": "signature",
                //     "value": "29e69941dddfe83c7072ffbe0dca4a7de144bd0a6381fdf9787c12715582489a"
                // },
                // {
                //     "name": "amount",
                //     "value": "15.90"
                // },
                // {
                //     "name": "label",
                //     "value": "Paytrail Oyj"
                // },
                // {
                //     "name": "currency",
                //     "value": "EUR"
                // }
                // ]
                // ```

                // payment.providers

                // Looks like:
                // ```
                //    {
                //      "group": "credit",
                //      "icon": "https://resources.paytrail.com/images/payment-method-logos/walley.png",
                //      "id": "collectorb2c",
                //      "name": "Collector",
                //      "parameters": Array [
                //        {
                //          "name": "checkout-transaction-id",
                //          "value": "c0004672-1cac-11ee-b6f6-772ce8d3e82a",
                //        },
                //        {
                //          "name": "checkout-account",
                //          "value": "375917",
                //        },
                //        {
                //          "name": "checkout-method",
                //          "value": "POST",
                //        },
                //        {
                //          "name": "checkout-algorithm",
                //          "value": "sha256",
                //        },
                //        {
                //          "name": "checkout-timestamp",
                //          "value": "2023-07-07T09:57:57.631Z",
                //        },
                //        {
                //          "name": "checkout-nonce",
                //          "value": "95a11fd3-501f-4fd2-bcf6-b754a4e420a0",
                //        },
                //        {
                //          "name": "signature",
                //          "value": "727185586dbfe4496d1b1ddc89f4d36e733bcae8a84bc8aa07eaf72772a352b6",
                //        },
                //      ],
                //      "svg": "https://resources.paytrail.com/images/payment-method-logos/walley.svg",
                //      "url": "https://pay.paytrail.com/payments/c0004672-1cac-11ee-b6f6-772ce8d3e82a/collectorb2c/",
                //    }
                // ```

                expect(payment?.providers).toBeArray();
                expect(payment?.providers?.length).toBe(17);

                expect(payment?.providers[0]).toBeRegularObject();
                expect(payment?.providers[0]?.group).toBe('credit');
                expect(payment?.providers[0]?.icon).toBe('https://resources.paytrail.com/images/payment-method-logos/walley.png');
                expect(payment?.providers[0]?.id).toBe('collectorb2c');
                expect(payment?.providers[0]?.name).toBe('Collector');
                expect(payment?.providers[0]?.svg).toBe('https://resources.paytrail.com/images/payment-method-logos/walley.svg');
                expect(payment?.providers[0]?.url).toBe(`https://pay.paytrail.com/payments/${payment?.transactionId}/collectorb2c/`);

                expect(payment?.providers[0]?.parameters).toBeArray();
                expect(
                    every(
                        payment?.providers[0]?.parameters,
                        (item: any) : boolean => isNonEmptyString(item?.name) && isNonEmptyString(item?.value)
                    )
                ).toBe(true);

            });

        });

        describe('#getPayment', () => {

            it('should return a successful response with valid input', async () => {

                const UNIQUE_TEST_STAMP : string = `${TEST_STAMP}-${Date.now()}`;
                const UNIQUE_TEST_REFERENCE : string = `${TEST_REFERENCE}-${Date.now()}`;

                const payment = await client.createPayment(
                    UNIQUE_TEST_STAMP,
                    UNIQUE_TEST_REFERENCE,
                    TEST_AMOUNT,
                    createPaytrailCustomer(
                        TEST_CUSTOMER_EMAIL,
                        TEST_CUSTOMER_FIRST_NAME,
                        TEST_CUSTOMER_LAST_NAME,
                        TEST_CUSTOMER_PHONE,
                        TEST_CUSTOMER_VAT_ID,
                    ),
                    [
                        createPaytrailItem(
                            TEST_UNIT_PRICE,
                            TEST_UNITS,
                            TEST_VAT_PERCENTAGE,
                            TEST_PRODUCT_CODE,
                            TEST_DESCRIPTION,
                            TEST_CATEGORY,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            TEST_DELIVERY_DATE,
                        )
                    ],
                    createPaytrailCallbackUrl(
                        TEST_CALLBACK_URL_SUCCESS,
                        TEST_CALLBACK_URL_CANCEL
                    ),
                    createPaytrailCallbackUrl(
                        TEST_CALLBACK_URL_SUCCESS,
                        TEST_CALLBACK_URL_CANCEL
                    ),
                    TEST_CURRENCY,
                    TEST_LANGUAGE,
                    createPaytrailAddress(
                        TEST_DELIVERY_ADDRESS_STREET,
                        TEST_DELIVERY_ADDRESS_POSTAL_CODE,
                        TEST_DELIVERY_ADDRESS_CITY,
                        TEST_DELIVERY_ADDRESS_COUNTRY,
                        TEST_DELIVERY_ADDRESS_COUNTY,
                    ),
                    createPaytrailAddress(
                        TEST_INVOICING_ADDRESS_STREET,
                        TEST_INVOICING_ADDRESS_POSTAL_CODE,
                        TEST_INVOICING_ADDRESS_CITY,
                        TEST_INVOICING_ADDRESS_COUNTRY,
                        TEST_INVOICING_ADDRESS_COUNTY,
                    ),
                );

                expect(payment).toBeDefined();
                expect(payment?.transactionId).toBeDefined(); // like `3426108e-1caa-11ee-ad14-871a14c22a32`

                const fetchedPayment = await client.getPayment(payment?.transactionId);

                // Like:
                // ```
                // {
                // "amount": 1590,
                // "createdAt": "2023-07-07T10:09:23.578Z",
                // "currency": "EUR",
                // "href": "https://pay.checkout.fi/pay/58e17342-1cae-11ee-bbb8-5b1aeddddd28",
                // "reference": "9187445-1688724563163",
                // "stamp": "29858472953-1688724563163",
                // "status": "new",
                // "transactionId": "58e17342-1cae-11ee-bbb8-5b1aeddddd28"
                // }
                // ```

                expect(fetchedPayment).toBeRegularObject();
                expect(fetchedPayment?.amount).toBe(1590);
                expect(fetchedPayment?.createdAt).toBeIsoDateStringWithMilliseconds();
                expect(fetchedPayment?.currency).toBe('EUR');
                expect(fetchedPayment?.href).toBe(`https://pay.checkout.fi/pay/${payment?.transactionId}`);
                expect(fetchedPayment?.reference).toBe(UNIQUE_TEST_REFERENCE);
                expect(fetchedPayment?.stamp).toBe(UNIQUE_TEST_STAMP);
                expect(fetchedPayment?.status).toBe('new');
                expect(fetchedPayment?.transactionId).toBe(payment?.transactionId);

            });

        });

        describe('#getMerchantsPaymentProviders', () => {

            it('should return a successful response with valid input', async () => {

                const dto = await client.getMerchantsPaymentProviders();

                expect(dto).toBeArray();
                expect(dto?.length).toBe(17);

                expect(dto[0]).toStrictEqual({
                    "group": "mobile",
                    "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
                    "id": "pivo",
                    "name": "Pivo",
                    "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg",
                });

                // Like:
                // ```
                // [
                //       {
                //         "id": "pivo",
                //         "name": "Pivo",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg",
                //         "group": "mobile"
                //       },
                //       {
                //         "id": "osuuspankki",
                //         "name": "OP",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/osuuspankki.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/osuuspankki.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "nordea",
                //         "name": "Nordea",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/nordea.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/nordea.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "handelsbanken",
                //         "name": "Handelsbanken",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/handelsbanken.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/handelsbanken.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "pop",
                //         "name": "POP Pankki",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/pop.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/pop.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "aktia",
                //         "name": "Aktia",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/aktia.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/aktia.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "saastopankki",
                //         "name": "Säästöpankki",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/saastopankki.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/saastopankki.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "omasp",
                //         "name": "Oma Säästöpankki",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/omasp.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/omasp.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "spankki",
                //         "name": "S-pankki",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/spankki.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/spankki.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "alandsbanken",
                //         "name": "Ålandsbanken",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/alandsbanken.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/alandsbanken.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "danske",
                //         "name": "Danske Bank",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/danske.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/danske.svg",
                //         "group": "bank"
                //       },
                //       {
                //         "id": "creditcard",
                //         "name": "Visa",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/visa.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/visa.svg",
                //         "group": "creditcard"
                //       },
                //       {
                //         "id": "creditcard",
                //         "name": "Visa Electron",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/visa-electron.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/visa-electron.svg",
                //         "group": "creditcard"
                //       },
                //       {
                //         "id": "creditcard",
                //         "name": "Mastercard",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/mastercard.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/mastercard.svg",
                //         "group": "creditcard"
                //       },
                //       {
                //         "id": "amex",
                //         "name": "American Express",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/amex.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/amex.svg",
                //         "group": "creditcard"
                //       },
                //       {
                //         "id": "collectorb2c",
                //         "name": "Collector",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/walley.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/walley.svg",
                //         "group": "credit"
                //       },
                //       {
                //         "id": "collectorb2b",
                //         "name": "Collector B2B",
                //         "icon": "https://resources.paytrail.com/images/payment-method-logos/walley-yrityslasku.png",
                //         "svg": "https://resources.paytrail.com/images/payment-method-logos/walley-yrityslasku.svg",
                //         "group": "credit"
                //       }
                //     ]
                // ```

                // expect(dto).toBeRegularObject();

            });

        });

        describe('#getMerchantsGroupedPaymentProviders', () => {

            it('should return a successful response with valid input', async () => {

                const dto = await client.getMerchantsGroupedPaymentProviders();

                expect(dto).toBeRegularObject();
                expect(dto?.terms).toBe('Valitsemalla maksutavan hyväksyt <a href="https://www.paytrail.com/kuluttaja/maksupalveluehdot" target="_blank">maksupalveluehdot</a>');

                expect(dto?.providers).toBeArray();
                expect(dto?.providers[0]).toStrictEqual({
                    "group": "mobile",
                    "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
                    "id": "pivo",
                    "name": "Pivo",
                    "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg",
                });

                expect(dto?.groups).toBeArray();
                expect( dto?.groups[0] ).toStrictEqual(
                    {
                        "icon": "https://resources.paytrail.com/images/payment-group-icons/mobile.png",
                        "id": "mobile",
                        "name": "Mobiilimaksutavat",
                        "providers": [
                            {
                                "group": "mobile",
                                "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
                                "id": "pivo",
                                "name": "Pivo",
                                "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg"
                            }
                        ],
                        "svg": "https://resources.paytrail.com/images/payment-group-icons/mobile.svg"
                    }
                );

                // expect(dto?.length).toBe(17);
                // expect(dto[0]).toStrictEqual({
                //     "group": "mobile",
                //     "icon": "https://resources.paytrail.com/images/payment-method-logos/pivo.png",
                //     "id": "pivo",
                //     "name": "Pivo",
                //     "svg": "https://resources.paytrail.com/images/payment-method-logos/pivo.svg",
                // });

                // Like:
                // ```
                // ```

            });

        });

    });
});
