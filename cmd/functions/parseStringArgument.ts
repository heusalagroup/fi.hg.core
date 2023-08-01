// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, parseString } from "../../types/String";

/**
 * Parses a command line argument with a type of string.
 *
 * @example
 *     parseStringArgument('--foo', 'bar') === 'bar'
 *
 * @param argName The full argument, e.g. `--foo=bar`.
 * @param value The argument value, e.g. `bar` from `--foo=bar`.
 * @throw TypeError if could not parse the argument.
 */
export function parseStringArgument (
    argName: string,
    value: string,
): string {
    const output: string | undefined = parseString( value );
    if ( output === undefined ) {
        throw new TypeError( `Argument ${argName}: Not a string: ${explainString(value)}` );
    }
    return output;
}
