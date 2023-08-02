// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    createTwilioCreateMessageFrom,
    isTwilioCreateMessageFrom,
    explainTwilioCreateMessageFrom,
    parseTwilioCreateMessageFrom,
    isTwilioCreateMessageFromOrUndefined,
    explainTwilioCreateMessageFromOrUndefined
} from './TwilioCreateMessageFrom'; // Assumed your functions are in this file

const VALID_FROM = '+15557122661';
const INVALID_FROM = 1235; // An invalid value (Add more invalid cases as per your requirements)

describe('TwilioCreateMessageFrom', () => {

    describe('createTwilioCreateMessageFrom', () => {
        it('should create a valid object', () => {
            const result = createTwilioCreateMessageFrom(VALID_FROM);
            expect(result).toEqual({ From: VALID_FROM });
        });
    });

    describe('isTwilioCreateMessageFrom', () => {
        it('should return true for valid input', () => {
            const input = { From: VALID_FROM };
            expect(isTwilioCreateMessageFrom(input)).toBeTruthy();
        });

        it('should return false for invalid input', () => {
            const input = { From: INVALID_FROM };
            expect(isTwilioCreateMessageFrom(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageFrom', () => {
        it('should return OK for valid input', () => {
            const input = { From: VALID_FROM };
            expect(explainTwilioCreateMessageFrom(input)).toBe('OK');
        });

        it('should return error string for invalid input', () => {
            const input = { From: INVALID_FROM };
            expect(explainTwilioCreateMessageFrom(input)).not.toBe('OK');
        });
    });

    describe('parseTwilioCreateMessageFrom', () => {
        it('should return value for valid input', () => {
            const input = { From: VALID_FROM };
            expect(parseTwilioCreateMessageFrom(input)).toEqual(input);
        });

        it('should return undefined for invalid input', () => {
            const input = { From: INVALID_FROM };
            expect(parseTwilioCreateMessageFrom(input)).toBeUndefined();
        });
    });

    describe('isTwilioCreateMessageFromOrUndefined', () => {
        it('should return true for valid input', () => {
            const input = { From: VALID_FROM };
            expect(isTwilioCreateMessageFromOrUndefined(input)).toBeTruthy();
        });

        it('should return true for undefined', () => {
            const input = undefined;
            expect(isTwilioCreateMessageFromOrUndefined(input)).toBeTruthy();
        });

        it('should return false for invalid non-undefined input', () => {
            const input = { From: INVALID_FROM };
            expect(isTwilioCreateMessageFromOrUndefined(input)).toBeFalsy();
        });
    });

    describe('explainTwilioCreateMessageFromOrUndefined', () => {
        it('should return OK for valid input', () => {
            const input = { From: VALID_FROM };
            expect(explainTwilioCreateMessageFromOrUndefined(input)).toBe('OK');
        });

        it('should return OK for undefined', () => {
            const input = undefined;
            expect(explainTwilioCreateMessageFromOrUndefined(input)).toBe('OK');
        });

        it('should return error string for invalid non-undefined input', () => {
            const input = { From: INVALID_FROM };
            expect(explainTwilioCreateMessageFromOrUndefined(input)).not.toBe('OK');
        });
    });

});
