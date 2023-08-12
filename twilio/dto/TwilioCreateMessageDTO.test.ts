// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../types/explain";
import { createTwilioCreateMessageDTO, explainTwilioCreateMessageDTO, explainTwilioCreateMessageDTOOrUndefined, isTwilioCreateMessageDTO, isTwilioCreateMessageDTOOrUndefined, parseTwilioCreateMessageDTO } from "./TwilioCreateMessageDTO";
import { TwilioCreateMessageMediaUrl } from "./types/TwilioCreateMessageMediaUrl";
import { TwilioCreateMessageRecipient } from "./types/TwilioCreateMessageRecipient";
import { TwilioCreateMessageSender } from "./types/TwilioCreateMessageSender";

const mockMediaUrl: TwilioCreateMessageMediaUrl = { MediaUrl: "http://example.com/image.jpg" };
// const mockMessageBody: TwilioCreateMessageBody = { Body: "This is a message body" };
// const mockMessageContentSid: TwilioCreateMessageContentSid = { ContentSid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" };
const mockRecipient: TwilioCreateMessageRecipient = { To: "+123456789" };
const mockSender: TwilioCreateMessageSender = { From: "+987654321" };
const mockUndefined: unknown = undefined;
const mockInvalid: unknown = 42; // this is an invalid type to pass to these functions
const mockTwilioCreateMessageDTO = { ...mockRecipient, ...mockSender, ...mockMediaUrl };

describe('TwilioCreateMessageDTO', () => {

    describe('createTwilioCreateMessageDTO', () => {
        it('returns the correct DTO', () => {
            expect(createTwilioCreateMessageDTO(mockRecipient, mockSender, mockMediaUrl)).toEqual(mockTwilioCreateMessageDTO);
        });
    });

    describe('isTwilioCreateMessageDTO', () => {

        it('returns true for valid DTOs', () => {
            expect(isTwilioCreateMessageDTO({ ...mockRecipient, ...mockSender, ...mockMediaUrl })).toBe(true);
        });

        it('returns false for invalid values', () => {
            expect(isTwilioCreateMessageDTO(mockInvalid)).toBe(false);
        });

    });

    describe('explainTwilioCreateMessageDTO', () => {
        it('returns a correct explanation for valid and invalid DTOs', () => {
            expect(explainTwilioCreateMessageDTO({ ...mockRecipient, ...mockSender, ...mockMediaUrl })).toEqual(explainOk());
            expect(explainTwilioCreateMessageDTO(mockInvalid)).toEqual(explainNot('TwilioCreateMessageDTO'));
        });
    });

    describe('parseTwilioCreateMessageDTO', () => {
        it('returns the DTO for valid DTOs and undefined for invalid values', () => {
            expect(parseTwilioCreateMessageDTO({ ...mockRecipient, ...mockSender, ...mockMediaUrl })).toEqual({ ...mockRecipient, ...mockSender, ...mockMediaUrl });
            expect(parseTwilioCreateMessageDTO(mockInvalid)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageDTOOrUndefined', () => {
        it('returns true for valid DTOs and undefined, false for invalid values', () => {
            expect(isTwilioCreateMessageDTOOrUndefined({ ...mockRecipient, ...mockSender, ...mockMediaUrl })).toBe(true);
            expect(isTwilioCreateMessageDTOOrUndefined(mockUndefined)).toBe(true);
            expect(isTwilioCreateMessageDTOOrUndefined(mockInvalid)).toBe(false);
        });
    });

    describe('explainTwilioCreateMessageDTOOrUndefined', () => {

        it('returns a correct explanation for valid DTOs', () => {
            expect(explainTwilioCreateMessageDTOOrUndefined({ ...mockRecipient, ...mockSender, ...mockMediaUrl })).toEqual(explainOk());
        });

        it('returns a correct explanation for undefined', () => {
            expect(explainTwilioCreateMessageDTOOrUndefined(mockUndefined)).toEqual(explainOk());
        });

        it('returns a correct explanation for invalid values', () => {
            expect(explainTwilioCreateMessageDTOOrUndefined(mockInvalid)).toEqual(explainNot(explainOr(['TwilioCreateMessageDTO', 'undefined'])));
        });

    });

});
