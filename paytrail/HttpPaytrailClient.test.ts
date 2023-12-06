
import { jest } from "@jest/globals";
import { HttpPaytrailClient } from "./HttpPaytrailClient";
import { PaytrailClient } from "./PaytrailClient";
import { createPaytrailCustomer } from "./types/PaytrailCustomer";
import { createPaytrailItem } from "./types/PaytrailItem";
import { createPaytrailCallbackUrl } from "./types/PaytrailCallbackUrl";
import { RequestClientImpl } from "../RequestClientImpl";
import { PaytrailCurrency } from "./types/PaytrailCurrency";
import { PaytrailLanguage } from "./types/PaytrailLanguage";
import { HgTest } from "../HgTest";
import { PaytrailCreatePaymentDTO } from "./dtos/PaytrailCreatePaymentDTO";
import { createPaytrailPaymentMethodGroupData } from "./types/PaytrailPaymentMethodGroupData";
import { PaytrailPaymentMethodGroup } from "./types/PaytrailPaymentMethodGroup";
import { createPaytrailProvider } from "./types/PaytrailProvider";
import { createPaytrailFormField } from "./types/PaytrailFormField";
import { parseJson } from "../Json";
import { createPaytrailAddress } from "./types/PaytrailAddress";
import { LogLevel } from "../types/LogLevel";

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
const TEST_REDIRECT_URL_SUCCESS = "https://ecom.example.org/success";
const TEST_REDIRECT_URL_CANCEL = "https://ecom.example.org/cancel";
const TEST_CALLBACK_URL_SUCCESS = "https://ecom.example.org/success";
const TEST_CALLBACK_URL_CANCEL = "https://ecom.example.org/cancel";

const TEST_TIME = '2023-07-07T09:09:47.213Z';

// Request for the createPayment function
const TEST_CREATE_REQUEST = {
    "stamp": TEST_STAMP,
    "reference": TEST_REFERENCE,
    "amount": TEST_AMOUNT,
    "currency": TEST_CURRENCY,
    "language": TEST_LANGUAGE,
    "items": [
        {
            "unitPrice": TEST_UNIT_PRICE,
            "units": TEST_UNITS,
            "vatPercentage": TEST_VAT_PERCENTAGE,
            "productCode": TEST_PRODUCT_CODE,
            "deliveryDate": TEST_DELIVERY_DATE,
            "description": TEST_DESCRIPTION,
            "category": TEST_CATEGORY
        }
    ],
    "customer": {
        "email": TEST_CUSTOMER_EMAIL,
        "firstName": TEST_CUSTOMER_FIRST_NAME,
        "lastName": TEST_CUSTOMER_LAST_NAME,
        "phone": TEST_CUSTOMER_PHONE,
        "vatId": TEST_CUSTOMER_VAT_ID
    },
    "deliveryAddress": {
        "streetAddress": TEST_DELIVERY_ADDRESS_STREET,
        "postalCode": TEST_DELIVERY_ADDRESS_POSTAL_CODE,
        "city": TEST_DELIVERY_ADDRESS_CITY,
        "county": TEST_DELIVERY_ADDRESS_COUNTY,
        "country": TEST_DELIVERY_ADDRESS_COUNTRY
    },
    "invoicingAddress": {
        "streetAddress": TEST_INVOICING_ADDRESS_STREET,
        "postalCode": TEST_INVOICING_ADDRESS_POSTAL_CODE,
        "city": TEST_INVOICING_ADDRESS_CITY,
        "county": TEST_INVOICING_ADDRESS_COUNTY,
        "country": TEST_INVOICING_ADDRESS_COUNTRY
    },
    "redirectUrls": {
        "success": TEST_REDIRECT_URL_SUCCESS,
        "cancel": TEST_REDIRECT_URL_CANCEL
    },
    "callbackUrls": {
        "success": TEST_CALLBACK_URL_SUCCESS,
        "cancel": TEST_CALLBACK_URL_CANCEL
    }
};

const TEST_CREATE_PARAMS = {
    "checkout-account": "mockAccount",
    "checkout-algorithm": "sha256",
    "checkout-method": "POST",
    "checkout-nonce": "b800e31d15e9262ce69c23a21478ad38494775cf36a895e4fad8075c2e535995",
    "checkout-timestamp": "2023-07-07T09:09:47.213Z",
    "content-type": "application/json; charset=utf-8",
    "signature": "c0403add6d437861923a68ab06d400dc72a03e5ec77aa1936054b13af3d0b2a8",
};

