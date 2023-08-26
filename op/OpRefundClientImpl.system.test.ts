// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProcessUtils } from "../ProcessUtils";

ProcessUtils.initEnvFromDefaultFiles();

// @ts-ignore
import HTTP from "http";
// @ts-ignore
import HTTPS from "https";
// @ts-ignore
import { HgNode } from "../../node/HgNode";
import { OpAccountDTO } from "./dto/OpAccountDTO";
import { OpAccountListDTO } from "./dto/OpAccountListDTO";
import { OpTransactionDTO } from "./dto/OpTransactionDTO";
import { OpTransactionListDTO } from "./dto/OpTransactionListDTO";
import { OP_SANDBOX_URL } from "./op-constants";
import { OpAccountDataClient } from "./OpAccountDataClient";
import { OpAccountDataClientImpl } from "./OpAccountDataClientImpl";
import { OpRefundClient } from "./OpRefundClient";
import { OpRefundRequestDTO } from "./dto/OpRefundRequestDTO";
import { OpRefundResponseDTO } from "./dto/OpRefundResponseDTO";
// @ts-ignore
import { NodeRequestClient } from "../../node/requestClient/node/NodeRequestClient";
import { RequestClientImpl } from "../RequestClientImpl";
import { Headers } from "../request/types/Headers";
import { OpRefundClientImpl } from "./OpRefundClientImpl";
import { OpAuthClientImpl } from "./OpAuthClientImpl";
import { LogLevel } from "../types/LogLevel";
import { OpRequestSigner } from "./OpRequestSigner";
import { first } from "../functions/first";

const API_SERVER = process.env.OP_SANDBOX_URL ?? OP_SANDBOX_URL;
const CLIENT_ID = process.env.OP_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.OP_CLIENT_SECRET ?? '';
const MTLS_KEY = process.env.OP_MTLS_KEY ?? '';
const MTLS_CRT = process.env.OP_MTLS_CRT ?? '';
const SIGNING_KEY = process.env.OP_SIGNING_KEY ?? '';
const SIGNING_KID = process.env.OP_SIGNING_KID ?? '';

describe('system', () => {
    (CLIENT_ID ? describe : describe.skip)('OpRefundClientImpl', () => {
        let client : OpRefundClient;
        let accountDataClient : OpAccountDataClient;
        let accountList : OpAccountListDTO;
        let account : OpAccountDTO;
        let transaction : OpTransactionDTO;

        beforeAll(() => {
            Headers.setLogLevel(LogLevel.NONE);
            RequestClientImpl.setLogLevel(LogLevel.NONE);
            NodeRequestClient.setLogLevel(LogLevel.NONE);
            OpRequestSigner.setLogLevel(LogLevel.NONE);
            OpAuthClientImpl.setLogLevel(LogLevel.NONE);
            OpRefundClientImpl.setLogLevel(LogLevel.NONE);
            HgNode.initialize();
        });

        beforeEach(async () => {
            const requestClient = RequestClientImpl.create(
                NodeRequestClient.create(
                    HTTP,
                    HTTPS,
                    {
                        cert: MTLS_CRT,
                        key: MTLS_KEY,
                    }
                )
            );
            const authClient = OpAuthClientImpl.create(
                requestClient,
                API_SERVER,
            );

            accountDataClient = OpAccountDataClientImpl.create(
                requestClient,
                authClient,
                API_SERVER,
            );

            client = OpRefundClientImpl.create(
                requestClient,
                authClient,
                OpRequestSigner.create(
                    SIGNING_KID,
                    SIGNING_KEY,
                ),
                API_SERVER,
            );
            await authClient.authenticate(
                CLIENT_ID,
                CLIENT_SECRET,
            );

            accountList = await accountDataClient.getAccountList();
            if (accountList.length === 0) throw new TypeError('No accounts found');
            account = first(accountList) as unknown as OpAccountDTO;

            const surrogateId = account.surrogateId;
            const fromTimestamp = Date.now()*1000;
            const transactionList : OpTransactionListDTO = await accountDataClient.getTransactionListFromTimestamp( surrogateId, fromTimestamp );
            expect( transactionList ).toBeDefined();

            if (transactionList.length === 0) throw new TypeError('No transactions found');
            transaction = first(transactionList) as unknown as OpTransactionDTO;

        });

        describe('#refundPayment', () => {

            it('should return a successful response with valid archive ID', async () => {

                const refundRequest: OpRefundRequestDTO = {
                    "archiveId": transaction.archiveId,
                    "amount": "12.35",
                    "message": "Refund",
                    "accountIban": account.iban,
                    "transactionDate": transaction.paymentDate,
                    "endToEndId": "544652-end2end",
                };

                const refundResponse: OpRefundResponseDTO = await client.refundPayment(refundRequest);
                expect(refundResponse).toBeDefined();
                // add more specific assertions about the refund response as needed
            });

            // @FIXME: 12345678901234567890 should be invalid but works anyway
            it.skip('should return an error response with invalid archive ID format', async () => {

                const refundRequest: OpRefundRequestDTO = {
                    "archiveId": "12345678901234567890",
                    "amount": "12.35",
                    "message": "Refund",
                    "accountIban": account.iban,
                    "transactionDate": transaction.paymentDate,
                    "endToEndId": "544652-end2end",
                };

                await expect(client.refundPayment(refundRequest)).rejects.toThrow("Transaction not found");

            });

            // Add more tests for other specific error cases mentioned in the provided information

        });

    });
});
