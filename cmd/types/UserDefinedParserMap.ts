// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { UserDefinedParser } from "./UserDefinedParser";

/**
 * User defined custom types.
 *
 * @example
 *     {
 *         "bigint": (value: unknown) : string | undefined => BigInt.parse(value)
 *     }
 */
export interface UserDefinedParserMap {
    [key: string]: UserDefinedParser;
}
