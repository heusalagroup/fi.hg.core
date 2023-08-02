// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createTwilioCreateMessageSender, explainTwilioCreateMessageSender, explainTwilioCreateMessageSenderOrUndefined, isTwilioCreateMessageSender, isTwilioCreateMessageSenderOrUndefined, parseTwilioCreateMessageSender } from "./TwilioCreateMessageSender";

const VALID_FROM = { From: '+15557122661' };
const VALID_MESSAGING_SERVICE_SID = { MessagingServiceSid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' };
const INVALID_SENDER = { InvalidKey: 'invalidValue' }; // Add more invalid cases as per your requirements

describe('TwilioCreateMessageSender', () => {

    describe('createTwilioCreateMessageSender', () => {
        it('should create a valid object for From', () => {
            const result = createTwilioCreateMessageSender(VALID_FROM);
            expect(result).toEqual(VALID_FROM);
        });

        it('should create a valid object for MessagingServiceSid', () => {
            const result = createTwilioCreateMessageSender(VALID_MESSAGING_SERVICE_SID);
            expect(result).toEqual(VALID_MESSAGING_SERVICE_SID);
        });
    });

    describe('isTwilioCreateMessageSender', () => {
        it('should return true for valid From input', () => {
            expect(isTwilioCreateMessageSender(VALID_FROM)).toBeTruthy();
        });

        it('should return true for valid MessagingServiceSid input', () => {
            expect(isTwilioCreateMessageSender(VALID_MESSAGING_SERVICE_SID)).toBeTruthy();
        });

        it('should return false for invalid input', () => {
            expect(isTwilioCreateMessageSender(INVALID_SENDER)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageSender', () => {
        it('should return OK for valid From input', () => {
            expect(explainTwilioCreateMessageSender(VALID_FROM)).toBe('OK');
        });

        it('should return OK for valid MessagingServiceSid input', () => {
            expect(explainTwilioCreateMessageSender(VALID_MESSAGING_SERVICE_SID)).toBe('OK');
        });

        it('should return error string for invalid input', () => {
            expect(explainTwilioCreateMessageSender(INVALID_SENDER)).not.toBe('OK');
        });
    });

    describe('parseTwilioCreateMessageSender', () => {
        it('should return value for valid From input', () => {
            expect(parseTwilioCreateMessageSender(VALID_FROM)).toEqual(VALID_FROM);
        });

        it('should return value for valid MessagingServiceSid input', () => {
            expect(parseTwilioCreateMessageSender(VALID_MESSAGING_SERVICE_SID)).toEqual(VALID_MESSAGING_SERVICE_SID);
        });

        it('should return undefined for invalid input', () => {
            expect(parseTwilioCreateMessageSender(INVALID_SENDER)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageSenderOrUndefined', () => {
        it('should return true for valid From input', () => {
            expect(isTwilioCreateMessageSenderOrUndefined(VALID_FROM)).toBeTruthy();
        });

        it('should return true for valid MessagingServiceSid input', () => {
            expect(isTwilioCreateMessageSenderOrUndefined(VALID_MESSAGING_SERVICE_SID)).toBeTruthy();
        });

        it('should return true for undefined', () => {
            expect(isTwilioCreateMessageSenderOrUndefined(undefined)).toBeTruthy();
        });

        it('should return false for invalid non-undefined input', () => {
            expect(isTwilioCreateMessageSenderOrUndefined(INVALID_SENDER)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageSenderOrUndefined', () => {
        it('should return OK for valid From input', () => {
            expect(explainTwilioCreateMessageSenderOrUndefined(VALID_FROM)).toBe('OK');
        });

        it('should return OK for valid MessagingServiceSid input', () => {
            expect(explainTwilioCreateMessageSenderOrUndefined(VALID_MESSAGING_SERVICE_SID)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            expect(explainTwilioCreateMessageSenderOrUndefined(undefined)).toBe('OK');
        });

        it('should return error string for invalid non-undefined input', () => {
            expect(explainTwilioCreateMessageSenderOrUndefined(INVALID_SENDER)).not.toBe('OK');
        });
    });

});
