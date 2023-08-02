// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    createTwilioCreateMessageMessagingServiceSid,
    isTwilioCreateMessageMessagingServiceSid,
    explainTwilioCreateMessageMessagingServiceSid,
    parseTwilioCreateMessageMessagingServiceSid,
    isTwilioCreateMessageMessagingServiceSidOrUndefined,
    explainTwilioCreateMessageMessagingServiceSidOrUndefined
} from './TwilioCreateMessageMessagingServiceSid'; // Assumed your functions are in this file

const VALID_VALUE = 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const INVALID_VALUE = 1235; // An invalid value (Add more invalid cases as per your requirements)

describe('TwilioCreateMessageMessagingServiceSid', () => {

    describe('createTwilioCreateMessageMessagingServiceSid', () => {
        it('should create a valid object', () => {
            const result = createTwilioCreateMessageMessagingServiceSid(VALID_VALUE);
            expect(result).toEqual({ MessagingServiceSid: VALID_VALUE });
        });
    });

    describe('isTwilioCreateMessageMessagingServiceSid', () => {
        it('should return true for valid input', () => {
            const input = { MessagingServiceSid: VALID_VALUE };
            expect(isTwilioCreateMessageMessagingServiceSid(input)).toBeTruthy();
        });

        it('should return false for invalid input', () => {
            const input = { MessagingServiceSid: INVALID_VALUE };
            expect(isTwilioCreateMessageMessagingServiceSid(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageMessagingServiceSid', () => {
        it('should return OK for valid input', () => {
            const input = { MessagingServiceSid: VALID_VALUE };
            expect(explainTwilioCreateMessageMessagingServiceSid(input)).toBe('OK');
        });

        it('should return error string for invalid input', () => {
            const input = { MessagingServiceSid: INVALID_VALUE };
            expect(explainTwilioCreateMessageMessagingServiceSid(input)).not.toBe('OK');
        });
    });

    describe('parseTwilioCreateMessageMessagingServiceSid', () => {
        it('should return value for valid input', () => {
            const input = { MessagingServiceSid: VALID_VALUE };
            expect(parseTwilioCreateMessageMessagingServiceSid(input)).toEqual(input);
        });

        it('should return undefined for invalid input', () => {
            const input = { MessagingServiceSid: INVALID_VALUE };
            expect(parseTwilioCreateMessageMessagingServiceSid(input)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageMessagingServiceSidOrUndefined', () => {
        it('should return true for valid input', () => {
            const input = { MessagingServiceSid: VALID_VALUE };
            expect(isTwilioCreateMessageMessagingServiceSidOrUndefined(input)).toBeTruthy();
        });

        it('should return true for undefined', () => {
            const input = undefined;
            expect(isTwilioCreateMessageMessagingServiceSidOrUndefined(input)).toBeTruthy();
        });

        it('should return false for invalid non-undefined input', () => {
            const input = { MessagingServiceSid: INVALID_VALUE };
            expect(isTwilioCreateMessageMessagingServiceSidOrUndefined(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageMessagingServiceSidOrUndefined', () => {
        it('should return OK for valid input', () => {
            const input = { MessagingServiceSid: VALID_VALUE };
            expect(explainTwilioCreateMessageMessagingServiceSidOrUndefined(input)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            const input = undefined;
            expect(explainTwilioCreateMessageMessagingServiceSidOrUndefined(input)).toBe('OK');
        });

        it('should return error string for invalid non-undefined input', () => {
            const input = { MessagingServiceSid: INVALID_VALUE };
            expect(explainTwilioCreateMessageMessagingServiceSidOrUndefined(input)).not.toBe('OK');
        });
    });

});
