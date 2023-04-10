// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isUndefined } from "./undefined";
import isBoolean from "lodash/isBoolean";
import { explainOk } from "./explain";
import { isNull } from "./Null";

export {default as isBoolean} from 'lodash/isBoolean.js';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainBoolean (value: unknown): string {
    return isBoolean(value) ? explainOk() : 'not boolean';
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseBoolean (value: any): boolean | undefined {
    if ( value === undefined || value === '' ) return undefined;
    if ( isBoolean(value) ) return value;
    return [ "true", "t", "on", "1", "enabled" ].includes(`${value}`.toLowerCase());
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isBooleanOrUndefined (value: unknown): value is boolean | undefined {
    return isUndefined(value) || isBoolean(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainBooleanOrUndefined (value: unknown): string {
    return isBooleanOrUndefined(value) ? explainOk() : 'not boolean or undefined';
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isBooleanOrNullOrUndefined (value: unknown): value is boolean | undefined | null {
    return isUndefined(value) || isNull(value) || isBoolean(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainBooleanOrNullOrUndefined (value: unknown): string {
    return isBooleanOrNullOrUndefined(value) ? explainOk() : 'not boolean or undefined or null';
}

