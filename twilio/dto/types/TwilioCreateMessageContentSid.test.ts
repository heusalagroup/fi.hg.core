// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    createTwilioCreateMessageContentSid,
    isTwilioCreateMessageContentSid,
    explainTwilioCreateMessageContentSid,
    parseTwilioCreateMessageContentSid,
    isTwilioCreateMessageContentSidOrUndefined,
    explainTwilioCreateMessageContentSidOrUndefined
} from './TwilioCreateMessageContentSid'; // Assumed your functions are in this file

const VALID_VALUE = 'Hi there';
const INVALID_VALUE = 1235; // An invalid value (Add more invalid cases as per your requirements)

describe('TwilioCreateMessageContentSid', () => {

    describe('createTwilioCreateMessageContentSid', () => {
        it('should create a valid object', () => {
            const result = createTwilioCreateMessageContentSid(VALID_VALUE);
            expect(result).toEqual({ ContentSid: VALID_VALUE });
        });
    });

    describe('isTwilioCreateMessageContentSid', () => {
        it('should return true for valid input', () => {
            const input = { ContentSid: VALID_VALUE };
            expect(isTwilioCreateMessageContentSid(input)).toBeTruthy();
        });

        it('should return false for invalid input', () => {
            const input = { ContentSid: INVALID_VALUE };
            expect(isTwilioCreateMessageContentSid(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageContentSid', () => {
        it('should return OK for valid input', () => {
            const input = { ContentSid: VALID_VALUE };
            expect(explainTwilioCreateMessageContentSid(input)).toBe('OK');
        });

        it('should return error string for invalid input', () => {
            const input = { ContentSid: INVALID_VALUE };
            expect(explainTwilioCreateMessageContentSid(input)).not.toBe('OK');
        });
    });

    describe('parseTwilioCreateMessageContentSid', () => {
        it('should return value for valid input', () => {
            const input = { ContentSid: VALID_VALUE };
            expect(parseTwilioCreateMessageContentSid(input)).toEqual(input);
        });

        it('should return undefined for invalid input', () => {
            const input = { ContentSid: INVALID_VALUE };
            expect(parseTwilioCreateMessageContentSid(input)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageContentSidOrUndefined', () => {
        it('should return true for valid input', () => {
            const input = { ContentSid: VALID_VALUE };
            expect(isTwilioCreateMessageContentSidOrUndefined(input)).toBeTruthy();
        });

        it('should return true for undefined', () => {
            const input = undefined;
            expect(isTwilioCreateMessageContentSidOrUndefined(input)).toBeTruthy();
        });

        it('should return false for invalid non-undefined input', () => {
            const input = { ContentSid: INVALID_VALUE };
            expect(isTwilioCreateMessageContentSidOrUndefined(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageContentSidOrUndefined', () => {
        it('should return OK for valid input', () => {
            const input = { ContentSid: VALID_VALUE };
            expect(explainTwilioCreateMessageContentSidOrUndefined(input)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            const input = undefined;
            expect(explainTwilioCreateMessageContentSidOrUndefined(input)).toBe('OK');
        });

        it('should return error string for invalid non-undefined input', () => {
            const input = { ContentSid: INVALID_VALUE };
            expect(explainTwilioCreateMessageContentSidOrUndefined(input)).not.toBe('OK');
        });
    });

});
