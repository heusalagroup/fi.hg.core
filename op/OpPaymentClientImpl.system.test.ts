// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProcessUtils } from "../ProcessUtils";

ProcessUtils.initEnvFromDefaultFiles();

import HTTP from "http";
import HTTPS from "https";
// @ts-ignore
import { HgNode } from "../../node/HgNode";
import { OP_SANDBOX_URL } from "./op-constants";
import { OpPaymentClient } from "./OpPaymentClient";
import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { Currency } from "../types/Currency";
import { CountryCode } from "../types/CountryCode";
import { OpPaymentResponseDTO } from "./dto/OpPaymentResponseDTO";
// @ts-ignore
import { NodeRequestClient } from "../../node/requestClient/node/NodeRequestClient";
import { RequestClientImpl } from "../RequestClientImpl";
import { Headers } from "../request/types/Headers";
import { OpPaymentClientImpl } from "./OpPaymentClientImpl";
import { OpAuthClientImpl } from "./OpAuthClientImpl";
import { LogLevel } from "../types/LogLevel";
import { OpRequestSigner } from "./OpRequestSigner";
import { OpPaymentStatus } from "./types/OpPaymentStatus";
import { OpPaymentListDTO } from "./dto/OpPaymentListDTO";
import { first } from "../functions/first";
import { OpAuthClient } from "./OpAuthClient";

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
            Headers.setLogLevel(LogLevel.NONE);
            RequestClientImpl.setLogLevel(LogLevel.NONE);
            NodeRequestClient.setLogLevel(LogLevel.NONE);
            OpRequestSigner.setLogLevel(LogLevel.NONE);
            OpAuthClientImpl.setLogLevel(LogLevel.NONE);
            OpPaymentClientImpl.setLogLevel(LogLevel.NONE);
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
            const authClient : OpAuthClient = OpAuthClientImpl.create(
                requestClient,
                API_SERVER,
            );
            client = OpPaymentClientImpl.create(
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
        });

        describe('#createPayment', () => {

            it('should return a successful response with valid input', async () => {

                const instructionId = `${Date.now()}${(Math.random()*100000).toFixed(0)}`; // unique instruction id
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

        describe('#createInstantPayment', () => {

            it('should return a successful response with valid input', async () => {

                const instructionId = `${Date.now()}${(Math.random()*100000).toFixed(0)}`; // unique instruction id
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

                const paymentResponse : OpPaymentResponseDTO = await client.createInstantPayment(paymentRequest);
                expect(paymentResponse).toBeDefined();
                expect(paymentResponse.transactionId).toBeDefined();
                expect(paymentResponse.status).toBeDefined();
                expect(paymentResponse.endToEndId).toBe(endToEndId);

            });

        });

        describe('#getInstantPaymentStatus', () => {

            let instructionId : string;
            let paymentResponse : OpPaymentResponseDTO;
            let endToEndId : string;

            beforeEach( async () => {

                let counter : number = 0;
                while (counter < 10) {

                    instructionId = `${Date.now()}${(Math.random()*100000).toFixed(0)}`; // unique instruction id
                    endToEndId = `${Date.now()}${(Math.random()*100000).toFixed(0)}`; // unique end to end id

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

                    paymentResponse = await client.createPayment(paymentRequest);
                    // console.log(`${counter} / 10: paymentResponse.status = ${paymentResponse.status}`);
                    if (paymentResponse.status === OpPaymentStatus.PROCESSING) {
                        break;
                    }
                    counter += 1;
                }

                expect(paymentResponse).toBeDefined();
                expect(paymentResponse.transactionId).toBeDefined();
                expect(paymentResponse.status).toBe(OpPaymentStatus.PROCESSING);
                expect(paymentResponse.endToEndId).toBe(endToEndId);

            });

            it('should return a successful response with valid input', async () => {
                const list : OpPaymentListDTO = await client.getInstantPaymentStatus(instructionId);
                expect(list).toHaveLength(1);
                const dto = first(list);
                expect(dto).toBeDefined();
                expect(dto?.transactionId).toBeDefined();
                expect(dto?.status).toBeDefined();
                expect(dto?.endToEndId).toBe(endToEndId);
            });

        });

    });

});
