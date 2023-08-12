// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ArgumentType } from "../types/ArgumentType";
import { parseBooleanArgument } from "./parseBooleanArgument";
import { parseStringArgument } from "./parseStringArgument";
import { parseNonEmptyStringArgument } from "./parseNonEmptyStringArgument";
import { parseNumberArgument } from "./parseNumberArgument";
import { parseIntegerArgument } from "./parseIntegerArgument";
import { has } from "../../functions/has";
import { isFunction } from "../../types/Function";
import { UserDefinedArgumentType } from "../types/UserDefinedArgumentType";
import { UserDefinedParserMap } from "../types/UserDefinedParserMap";

/**
 * Parses command line arguments like `--foo=bar`.
 *
 * @param argName The full argument string, e.g. `--foo=bar`
 * @param type The type of argument, e.g. `ArgumentType.STRING` or a name of a
 *             custom type.
 * @param value The value of the argument, e.g. `bar`
 * @param parserMap User defined parsers for custom types
 */
export function parseArgumentWithParam (
    argName: string,
    type: UserDefinedArgumentType,
    value: string,
    parserMap: UserDefinedParserMap | undefined,
): number | boolean | string {
    switch ( type ) {
        case ArgumentType.BOOLEAN:
            return parseBooleanArgument( argName, value );
        case ArgumentType.STRING:
            return parseStringArgument( argName, value );
        case ArgumentType.NON_EMPTY_STRING :
            return parseNonEmptyStringArgument( argName, value );
        case ArgumentType.NUMBER:
            return parseNumberArgument( argName, value );
        case ArgumentType.INTEGER:
            return parseIntegerArgument( argName, value );
    }
    if ( parserMap && has( parserMap, type ) && isFunction( parserMap[type] ) ) {
        return parserMap[type]( value );
    }
    throw new TypeError( `Unimplemented type: ${type.toString()}` );
}
