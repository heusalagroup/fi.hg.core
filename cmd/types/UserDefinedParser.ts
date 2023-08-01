// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * User defined custom type parser.
 *
 * @example
 *     (value: unknown) : string | undefined => BigInt.parse(value)
 */
export interface UserDefinedParser<T = any> {
    (value: unknown): T | undefined;
}
