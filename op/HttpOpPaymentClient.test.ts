// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { OpPaymentCreditor } from "./types/OpPaymentCreditor";
import { CountryCode } from "../types/CountryCode";
import { Currency } from "../types/Currency";
import { RequestClient } from "../RequestClient";
import { OpPaymentRequestDTO } from "./types/OpPaymentRequestDTO";
import { HttpOpCorporatePaymentClient } from "./HttpOpPaymentClient";

jest.mock('../RequestClient');

describe("HttpOpCorporatePaymentClient", () => {

    const mockRequestClient = RequestClient as jest.Mocked<typeof RequestClient>;
    const mockOpPaymentRequestDTO: OpPaymentRequestDTO = {
        instructionId: '123456',
        creditor: {
            name: 'Test Name',
            iban: 'FI3859991620004143',
            address: {
                country: 'FI' as CountryCode,
                addressLine: ['a1', 'a2']
            }
        } as OpPaymentCreditor,
        debtor: {
            name: 'Test Name',
            iban: 'FI3859991620004143',
            address: {
                country: 'FI' as CountryCode,
                addressLine: ['a1', 'a2']
            }
        },
        instructedAmount: {
            amount: '100.00',
            currency: 'USD' as Currency,
        }
    };

    let client: HttpOpCorporatePaymentClient;

    beforeEach(() => {
        // Set up HttpOpCorporatePaymentClient instance
        client = new HttpOpCorporatePaymentClient(
            "clientId",
            "clientSecret",
            "signingKey",
            "signingKid",
            "mtlsKey",
            "mtlsCertificate",
            "https://example.com"
        );
    });

    afterEach(() => {
        // Clear all mock function calls
        jest.clearAllMocks();
    });

    it("should initiate payment correctly", async () => {

        // Set up mock RequestClient responses
        mockRequestClient.postText
                         .mockResolvedValueOnce(JSON.stringify({ access_token: "testToken" }))  // _getAccessToken
                         .mockResolvedValueOnce(JSON.stringify({
                             "amount": "3.45",
                             "status": "PROCESSED",
                             "currency": "EUR",
                             "archiveId": "20190524593156999999",
                             "debtorIban": "FI4550009420888888",
                             "ultimateDebtorName": "Ultimate Debtor",
                             "bookingDate": "2019-05-12",
                             "paymentType": "SCT_INST",
                             "creditorIban": "FI4550009420999999",
                             "creditorName": "Cedric Creditor",
                             "ultimateCreditorName": "Ultimate Creditor",
                             "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                             "transactionDate": "2019-05-11",
                             "endToEndId": "544652-end2end"
                         }));

        const result = await client.initiatePayment(mockOpPaymentRequestDTO);

        // Expect that RequestClient.postText has been called correctly
        expect(mockRequestClient.postText).toHaveBeenCalledTimes(2);
        expect(mockRequestClient.postText).toHaveBeenNthCalledWith(
            1,
            "https://example.com/corporate-oidc/v1/token",
            "grant_type=client_credentials&client_id=clientId&client_secret=clientSecret",
            { "Content-Type": "application/x-www-form-urlencoded" }
        );
        expect(mockRequestClient.postText).toHaveBeenNthCalledWith(
            2,
            "https://example.com/corporate-payment/v1/sepa-payment",
            JSON.stringify(mockOpPaymentRequestDTO),
            expect.objectContaining({
                "Content-Type": "application/json",
                "Authorization": "Bearer testToken",
                "X-Req-Signature": expect.any(String),
            })
        );

        // Expect result to match mock OpPaymentResponseDTO
        expect(result).toStrictEqual({
            "amount": "3.45",
            "status": "PROCESSED",
            "currency": "EUR",
            "archiveId": "20190524593156999999",
            "debtorIban": "FI4550009420888888",
            "ultimateDebtorName": "Ultimate Debtor",
            "bookingDate": "2019-05-12",
            "paymentType": "SCT_INST",
            "creditorIban": "FI4550009420999999",
            "creditorName": "Cedric Creditor",
            "ultimateCreditorName": "Ultimate Creditor",
            "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
            "transactionDate": "2019-05-11",
            "endToEndId": "544652-end2end"        });
    });

});
