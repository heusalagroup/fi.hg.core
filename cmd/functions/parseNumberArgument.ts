// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { NumberUtils } from "../../NumberUtils";

/**
 * Parses a command line argument with a type of number.
 *
 * @example
 *     parseNumberArgument('--foo', '13.45') === 13.45
 *
 * @param argName The full argument, e.g. `--foo=13.45`
 * @param value The argument value, e.g. `13.45` from `--foo=13.45`.
 * @throw TypeError if could not parse the argument.
 */
export function parseNumberArgument (
    argName: string,
    value: string,
): number {
    const output: number | undefined = NumberUtils.parseNumber( value );
    if ( output === undefined ) {
        throw new TypeError( `Argument ${argName}: Not a number: ${value}` );
    }
    return output;
}
