// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ShortCommandArgument, LongCommandArgument, CommandArgumentType, parseCommandArgumentType } from './CommandArgumentType';

describe('CommandArgumentType', () => {

    describe('parseCommandArgumentType', () => {

        it('should return correct CommandArgumentType for valid inputs', () => {
            expect(parseCommandArgumentType(ShortCommandArgument.HELP)).toEqual(CommandArgumentType.HELP);
            expect(parseCommandArgumentType(LongCommandArgument.HELP)).toEqual(CommandArgumentType.HELP);
            expect(parseCommandArgumentType(CommandArgumentType.HELP)).toEqual(CommandArgumentType.HELP);

            expect(parseCommandArgumentType(ShortCommandArgument.VERSION)).toEqual(CommandArgumentType.VERSION);
            expect(parseCommandArgumentType(LongCommandArgument.VERSION)).toEqual(CommandArgumentType.VERSION);
            expect(parseCommandArgumentType(CommandArgumentType.VERSION)).toEqual(CommandArgumentType.VERSION);

            expect(parseCommandArgumentType(LongCommandArgument.DISABLE_ARGUMENT_PARSING)).toEqual(CommandArgumentType.DISABLE_ARGUMENT_PARSING);
            expect(parseCommandArgumentType(CommandArgumentType.DISABLE_ARGUMENT_PARSING)).toEqual(CommandArgumentType.DISABLE_ARGUMENT_PARSING);
        });

        it('should return undefined for invalid inputs', () => {
            expect(parseCommandArgumentType('-invalid')).toBeUndefined();
            expect(parseCommandArgumentType('--invalid')).toBeUndefined();
            expect(parseCommandArgumentType('INVALID')).toBeUndefined();
            // test other invalid inputs...
        });

    });

});
