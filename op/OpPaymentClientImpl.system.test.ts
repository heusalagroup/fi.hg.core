// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProcessUtils } from "../ProcessUtils";

ProcessUtils.initEnvFromDefaultFiles();

import HTTP from "http";
import HTTPS from "https";
import { HgNode } from "../../node/HgNode";
import { OP_SANDBOX_URL } from "./op-constants";
import { OpPaymentClient } from "./OpPaymentClient";
import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { Currency } from "../types/Currency";
import { CountryCode } from "../types/CountryCode";
import { OpPaymentResponseDTO } from "./dto/OpPaymentResponseDTO";
import { NodeRequestClient } from "../../node/requestClient/node/NodeRequestClient";
import { RequestClient } from "../RequestClient";
import { OpPaymentClientImpl } from "./OpPaymentClientImpl";
import { OpAuthClientImpl } from "./OpAuthClientImpl";
import { LogLevel } from "../types/LogLevel";

const API_SERVER = process.env.OP_SANDBOX_URL ?? OP_SANDBOX_URL;
const CLIENT_ID = process.env.OP_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.OP_CLIENT_SECRET ?? '';
const MTLS_KEY = process.env.OP_MTLS_KEY ?? '';
const MTLS_CRT = process.env.OP_MTLS_CRT ?? '';
const SIGNING_KEY = process.env.OP_SIGNING_KEY ?? '';
const SIGNING_KID = process.env.OP_SIGNING_KID ?? '';

/**
 * To run these tests, create `.env` file like this:
 * ```
 * OP_CLIENT_ID=clientId
 * OP_CLIENT_SECRET=clientSecret
 * OP_SIGNING_KEY="-----BEGIN RSA PRIVATE KEY-----
 * ...
 * -----END RSA PRIVATE KEY-----"
 * OP_SIGNING_KID=signing-kid
 * OP_MTLS_KEY="-----BEGIN RSA PRIVATE KEY-----
 * ...
 * -----END RSA PRIVATE KEY-----"
 * OP_MTLS_CRT="-----BEGIN CERTIFICATE-----
 * ...
 * -----END CERTIFICATE-----"
 * ```
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#section/Usage-example
 */
describe('system', () => {
    (CLIENT_ID ? describe : describe.skip)('OpPaymentClientImpl', () => {
        let client : OpPaymentClient;

        beforeAll(() => {
            RequestClient.setLogLevel(LogLevel.NONE);
            NodeRequestClient.setLogLevel(LogLevel.NONE);
            OpAuthClientImpl.setLogLevel(LogLevel.NONE);
            OpPaymentClientImpl.setLogLevel(LogLevel.NONE);
            HgNode.initialize();
        });

        beforeEach(() => {
            const requestClient = RequestClient.create(
                NodeRequestClient.create(
                    HTTP,
                    HTTPS,
                    {
                        cert: MTLS_CRT,
                        key: MTLS_KEY,
                    }
                )
            );
            client = OpPaymentClientImpl.create(
                requestClient,
                OpAuthClientImpl.create(
                    requestClient,
                    CLIENT_ID,
                    CLIENT_SECRET,
                    API_SERVER,
                ),
                SIGNING_KEY,
                SIGNING_KID,
                API_SERVER,
            );
        });

        describe('#createPayment', () => {

            it('should return a successful response with valid input', async () => {

                const instructionId = `${Date.now()}`; // unique instruction id
                const endToEndId = "endToEndId";

                const paymentRequest : OpPaymentRequestDTO = {
                    instructionId,
                    endToEndId,
                    creditor: {
                        name: "Creditor Name",
                        iban: "FI3859991620004143",
                        address: {
                            addressLine: ["a1", "a2"],
                            country: CountryCode.FI
                        }
                    },
                    debtor: {
                        name: "Debtor Name",
                        iban: "FI6359991620004275",
                        address: {
                            addressLine: ["a1", "a2"],
                            country: CountryCode.FI
                        }
                    },
                    instructedAmount: {
                        currency: Currency.EUR,
                        amount: "0.16"
                    },
                    reference: "00000000000000482738"
                };

                const paymentResponse : OpPaymentResponseDTO = await client.createPayment(paymentRequest);
                expect(paymentResponse).toBeDefined();
                expect(paymentResponse.transactionId).toBeDefined();
                expect(paymentResponse.status).toBeDefined();
                expect(paymentResponse.endToEndId).toBe(endToEndId);

            });

        });

    });

});
