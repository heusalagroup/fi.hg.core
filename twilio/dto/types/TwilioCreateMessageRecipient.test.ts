// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    createTwilioCreateMessageRecipient,
    isTwilioCreateMessageRecipient,
    explainTwilioCreateMessageRecipient,
    parseTwilioCreateMessageRecipient,
    isTwilioCreateMessageRecipientOrUndefined,
    explainTwilioCreateMessageRecipientOrUndefined
} from './TwilioCreateMessageRecipient'; // Assumed your functions are in this file

const VALID_VALUE = '+15558675310';
const INVALID_VALUE = 1235; // An invalid value (Add more invalid cases as per your requirements)

describe('TwilioCreateMessageRecipient', () => {

    describe('createTwilioCreateMessageRecipient', () => {
        it('should create a valid object', () => {
            const result = createTwilioCreateMessageRecipient(VALID_VALUE);
            expect(result).toEqual({ To: VALID_VALUE });
        });
    });

    describe('isTwilioCreateMessageRecipient', () => {
        it('should return true for valid input', () => {
            const input = { To: VALID_VALUE };
            expect(isTwilioCreateMessageRecipient(input)).toBeTruthy();
        });

        it('should return false for invalid input', () => {
            const input = { To: INVALID_VALUE };
            expect(isTwilioCreateMessageRecipient(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageRecipient', () => {
        it('should return OK for valid input', () => {
            const input = { To: VALID_VALUE };
            expect(explainTwilioCreateMessageRecipient(input)).toBe('OK');
        });

        it('should return error string for invalid input', () => {
            const input = { To: INVALID_VALUE };
            expect(explainTwilioCreateMessageRecipient(input)).not.toBe('OK');
        });
    });

    describe('parseTwilioCreateMessageRecipient', () => {
        it('should return value for valid input', () => {
            const input = { To: VALID_VALUE };
            expect(parseTwilioCreateMessageRecipient(input)).toEqual(input);
        });

        it('should return undefined for invalid input', () => {
            const input = { To: INVALID_VALUE };
            expect(parseTwilioCreateMessageRecipient(input)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageRecipientOrUndefined', () => {
        it('should return true for valid input', () => {
            const input = { To: VALID_VALUE };
            expect(isTwilioCreateMessageRecipientOrUndefined(input)).toBeTruthy();
        });

        it('should return true for undefined', () => {
            const input = undefined;
            expect(isTwilioCreateMessageRecipientOrUndefined(input)).toBeTruthy();
        });

        it('should return false for invalid non-undefined input', () => {
            const input = { To: INVALID_VALUE };
            expect(isTwilioCreateMessageRecipientOrUndefined(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageRecipientOrUndefined', () => {
        it('should return OK for valid input', () => {
            const input = { To: VALID_VALUE };
            expect(explainTwilioCreateMessageRecipientOrUndefined(input)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            const input = undefined;
            expect(explainTwilioCreateMessageRecipientOrUndefined(input)).toBe('OK');
        });

        it('should return error string for invalid non-undefined input', () => {
            const input = { To: INVALID_VALUE };
            expect(explainTwilioCreateMessageRecipientOrUndefined(input)).not.toBe('OK');
        });
    });

});
