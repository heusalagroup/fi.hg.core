// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNonEmptyString, parseNonEmptyString } from "../../types/String";

/**
 * Parses a command line argument with a type of string.
 *
 * @example
 *     parseNonEmptyStringArgument('--foo', 'bar') === 'bar'
 *
 * @param argName The full argument name, e.g. `--foo=bar`.
 * @param value The argument value, e.g. `bar` from `--foo=bar`.
 * @throw TypeError if could not parse the argument.
 */
export function parseNonEmptyStringArgument (
    argName: string,
    value: string,
): string {
    const output: string | undefined = parseNonEmptyString( value );
    if ( output === undefined ) {
        throw new TypeError( `Argument ${argName}: Not a string: ${explainNonEmptyString( value )}` );
    }
    return output;
}
