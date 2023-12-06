// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { RequestClient } from "../RequestClient";
import { MockRequestClient } from "../requestClient/mock/MockRequestClient";
import { LogLevel } from "../types/LogLevel";
import { RequestSigner } from "../types/RequestSigner";
import { MockOpAuthClient } from "./mocks/MockOpAuthClient";
import { OpAuthClient } from "./OpAuthClient";
import { OpRefundClientImpl } from "./OpRefundClientImpl";

jest.mock<any>('../RequestClient');

const MOCK_OPREFUNDREQUEST_DTO = {
    "archiveId": "20190524593156999999999999999999999",
    "amount": "12.35",
    "message": "Less money, fewer problems",
    "accountIban": "FI4550009420888888",
    "transactionDate": "2023-01-14",
    "endToEndId": "544652-end2end"
};

const MOCK_OP_REFUND_RESPONSE_DTO = {
    "original": {
        "archiveId": "20190524593156999999999999999999999",
        "message": "Less money," +
            " fewer problems",
        "reference": "00000000000000482738",
        "amount": "12.35",
        "bookingDate": "2019-05-12",
        "debtorName": "Debbie Debtor"
    },
    "refund": {
        "amount": "3.45",
        "status": "PROCESSED",
        "message": "MAKSUN PALAUTUS. Maksun tiedot: 01.01.2020 Your own refund message",
        "currency": "EUR",
        "archiveId": "20190524593156999999",
        "debtorIban": "FI4550009420888888",
        "bookingDate": "2019-05-12",
        "paymentType": "SCT_INST",
        "creditorName": "Cedric Creditor",
        "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
        "transactionDate": "2019-05-11",
        "endToEndId": "544652-end2end"
    }
};

const MOCK_CLIENT_ID = 'testClientId';
const MOCK_CLIENT_SECRET = 'testClientSecret';
const MOCK_ACCESS_TOKEN = 'testToken';
const MOCK_SIGNATURE = 'signature';

describe("OpRefundClientImpl", () => {

    let requestClient : RequestClient;
    let authClient : OpAuthClient;
    let requestSigner : RequestSigner;
    let client: OpRefundClientImpl;

    beforeAll(() => {
        OpRefundClientImpl.setLogLevel(LogLevel.NONE);

        requestClient = new MockRequestClient();
        authClient = new MockOpAuthClient();
        requestSigner = jest.fn<any>();

        jest.spyOn(requestClient, 'postText');
        jest.spyOn(authClient, 'isAuthenticated');
        jest.spyOn(authClient, 'authenticate');
        jest.spyOn(authClient, 'getAccessKey');

    });

    beforeEach(() => {
        client = OpRefundClientImpl.create(
            requestClient,
            authClient,
            requestSigner,
            "https://example.com"
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('#refundPayment', () => {

        it("should initiate refund correctly with unauthenticated auth client", async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(false);
            (authClient.getAccessKey as any).mockImplementation(() => {
                throw new Error('Not authenticated');
            });
            (authClient.authenticate as any).mockReturnValue(Promise.resolve());
            (requestClient.postText as any).mockReturnValue(Promise.resolve(JSON.stringify(MOCK_OP_REFUND_RESPONSE_DTO)));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            await expect(client.refundPayment(MOCK_OPREFUNDREQUEST_DTO)).rejects.toThrow('Not authenticated');

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();
            expect(requestSigner).not.toHaveBeenCalled();
            expect(requestClient.postText).not.toHaveBeenCalled();

        });

        it("should initiate refund correctly with authenticated auth client", async () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(true);
            (authClient.getAccessKey as any).mockReturnValue(MOCK_ACCESS_TOKEN);
            (requestClient.postText as any).mockReturnValue(Promise.resolve(JSON.stringify(MOCK_OP_REFUND_RESPONSE_DTO)));
            (requestSigner as any).mockReturnValue(MOCK_SIGNATURE);

            // Act
            const result = await client.refundPayment(MOCK_OPREFUNDREQUEST_DTO);

            // Assert
            expect(authClient.isAuthenticated).not.toHaveBeenCalled();
            expect(authClient.authenticate).not.toHaveBeenCalled();

            expect(requestSigner).toHaveBeenCalledTimes(1);
            expect(requestSigner).toHaveBeenCalledWith(JSON.stringify(MOCK_OPREFUNDREQUEST_DTO));

            expect(requestClient.postText).toHaveBeenCalledTimes(1);
            expect(requestClient.postText).toHaveBeenCalledWith(
                // Please adjust the URL endpoint according to your actual implementation.
                "https://example.com/corporate-payment/v2/payment-refund",
                JSON.stringify(MOCK_OPREFUNDREQUEST_DTO),
                expect.objectContaining({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${MOCK_ACCESS_TOKEN}`,
                    "X-Req-Signature": MOCK_SIGNATURE,
                })
            );

            // Expect result to match mock OpRefundResponseDTO
            expect(result).toStrictEqual(MOCK_OP_REFUND_RESPONSE_DTO);

        });

    });

    describe('#authenticate', () => {

        it('should authenticate correctly', async () => {

            // Arrange
            (authClient.authenticate as any).mockReturnValue(Promise.resolve());

            // Act
            await client.authenticate(MOCK_CLIENT_ID, MOCK_CLIENT_SECRET);

            // Assert
            expect(authClient.authenticate).toHaveBeenCalledWith(MOCK_CLIENT_ID, MOCK_CLIENT_SECRET);

        });

    });

    describe('#isAuthenticated', () => {

        it('should check if auth client is authenticated correctly', () => {

            // Arrange
            (authClient.isAuthenticated as any).mockReturnValue(true);

            // Act
            const result = client.isAuthenticated();

            // Assert
            expect(authClient.isAuthenticated).toHaveBeenCalled();
            expect(result).toBe(true);

        });

    });

    describe('#getAccessKey', () => {

        it('should get the access key correctly', () => {

            // Arrange
            (authClient.getAccessKey as any).mockReturnValue(MOCK_ACCESS_TOKEN);

            // Act
            const result = client.getAccessKey();

            // Assert
            expect(authClient.getAccessKey).toHaveBeenCalled();
            expect(result).toBe(MOCK_ACCESS_TOKEN);

        });

    });

});

