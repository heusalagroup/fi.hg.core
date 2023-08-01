// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export const enum ShortCommandArgument {
    HELP          = '-h',
    VERSION       = '-v'
}

export const enum LongCommandArgument {
    HELP                     = '--help',
    VERSION                  = '--version',
    DISABLE_ARGUMENT_PARSING = '--'
}

export const enum CommandArgumentType {
    HELP,
    VERSION,
    DISABLE_ARGUMENT_PARSING
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseCommandArgumentType (value : any) : CommandArgumentType | undefined {

    switch (value) {

        case ShortCommandArgument.HELP:
        case LongCommandArgument.HELP:
        case CommandArgumentType.HELP:
            return CommandArgumentType.HELP;

        case ShortCommandArgument.VERSION:
        case LongCommandArgument.VERSION:
        case CommandArgumentType.VERSION:
            return CommandArgumentType.VERSION;

        case LongCommandArgument.DISABLE_ARGUMENT_PARSING:
        case CommandArgumentType.DISABLE_ARGUMENT_PARSING:
            return CommandArgumentType.DISABLE_ARGUMENT_PARSING;

    }

    return undefined;
}
