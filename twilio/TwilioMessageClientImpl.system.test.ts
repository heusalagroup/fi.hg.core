// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProcessUtils } from "../ProcessUtils";

ProcessUtils.initEnvFromDefaultFiles();

// @ts-ignore
import { HgNode } from "../../node/HgNode";
// @ts-ignore
import { NodeRequestClient } from "../../node/requestClient/node/NodeRequestClient";
import { TwilioMessageClient } from "./TwilioMessageClient";
import { TwilioMessageDTO } from "./dto/TwilioMessageDTO";
import { RequestClientImpl } from "../RequestClientImpl";
import { Headers } from "../request/types/Headers";
import { TwilioMessageClientImpl } from "./TwilioMessageClientImpl";
import { LogLevel } from "../types/LogLevel";

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? '';
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? '';

// const UNAVAIlABLE_PHONE_NUMBER = '+15005550000';
// const INVALID_PHONE_NUMBER = '+15005550001';
// const AVAILABLE_PHONE_NUMBER = '+15005550006';

const FROM_TEST_NUMBER_VALID = '+15005550006';
// const FROM_TEST_NUMBER_SMS_QUEUE_FULL = '+15005550008';
// const FROM_TEST_NUMBER_NOT_OWNED_BY_ACCOUNT_OR_NOT_SMS_CAPABLE = '+15005550007';
// const FROM_TEST_NUMBER_INVALID = '+15005550001';
//
// const TO_TEST_NUMBER_CANNOT_ROUTE = '+15005550002';
// const TO_TEST_NUMBER_INVALID = '+15005550001';
// const TO_TEST_NUMBER_NO_INTERNATIONAL_PERMISSION = '+15005550003';
// const TO_TEST_NUMBER_BLOCKED = '+15005550004';
// const TO_TEST_NUMBER_INCAPABLE_TO_RECEIVE = '+15005550009';
const TO_TEST_NUMBER_VALID = '+358407099704';

/**
 * To run these tests, create `.env` file like this:
 * ```
 * TWILIO_API_SERVER=https://api.twilio.com
 * TWILIO_ACCOUNT_SID=yourAccountSid
 * TWILIO_AUTH_TOKEN=yourAuthToken
 * ```
 *
 * @see https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource
 */
describe('system', () => {

    (ACCOUNT_SID ? describe : describe.skip)('TwilioMessageClientImpl', () => {
        let client : TwilioMessageClient;

        beforeAll(() => {
            Headers.setLogLevel(LogLevel.NONE);
            RequestClientImpl.setLogLevel(LogLevel.NONE);
            NodeRequestClient.setLogLevel(LogLevel.NONE);
            TwilioMessageClientImpl.setLogLevel(LogLevel.NONE);
            HgNode.initialize();
        });

        beforeEach(async () => {
            client = TwilioMessageClientImpl.create(
                ACCOUNT_SID,
                AUTH_TOKEN,
            );
        });

        describe('#sendSms', () => {

            it('should return a successful response with valid input using plain strings', async () => {

                const smsResponse : TwilioMessageDTO = await client.sendSms(
                    "Test SMS",
                    TO_TEST_NUMBER_VALID,
                    FROM_TEST_NUMBER_VALID,
                );

                expect(smsResponse).toBeDefined();
                expect(smsResponse.sid).toBeDefined();
                expect(smsResponse.status).toBeDefined();
                expect(smsResponse.body).toBe("Test SMS");

            });

        });

    });

});
