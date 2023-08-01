// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainInteger, parseInteger } from "../../types/Number";

/**
 * Parses a command line argument with a type of integer.
 *
 * @example
 *     parseIntegerArgument('--foo', '13') === 13
 *
 * @param argName The full argument, e.g. `--foo=13`
 * @param value The argument value, e.g. `13` from `--foo=13`.
 * @throw TypeError if could not parse the argument.
 */
export function parseIntegerArgument (
    argName: string,
    value: string,
): number {
    const output: number | undefined = parseInteger( value );
    if ( output === undefined ) {
        throw new TypeError( `Argument ${argName}: ${explainInteger( value )}` );
    }
    return output;
}
