// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    createTwilioCreateMessageBody,
    isTwilioCreateMessageBody,
    explainTwilioCreateMessageBody,
    parseTwilioCreateMessageBody,
    isTwilioCreateMessageBodyOrUndefined,
    explainTwilioCreateMessageBodyOrUndefined
} from './TwilioCreateMessageBody'; // Assumed your functions are in this file

const VALID_VALUE = 'Hi there';
const INVALID_VALUE = 1235; // An invalid value (Add more invalid cases as per your requirements)

describe('TwilioCreateMessageBody', () => {

    describe('createTwilioCreateMessageBody', () => {
        it('should create a valid object', () => {
            const result = createTwilioCreateMessageBody(VALID_VALUE);
            expect(result).toEqual({ Body: VALID_VALUE });
        });
    });

    describe('isTwilioCreateMessageBody', () => {
        it('should return true for valid input', () => {
            const input = { Body: VALID_VALUE };
            expect(isTwilioCreateMessageBody(input)).toBeTruthy();
        });

        it('should return false for invalid input', () => {
            const input = { Body: INVALID_VALUE };
            expect(isTwilioCreateMessageBody(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageBody', () => {
        it('should return OK for valid input', () => {
            const input = { Body: VALID_VALUE };
            expect(explainTwilioCreateMessageBody(input)).toBe('OK');
        });

        it('should return error string for invalid input', () => {
            const input = { Body: INVALID_VALUE };
            expect(explainTwilioCreateMessageBody(input)).not.toBe('OK');
        });
    });

    describe('parseTwilioCreateMessageBody', () => {
        it('should return value for valid input', () => {
            const input = { Body: VALID_VALUE };
            expect(parseTwilioCreateMessageBody(input)).toEqual(input);
        });

        it('should return undefined for invalid input', () => {
            const input = { Body: INVALID_VALUE };
            expect(parseTwilioCreateMessageBody(input)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageBodyOrUndefined', () => {
        it('should return true for valid input', () => {
            const input = { Body: VALID_VALUE };
            expect(isTwilioCreateMessageBodyOrUndefined(input)).toBeTruthy();
        });

        it('should return true for undefined', () => {
            const input = undefined;
            expect(isTwilioCreateMessageBodyOrUndefined(input)).toBeTruthy();
        });

        it('should return false for invalid non-undefined input', () => {
            const input = { Body: INVALID_VALUE };
            expect(isTwilioCreateMessageBodyOrUndefined(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageBodyOrUndefined', () => {
        it('should return OK for valid input', () => {
            const input = { Body: VALID_VALUE };
            expect(explainTwilioCreateMessageBodyOrUndefined(input)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            const input = undefined;
            expect(explainTwilioCreateMessageBodyOrUndefined(input)).toBe('OK');
        });

        it('should return error string for invalid non-undefined input', () => {
            const input = { Body: INVALID_VALUE };
            expect(explainTwilioCreateMessageBodyOrUndefined(input)).not.toBe('OK');
        });
    });

});
