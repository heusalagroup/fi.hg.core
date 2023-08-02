// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { TwilioCreateMessageBody } from "./TwilioCreateMessageBody";
import { TwilioCreateMessageContentSid } from "./TwilioCreateMessageContentSid";
import { TwilioCreateMessageMediaUrl } from "./TwilioCreateMessageMediaUrl";
import { createTwilioCreateMessageContent, isTwilioCreateMessageContent, explainTwilioCreateMessageContent, parseTwilioCreateMessageContent, isTwilioCreateMessageContentOrUndefined, explainTwilioCreateMessageContentOrUndefined } from './TwilioCreateMessageContent';

const mockMediaUrl: TwilioCreateMessageMediaUrl = { MediaUrl: "http://example.com/image.jpg" };
const mockMessageBody: TwilioCreateMessageBody = { Body: "This is a message body" };
const mockMessageContentSid: TwilioCreateMessageContentSid = { ContentSid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" };
const mockUndefined: unknown = undefined;
const mockInvalid: unknown = 42; // this is an invalid type to pass to these functions

describe('TwilioCreateMessageContent', () => {

    describe('createTwilioCreateMessageContent function', () => {
        it('returns the same content that was passed in', () => {
            expect(createTwilioCreateMessageContent(mockMediaUrl)).toEqual(mockMediaUrl);
            expect(createTwilioCreateMessageContent(mockMessageBody)).toEqual(mockMessageBody);
            expect(createTwilioCreateMessageContent(mockMessageContentSid)).toEqual(mockMessageContentSid);
        });
    });

    describe('isTwilioCreateMessageContent function', () => {
        it('returns true for valid message content and false for invalid content', () => {
            expect(isTwilioCreateMessageContent(mockMediaUrl)).toBe(true);
            expect(isTwilioCreateMessageContent(mockMessageBody)).toBe(true);
            expect(isTwilioCreateMessageContent(mockMessageContentSid)).toBe(true);
            expect(isTwilioCreateMessageContent(mockInvalid)).toBe(false);
        });
    });

    describe('explainTwilioCreateMessageContent function', () => {
        it('returns a correct explanation for valid and invalid content', () => {
            expect(explainTwilioCreateMessageContent(mockMediaUrl)).toEqual(explainOk());
            expect(explainTwilioCreateMessageContent(mockInvalid)).toEqual(explainNot('TwilioCreateMessageContent'));
        });
    });

    describe('parseTwilioCreateMessageContent function', () => {
        it('returns the content for valid content and undefined for invalid content', () => {
            expect(parseTwilioCreateMessageContent(mockMediaUrl)).toEqual(mockMediaUrl);
            expect(parseTwilioCreateMessageContent(mockInvalid)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageContentOrUndefined function', () => {
        it('returns true for valid content and undefined, false for invalid content', () => {
            expect(isTwilioCreateMessageContentOrUndefined(mockMediaUrl)).toBe(true);
            expect(isTwilioCreateMessageContentOrUndefined(mockUndefined)).toBe(true);
            expect(isTwilioCreateMessageContentOrUndefined(mockInvalid)).toBe(false);
        });
    });

    describe('explainTwilioCreateMessageContentOrUndefined function', () => {
        it('returns a correct explanation for valid content, undefined and invalid content', () => {
            expect(explainTwilioCreateMessageContentOrUndefined(mockMediaUrl)).toEqual(explainOk());
            expect(explainTwilioCreateMessageContentOrUndefined(mockUndefined)).toEqual(explainOk());
            expect(explainTwilioCreateMessageContentOrUndefined(mockInvalid)).toEqual(explainNot(explainOr(['TwilioCreateMessageContent', 'undefined'])));
        });
    });

});