// Response from the createPayment function
const TEST_CREATE_RESPONSE : PaytrailCreatePaymentDTO = {
    "transactionId": "5770642a-9a02-4ca2-8eaa-cc6260a78eb6",
    "href": "https://services.paytrail.com/pay/5770642a-9a02-4ca2-8eaa-cc6260a78eb6",
    "reference": TEST_REFERENCE,
    "terms": "By continuing with your payment, you agree to our <a href=\"https://www.checkout.fi/ehdot-ja-sopimukset/maksuehdot\" target=\"_blank\">payment terms & conditions</a>",
    groups: [
        createPaytrailPaymentMethodGroupData(
            PaytrailPaymentMethodGroup.MOBILE,
            "Mobile payment methods",
            "https://static.paytrail.com/static/img/payment-groups/mobile.png",
            "https://static.paytrail.com/static/img/payment-groups/mobile.svg"
        )
    ],
    "providers": [
        createPaytrailProvider(
            "https://static.paytrail.com/static/img/pivo_140x75.png",
            "https://static.paytrail.com/static/img/payment-methods/pivo-siirto.svg",
            PaytrailPaymentMethodGroup.MOBILE,
            "Pivo",
            "pivo",
            "https://maksu.pivo.fi/api/payments",
            [
                createPaytrailFormField("amount", "base64 MTUyNQ==")
            ]
        )
    ],
    "customProviders": {
        "applepay": {
            "parameters": [
                {
                    "name": "amount",
                    "value": "15.25"
                }
            ]
        }
    }
};

const TEST_FETCH_RESPONSE = {
    "transactionId": "681538c4-fc84-11e9-83bc-2ffcef4c3453",
    "status": "new",
    "amount": 1689,
    "currency": "EUR",
    "reference": "4940046476",
    "stamp": "15725981193483",
    "createdAt": "2019-11-01T10:48:39.979Z",
    "href": "https://pay.paytrail.com/pay/681538c4-fc84-11e9-83bc-2ffcef4c3453"
};

describe('HttpPaytrailClient', () => {

    let client : PaytrailClient;
    let postTextSpy : jest.SpiedFunction<(...args: any) => any>;
    let getTextSpy : jest.SpiedFunction<(...args: any) => any>;

    beforeAll( () => {
        HgTest.initialize();
        HttpPaytrailClient.setLogLevel(LogLevel.NONE);

        jest
        .useFakeTimers()
        .setSystemTime(new Date(TEST_TIME));

        postTextSpy = jest.spyOn(RequestClientImpl, 'postText').mockResolvedValue(JSON.stringify(TEST_CREATE_RESPONSE));
        getTextSpy = jest.spyOn(RequestClientImpl, 'getText').mockResolvedValue(JSON.stringify(TEST_FETCH_RESPONSE));

    });

    beforeEach(() => {
        client = HttpPaytrailClient.create('mockAccount', 'mockSecret', 'http://mockUrl');
        postTextSpy.mockClear();
        getTextSpy.mockClear();
    });

    describe('createPayment', () => {

        it('should return a successful response with valid input', async () => {

            const payment : any = await client.createPayment(
                TEST_STAMP,
                TEST_REFERENCE,
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

            expect(payment).toMatchObject(TEST_CREATE_RESPONSE as any);
            expect(RequestClientImpl.postText).toHaveBeenCalledTimes(1);
            expect((RequestClientImpl.postText as any).mock.calls[0][0]).toBe('http://mockUrl/payments');
            expect( parseJson( (RequestClientImpl.postText as any).mock.calls[0][1] )).toStrictEqual(TEST_CREATE_REQUEST);
            expect((RequestClientImpl.postText as any).mock.calls[0][2]).toStrictEqual(TEST_CREATE_PARAMS);

        });

        it('should throw an error with invalid input', async () => {
            await expect(client.createPayment(
                TEST_STAMP,
                TEST_REFERENCE,
                // @ts-ignore
                "invalid",
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
                        TEST_STAMP,
                        TEST_REFERENCE,
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
                TEST_LANGUAGE
            )).rejects.toThrowError('property "amount" not number');
            expect(RequestClientImpl.postText).not.toHaveBeenCalled();
        });

    });

});
