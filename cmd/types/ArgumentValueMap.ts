// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * User defined arguments and parsed values.
 *
 * @example
 *     {
 *         "bar": 123,
 *         "feature": true
 *     }
 */
export interface ArgumentValueMap {
    [key: string]: string | boolean | number;
}
