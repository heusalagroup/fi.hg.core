// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ArgumentType } from "../types/ArgumentType";
import { parseArgumentWithParam } from "./parseArgumentWithParam";
import { UserDefinedArgumentType } from "../types/UserDefinedArgumentType";
import { UserDefinedParserMap } from "../types/UserDefinedParserMap";

/**
 * Parses command line arguments like `--foo` which do not have value.
 *
 * @param argName The full argument string, e.g. `--foo`
 * @param type The type of argument, e.g. `ArgumentType.BOOLEAN` or a name of a
 *             custom type.
 * @param parserMap User defined parsers for custom types
 */
export function parseSingleArgument (
    argName: string,
    type: UserDefinedArgumentType,
    parserMap: UserDefinedParserMap | undefined,
): number | boolean | string {
    return parseArgumentWithParam( argName, type, type === ArgumentType.BOOLEAN ? 'true' : '', parserMap );
}
