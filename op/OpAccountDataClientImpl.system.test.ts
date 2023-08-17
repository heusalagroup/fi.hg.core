// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProcessUtils } from "../ProcessUtils";
ProcessUtils.initEnvFromDefaultFiles();

import HTTP from "http";
import HTTPS from "https";
import { OP_SANDBOX_URL } from "./op-constants";
// @ts-ignore
import { NodeRequestClient } from "../../node/requestClient/node/NodeRequestClient";
import { RequestClientImpl } from "../RequestClientImpl";
import { OpAccountDataClientImpl } from "./OpAccountDataClientImpl";
import { OpAuthClientImpl } from "./OpAuthClientImpl";
import { map } from "../functions/map";
import { OpAccountDTO } from "./dto/OpAccountDTO";
import { shuffle } from "../functions/shuffle";
import { slice } from "../functions/slice";
import { parseInteger } from "../types/Number";
import { LogLevel } from "../types/LogLevel";
import { OpAccountDataClient } from "./OpAccountDataClient";
import { OpAuthClient } from "./OpAuthClient";

const API_SERVER = process.env.OP_SANDBOX_URL ?? OP_SANDBOX_URL;
const CLIENT_ID = process.env.OP_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.OP_CLIENT_SECRET ?? '';
const MTLS_KEY = process.env.OP_MTLS_KEY ?? '';
const MTLS_CRT = process.env.OP_MTLS_CRT ?? '';

/**
 * Since there may be a way too many transactions to test every one, we test
 * only this amount by random.
 *
 * The intention is so that we could find if our DTOs have correct types.
 *
 * This will make this test unstable though. It may fail sometimes and not fail
 * other times.
 */
const TRANSACTION_TEST_LIMIT = parseInteger(process.env.OP_TRANSACTION_TEST_LIMIT ?? '5') ?? 5;

/**
 * To run these tests, create `.env` file like this:
 * ```
 * OP_SANDBOX_URL=sandbox-url
 * OP_CLIENT_ID=clientId
 * OP_CLIENT_SECRET=clientSecret
 * OP_MTLS_KEY="-----BEGIN RSA PRIVATE KEY-----
 * ...
 * -----END RSA PRIVATE KEY-----"
 * OP_MTLS_CRT="-----BEGIN CERTIFICATE-----
 * ...
 * -----END CERTIFICATE-----"
 * ```
 */
describe('system', () => {
    (CLIENT_ID ? describe : describe.skip)('OpAccountDataClientImpl', () => {
        let accountDataClient : OpAccountDataClient;

        beforeAll(() => {
            RequestClientImpl.setLogLevel(LogLevel.NONE);
            NodeRequestClient.setLogLevel(LogLevel.NONE);
            OpAuthClientImpl.setLogLevel(LogLevel.NONE);
            OpAccountDataClientImpl.setLogLevel(LogLevel.NONE);
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
            const authClient : OpAuthClient = OpAuthClientImpl.create(
                requestClient,
                API_SERVER,
            );
            accountDataClient = OpAccountDataClientImpl.create(
                requestClient,
                authClient,
                API_SERVER,
            );
            await authClient.authenticate(
                CLIENT_ID,
                CLIENT_SECRET,
            );
        });

        describe('#getAccountList', () => {
            it('should return a list of accounts', async () => {
                const accountList = await accountDataClient.getAccountList();
                expect(accountList).toBeDefined();
                expect(Array.isArray(accountList)).toBeTruthy();
            });
        });

        describe('surrogateId operations', () => {

            let surrogateIdList : string[];

            beforeEach( async () => {
                const accountList = await accountDataClient.getAccountList();
                expect(accountList.length).toBeGreaterThanOrEqual(1);
                surrogateIdList = map(
                    accountList,
                    (item: OpAccountDTO) => item.surrogateId
                );
            });

            describe('#getAccountDetails', () => {

                it('should return details for a all accounts', async () => {
                    for(let i=0; i<surrogateIdList.length; i+=1) {
                        const surrogateId = surrogateIdList[i];
                        const accountDetails = await accountDataClient.getAccountDetails(surrogateId);
                        expect(accountDetails).toBeDefined();
                    }
                });

            });

            describe('#getTransactionListFromTimestamp', () => {

                it('should return a list of transactions for each SurrogateId', async () => {
                    for(let i=0; i<surrogateIdList.length; i+=1) {
                        const surrogateId = surrogateIdList[i];
                        const fromTimestamp = Date.now()*1000;
                        const transactionList = await accountDataClient.getTransactionListFromTimestamp( surrogateId, fromTimestamp );
                        expect( transactionList ).toBeDefined();
                    }
                });

            });

            describe('#getTransactionListFromObjectId', () => {

                it('should return a list of transactions', async () => {
                    for(let i=0; i<surrogateIdList.length; i+=1) {
                        const surrogateId = surrogateIdList[i];

                        const fromTimestamp = Date.now()*1000;
                        const firstTransactionList = await accountDataClient.getTransactionListFromTimestamp( surrogateId, fromTimestamp );

                        // We test only 5
                        const objectIdList = slice(shuffle(map(
                            firstTransactionList,
                            (item) => item.objectId
                        )), 0, TRANSACTION_TEST_LIMIT);

                        for (let i=0; i<objectIdList.length; i+=1) {
                            const objectId = objectIdList[i];
                            const transactionList = await accountDataClient.getTransactionListFromObjectId( surrogateId, objectId );
                            expect( transactionList ).toBeDefined();
                        }

                    }
                });

            });

        });

    });

});
