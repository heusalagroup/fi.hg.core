// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { RequestClient } from "../RequestClient";
import { LogLevel } from "../types/LogLevel";
import { parseTwilioMessageDTO, TwilioMessageDTO } from "./dto/TwilioMessageDTO";
import { TwilioCreateMessageBody } from "./dto/types/TwilioCreateMessageBody";
import { TwilioCreateMessageRecipient } from "./dto/types/TwilioCreateMessageRecipient";
import { TwilioCreateMessageSender } from "./dto/types/TwilioCreateMessageSender";
import { TwilioMessageDirection } from "./dto/types/TwilioMessageDirection";
import { TwilioMessageStatus } from "./dto/types/TwilioMessageStatus";
import { TwilioMessageClientImpl } from "./TwilioMessageClientImpl";

const mockMessageBodyString: string = "This is a message body";
const mockRecipientString: string = "+123456789";
const mockSenderString: string = "+987654321";

// const mockMediaUrl: TwilioCreateMessageMediaUrl = { MediaUrl: "http://example.com/image.jpg" };
// const mockMessageContentSid: TwilioCreateMessageContentSid = { ContentSid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" };
const mockMessageBody: TwilioCreateMessageBody = { Body: "This is a message body" };
const mockRecipient: TwilioCreateMessageRecipient = { To: "+123456789" };
const mockSender: TwilioCreateMessageSender = { From: "+987654321" };
// const mockUndefined: unknown = undefined;
// const mockInvalid: unknown = 42; // this is an invalid type to pass to these functions
// const mockTwilioCreateMessageDTO = {
//     To: "+123456789",
//     From: "+987654321",
//     Body: "This is a message body"
// };
const mockTwilioCreateMessageBody = 'To=%2B123456789&From=%2B987654321&Body=This+is+a+message+body';

// Assuming a mock ReadonlyJsonObject that fits your requirements
const mockSubresourceUris: ReadonlyJsonObject = { media: "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json" };

const mockTwilioMessage: TwilioMessageDTO = {
    account_sid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    api_version: "2010-04-01",
    body: "Hi there",
    date_created: "Thu, 30 Jul 2015 20:12:31 +0000",
    date_sent: "Thu, 30 Jul 2015 20:12:33 +0000",
    date_updated: "Thu, 30 Jul 2015 20:12:33 +0000",
    direction: TwilioMessageDirection.OUTBOUND_API, // Assuming a correct value here
    error_code: null,
    error_message: null,
    from: "+15557122661",
    messaging_service_sid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    num_media: "0",
    num_segments: "1",
    price: null,
    price_unit: null,
    sid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    status: TwilioMessageStatus.SENT, // Assuming a correct value here
    subresource_uris: mockSubresourceUris,
    to: "+15558675310",
    uri: "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
};

class MockRequestClient {
    postText = jest.fn();

    getClient() {
        throw new Error("Method not implemented.");
    }
}

beforeAll(() => {
    TwilioMessageClientImpl.setLogLevel(LogLevel.NONE);
})

describe('TwilioMessageClientImpl', () => {
    let mockRequestClient: MockRequestClient;
    let twilioClient: TwilioMessageClientImpl;

    const accountSid = 'TestAccountSid';
    const authToken = 'TestAuthToken';

    beforeEach(() => {
        mockRequestClient = new MockRequestClient();
        twilioClient = TwilioMessageClientImpl.create(
            accountSid,
            authToken,
            mockSender,
            mockRequestClient as unknown as RequestClient,
        );
    });

    it('should create new instance correctly', () => {
        expect(twilioClient).toBeInstanceOf(TwilioMessageClientImpl);
    });

    describe('sendSms', () => {
        // let mockDto: TwilioCreateMessageDTO;
        //
        // beforeEach(() => {
        //     mockDto = mockTwilioCreateMessageDTO;
        // });

        it('should send SMS successfully using DTOs', async () => {
            const mockResponse: TwilioMessageDTO = mockTwilioMessage;
            const responseJson = JSON.stringify(mockResponse);

            mockRequestClient.postText.mockResolvedValue(responseJson);

            const result = await twilioClient.sendSms(
                mockMessageBody,
                mockRecipient,
                mockSender,
            );

            expect(mockRequestClient.postText).toBeCalledTimes(1);
            expect(mockRequestClient.postText).toBeCalledWith(
                `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
                mockTwilioCreateMessageBody,
                {
                    'Authorization': 'Basic VGVzdEFjY291bnRTaWQ6VGVzdEF1dGhUb2tlbg==',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            );
            expect(parseTwilioMessageDTO(result)).toStrictEqual(mockResponse);
        });

        it('should send SMS successfully using strings', async () => {
            const mockResponse: TwilioMessageDTO = mockTwilioMessage;
            const responseJson = JSON.stringify(mockResponse);

            mockRequestClient.postText.mockResolvedValue(responseJson);

            const result = await twilioClient.sendSms(
                mockMessageBodyString,
                mockRecipientString,
                mockSenderString,
            );

            expect(mockRequestClient.postText).toBeCalledTimes(1);
            expect(mockRequestClient.postText).toBeCalledWith(
                `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
                mockTwilioCreateMessageBody,
                {
                    'Authorization': 'Basic VGVzdEFjY291bnRTaWQ6VGVzdEF1dGhUb2tlbg==',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            );
            expect(parseTwilioMessageDTO(result)).toStrictEqual(mockResponse);
        });

        it('should send SMS successfully using strings with default sender', async () => {
            const mockResponse: TwilioMessageDTO = mockTwilioMessage;
            const responseJson = JSON.stringify(mockResponse);

            mockRequestClient.postText.mockResolvedValue(responseJson);

            const result = await twilioClient.sendSms(
                mockMessageBodyString,
                mockRecipientString,
            );

            expect(mockRequestClient.postText).toBeCalledTimes(1);
            expect(mockRequestClient.postText).toBeCalledWith(
                `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
                mockTwilioCreateMessageBody,
                {
                    'Authorization': 'Basic VGVzdEFjY291bnRTaWQ6VGVzdEF1dGhUb2tlbg==',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            );
            expect(parseTwilioMessageDTO(result)).toStrictEqual(mockResponse);
        });

        it('should throw an error when the response is not TwilioMessageDTO', async () => {
            mockRequestClient.postText.mockResolvedValue('{"invalid": "response"}');

            await expect(twilioClient.sendSms(
                mockMessageBody,
                mockRecipient,
                mockSender,
            )).rejects.toThrow(TypeError);
            expect(mockRequestClient.postText).toBeCalledTimes(1);
        });

    });

});
