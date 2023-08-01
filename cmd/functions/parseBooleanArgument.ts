// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainBoolean, parseBoolean } from "../../types/Boolean";

/**
 * Parses a command line argument with a type of boolean.
 *
 * @example
 *     parseBooleanArgument('--foo', 'true') === true
 *
 * @param argName The full argument name, e.g. `--foo=true`.
 * @param value The argument value, e.g. `true` from `--foo=true`.
 * @throw TypeError if could not parse the argument.
 */
export function parseBooleanArgument (
    argName: string,
    value: string,
): boolean {
    const output: boolean | undefined = parseBoolean( value );
    if ( output === undefined ) {
        throw new TypeError( `Argument ${argName}: Not a boolean: ${explainBoolean( value )}` );
    }
    return output;
}
