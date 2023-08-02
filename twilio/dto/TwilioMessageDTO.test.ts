// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { TwilioMessageDTO } from "./TwilioMessageDTO";
import { TwilioMessageDirection } from "./types/TwilioMessageDirection";
import { TwilioMessageStatus } from "./types/TwilioMessageStatus";
import { createTwilioMessageDTO, explainTwilioMessageDTO, explainTwilioMessageDTOOrUndefined, isTwilioMessageDTO, isTwilioMessageDTOOrUndefined, parseTwilioMessageDTO } from './TwilioMessageDTO';

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

const mockInvalid: unknown = 42; // this is an invalid type to pass to these functions

describe('TwilioMessageDTO', () => {
    describe('createTwilioMessageDTO function', () => {
        it('returns the correct DTO', () => {
            expect(createTwilioMessageDTO(
                mockTwilioMessage.account_sid,
                mockTwilioMessage.api_version,
                mockTwilioMessage.body,
                mockTwilioMessage.date_created,
                mockTwilioMessage.date_sent,
                mockTwilioMessage.date_updated,
                mockTwilioMessage.direction,
                mockTwilioMessage.error_code,
                mockTwilioMessage.error_message,
                mockTwilioMessage.from,
                mockTwilioMessage.messaging_service_sid,
                mockTwilioMessage.num_media,
                mockTwilioMessage.num_segments,
                mockTwilioMessage.price,
                mockTwilioMessage.price_unit,
                mockTwilioMessage.sid,
                mockTwilioMessage.status,
                mockTwilioMessage.subresource_uris,
                mockTwilioMessage.to,
                mockTwilioMessage.uri
            )).toEqual(mockTwilioMessage);
        });
    });

    describe('isTwilioMessageDTO function', () => {
        it('returns true for valid DTOs and false for invalid values', () => {
            expect(isTwilioMessageDTO(mockTwilioMessage)).toBe(true);
            expect(isTwilioMessageDTO(mockInvalid)).toBe(false);
        });
    });

    describe('explainTwilioMessageDTO function', () => {
        it('returns a correct explanation for valid and invalid DTOs', () => {
            expect(explainTwilioMessageDTO(mockTwilioMessage)).toEqual(explainOk());
            expect(explainTwilioMessageDTO(mockInvalid)).toContain('property "account_sid" not string');
        });
    });

    describe('parseTwilioMessageDTO function', () => {
        it('returns the DTO for valid DTOs and undefined for invalid values', () => {
            expect(parseTwilioMessageDTO(mockTwilioMessage)).toEqual(mockTwilioMessage);
            expect(parseTwilioMessageDTO(mockInvalid)).toBeUndefined();
        });
    });

    describe('isTwilioMessageDTOOrUndefined function', () => {
        it('returns true for valid DTOs and undefined, false for invalid values', () => {
            expect(isTwilioMessageDTOOrUndefined(mockTwilioMessage)).toBe(true);
            expect(isTwilioMessageDTOOrUndefined(undefined)).toBe(true);
            expect(isTwilioMessageDTOOrUndefined(mockInvalid)).toBe(false);
        });
    });

    describe('explainTwilioMessageDTOOrUndefined function', () => {
        it('returns a correct explanation for valid DTOs, undefined and invalid values', () => {
            // Assuming explainOk and explainNot return predictable results
            expect(explainTwilioMessageDTOOrUndefined(mockTwilioMessage)).toEqual(explainOk());
            expect(explainTwilioMessageDTOOrUndefined(undefined)).toEqual(explainOk());
            expect(explainTwilioMessageDTOOrUndefined(mockInvalid)).toEqual(explainNot(explainOr(['TwilioMessageDTO', 'undefined'])));
        });
    });

});
