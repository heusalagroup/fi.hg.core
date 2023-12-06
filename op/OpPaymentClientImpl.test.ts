// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { OpPaymentCreditor } from "./types/OpPaymentCreditor";
import { CountryCode } from "../types/CountryCode";
import { Currency } from "../types/Currency";
import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { LogLevel } from "../types/LogLevel";
import { OpPaymentResponseDTO } from "./dto/OpPaymentResponseDTO";
import { OpPaymentType } from "./types/OpPaymentType";
import { OpPaymentStatus } from "./types/OpPaymentStatus";
import { OpPaymentClient } from "./OpPaymentClient";
import { RequestClient } from "../RequestClient";
import { MockRequestClient } from "../requestClient/mock/MockRequestClient";
import { OpAuthClient } from "./OpAuthClient";
import { MockOpAuthClient } from "./mocks/MockOpAuthClient";
import { RequestSigner } from "../types/RequestSigner";
import { OpPaymentClientImpl } from "./OpPaymentClientImpl";

jest.mock('../RequestClient');

const MOCK_OPPAYMENTREQUEST_DTO: OpPaymentRequestDTO = {
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

const MOCK_OP_PAYMENT_RESPONSE_DTO = {
    "amount": "3.45",
    "status": OpPaymentStatus.PROCESSED,
    "currency": "EUR",
    "archiveId": "20190524593156999999",
    "debtorIban": "FI4550009420888888",
    "ultimateDebtorName": "Ultimate Debtor",
    "bookingDate": "2019-05-12",
    "paymentType": OpPaymentType.SCT_INST,
    "creditorIban": "FI4550009420999999",
    "creditorName": "Cedric Creditor",
    "ultimateCreditorName": "Ultimate Creditor",
    "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
    "transactionDate": "2019-05-11",
    "endToEndId": "544652-end2end"
};

const MOCK_INSTRUCTION_ID = '123456';
const MOCK_SIGNATURE = 'my-signature';
const MOCK_ACCESS_TOKEN = 'testToken';

const MOCK_PAYMENT_LIST_ITEM_RESPONSE: OpPaymentResponseDTO = {
    "amount": "3.45",
    "status": OpPaymentStatus.PROCESSED,
    "currency": Currency.EUR,
    "archiveId": "20190524593156999999",
    "debtorIban": "FI4550009420888888",
    "ultimateDebtorName": "Ultimate Debtor",
    "bookingDate": "2019-05-12",
    "paymentType": OpPaymentType.SCT_INST,
    "creditorIban": "FI4550009420999999",
    "creditorName": "Cedric Creditor",
    "ultimateCreditorName": "Ultimate Creditor",
    "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
    "transactionDate": "2019-05-11",
    "endToEndId": "544652-end2end"
};

const MOCK_PAYMENT_LIST_RESPONSE: readonly OpPaymentResponseDTO[] = [MOCK_PAYMENT_LIST_ITEM_RESPONSE];

describe("OpPaymentClientImpl", () => {

    let requestClient : RequestClient;
    let authClient : OpAuthClient;
    let requestSigner : RequestSigner;
    let client: OpPaymentClient;

    beforeAll(() => {
        OpPaymentClientImpl.setLogLevel(LogLevel.NONE);

        requestClient = new MockRequestClient();
        authClient = new MockOpAuthClient();
        requestSigner = jest.fn<any>();

        jest.spyOn(requestClient, 'postText');
        jest.spyOn(requestClient, 'getJson');
        jest.spyOn(authClient, 'isAuthenticated');
        jest.spyOn(authClient, 'authenticate');
        jest.spyOn(authClient, 'getAccessKey');

    });

    beforeEach(() => {
        client = OpPaymentClientImpl.create(
            requestClient,
            authClient,
            requestSigner,
            "https://example.com"
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('#createPayment', () => {

        it("should initiate payment correctly with unauthenticated auth client", async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(false);
            (authClient.getAccessKey as any).mockImplementation(() => {
                throw new Error('Not authenticated');
            });
            (authClient.authenticate as any).mockReturnValue(Promise.resolve());
            (requestClient.postText as any).mockReturnValue(Promise.resolve(JSON.stringify(MOCK_OP_PAYMENT_RESPONSE_DTO)));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            await expect(client.createPayment(MOCK_OPPAYMENTREQUEST_DTO)).rejects.toThrow('Not authenticated');

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();
            expect(requestSigner).not.toHaveBeenCalled();
            expect(requestClient.postText).not.toHaveBeenCalled();

        });

        it("should initiate payment correctly with authenticated auth client", async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(true);
            (authClient.getAccessKey as any).mockReturnValue(MOCK_ACCESS_TOKEN);
            (requestClient.postText as any).mockReturnValue(Promise.resolve(JSON.stringify(MOCK_OP_PAYMENT_RESPONSE_DTO)));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            const result = await client.createPayment(MOCK_OPPAYMENTREQUEST_DTO);

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();

            expect(requestSigner).toHaveBeenCalledTimes(1);
            expect(requestSigner).toHaveBeenCalledWith(JSON.stringify(MOCK_OPPAYMENTREQUEST_DTO));

            expect(requestClient.postText).toHaveBeenCalledTimes(1);
            expect(requestClient.postText).toHaveBeenCalledWith(
                "https://example.com/corporate-payment/v1/sepa-payment",
                JSON.stringify(MOCK_OPPAYMENTREQUEST_DTO),
                expect.objectContaining({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${MOCK_ACCESS_TOKEN}`,
                    "X-Req-Signature": MOCK_SIGNATURE,
                })
            );

            // Expect result to match mock OpPaymentResponseDTO
            expect(result).toStrictEqual(MOCK_OP_PAYMENT_RESPONSE_DTO);

        });

    });

    describe('#createInstantPayment', () => {

        it("should initiate payment correctly with unauthenticated auth client", async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(false);
            (authClient.getAccessKey as any).mockImplementation(() => {
                throw new Error('Not authenticated');
            });
            (authClient.authenticate as any).mockReturnValue(Promise.resolve());
            (requestClient.postText as any).mockReturnValue(Promise.resolve(JSON.stringify(MOCK_OP_PAYMENT_RESPONSE_DTO)));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            await expect(client.createInstantPayment(MOCK_OPPAYMENTREQUEST_DTO)).rejects.toThrow('Not authenticated');

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();
            expect(requestSigner).not.toHaveBeenCalled();
            expect(requestClient.postText).not.toHaveBeenCalled();

        });

        it("should initiate payment correctly with authenticated auth client", async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(true);
            (authClient.getAccessKey as any).mockReturnValue(MOCK_ACCESS_TOKEN);
            (requestClient.postText as any).mockReturnValue(Promise.resolve(JSON.stringify(MOCK_OP_PAYMENT_RESPONSE_DTO)));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            const result = await client.createInstantPayment(MOCK_OPPAYMENTREQUEST_DTO);

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();

            expect(requestSigner).toHaveBeenCalledTimes(1);
            expect(requestSigner).toHaveBeenCalledWith(JSON.stringify(MOCK_OPPAYMENTREQUEST_DTO));

            expect(requestClient.postText).toHaveBeenCalledTimes(1);
            expect(requestClient.postText).toHaveBeenCalledWith(
                "https://example.com/corporate-payment/v1/sepa-instant-payment",
                JSON.stringify(MOCK_OPPAYMENTREQUEST_DTO),
                expect.objectContaining({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${MOCK_ACCESS_TOKEN}`,
                    "X-Req-Signature": MOCK_SIGNATURE,
                })
            );

            // Expect result to match mock OpPaymentResponseDTO
            expect(result).toStrictEqual(MOCK_OP_PAYMENT_RESPONSE_DTO);

        });

    });

    describe('getInstantPaymentStatus', () => {

        it('should get valid status of an initiated instant payment when auth client is authenticated', async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(true);
            (authClient.getAccessKey as any).mockReturnValue(MOCK_ACCESS_TOKEN);
            (requestClient.getJson as any).mockReturnValue(Promise.resolve(MOCK_PAYMENT_LIST_RESPONSE));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            const result = await client.getInstantPaymentStatus(MOCK_INSTRUCTION_ID);

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();
            expect(requestSigner).not.toHaveBeenCalled();

            expect(requestClient.getJson).toHaveBeenCalledTimes(1);
            expect(requestClient.getJson).toHaveBeenCalledWith(
                `https://example.com/corporate-payment/v1/sepa-instant-payment/${MOCK_INSTRUCTION_ID}`,
                expect.objectContaining({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${MOCK_ACCESS_TOKEN}`,
                    "X-Request-ID": expect.any(String)
                })
            );

            // Expect result to match mock OpPaymentResponseDTO
            expect(result).toStrictEqual(MOCK_PAYMENT_LIST_RESPONSE);

        });

        it('should throw an error when auth client is not authenticated', async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(false);
            (authClient.getAccessKey as any).mockImplementation(() => {
                throw new Error('Not authenticated');
            });
            (authClient.authenticate as any).mockReturnValue(Promise.resolve());
            (requestClient.getJson as any).mockReturnValue(Promise.resolve(MOCK_PAYMENT_LIST_RESPONSE));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            await expect(client.getInstantPaymentStatus(MOCK_INSTRUCTION_ID)).rejects.toThrow('Not authenticated');

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();
            expect(requestSigner).not.toHaveBeenCalled();
            expect(requestClient.getJson).not.toHaveBeenCalled();

        });

    });

});
