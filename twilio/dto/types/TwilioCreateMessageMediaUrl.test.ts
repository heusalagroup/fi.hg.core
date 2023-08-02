// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    createTwilioCreateMessageMediaUrl,
    isTwilioCreateMessageMediaUrl,
    explainTwilioCreateMessageMediaUrl,
    parseTwilioCreateMessageMediaUrl,
    isTwilioCreateMessageMediaUrlOrUndefined,
    explainTwilioCreateMessageMediaUrlOrUndefined
} from './TwilioCreateMessageMediaUrl'; // Assumed your functions are in this file

const VALID_VALUE = 'Hi there';
const INVALID_VALUE = 1235; // An invalid value (Add more invalid cases as per your requirements)

describe('TwilioCreateMessageMediaUrl', () => {

    describe('createTwilioCreateMessageMediaUrl', () => {
        it('should create a valid object', () => {
            const result = createTwilioCreateMessageMediaUrl(VALID_VALUE);
            expect(result).toEqual({ MediaUrl: VALID_VALUE });
        });
    });

    describe('isTwilioCreateMessageMediaUrl', () => {
        it('should return true for valid input', () => {
            const input = { MediaUrl: VALID_VALUE };
            expect(isTwilioCreateMessageMediaUrl(input)).toBeTruthy();
        });

        it('should return false for invalid input', () => {
            const input = { MediaUrl: INVALID_VALUE };
            expect(isTwilioCreateMessageMediaUrl(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageMediaUrl', () => {
        it('should return OK for valid input', () => {
            const input = { MediaUrl: VALID_VALUE };
            expect(explainTwilioCreateMessageMediaUrl(input)).toBe('OK');
        });

        it('should return error string for invalid input', () => {
            const input = { MediaUrl: INVALID_VALUE };
            expect(explainTwilioCreateMessageMediaUrl(input)).not.toBe('OK');
        });
    });

    describe('parseTwilioCreateMessageMediaUrl', () => {
        it('should return value for valid input', () => {
            const input = { MediaUrl: VALID_VALUE };
            expect(parseTwilioCreateMessageMediaUrl(input)).toEqual(input);
        });

        it('should return undefined for invalid input', () => {
            const input = { MediaUrl: INVALID_VALUE };
            expect(parseTwilioCreateMessageMediaUrl(input)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageMediaUrlOrUndefined', () => {
        it('should return true for valid input', () => {
            const input = { MediaUrl: VALID_VALUE };
            expect(isTwilioCreateMessageMediaUrlOrUndefined(input)).toBeTruthy();
        });

        it('should return true for undefined', () => {
            const input = undefined;
            expect(isTwilioCreateMessageMediaUrlOrUndefined(input)).toBeTruthy();
        });

        it('should return false for invalid non-undefined input', () => {
            const input = { MediaUrl: INVALID_VALUE };
            expect(isTwilioCreateMessageMediaUrlOrUndefined(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageMediaUrlOrUndefined', () => {
        it('should return OK for valid input', () => {
            const input = { MediaUrl: VALID_VALUE };
            expect(explainTwilioCreateMessageMediaUrlOrUndefined(input)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            const input = undefined;
            expect(explainTwilioCreateMessageMediaUrlOrUndefined(input)).toBe('OK');
        });

        it('should return error string for invalid non-undefined input', () => {
            const input = { MediaUrl: INVALID_VALUE };
            expect(explainTwilioCreateMessageMediaUrlOrUndefined(input)).not.toBe('OK');
        });
    });

});
