// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { default as _isString } from "lodash/isString";
import { isUndefined } from "./undefined";
import { explainNot, explainOk, explainOr } from "./explain";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isString (value: unknown): value is string {
    return _isString(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainString (value: any): string {
    return isString(value) ? explainOk() : explainNot('string');
}

/**
 *
 * @param value
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isStringOf (
    value: any,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): value is string {

    if ( !_isString(value) ) return false;

    const len = value?.length ?? 0;

    if ( minLength !== undefined && len < minLength ) {
        return false;
    }

    if ( maxLength !== undefined && len > maxLength ) {
        return false;
    }

    return true;

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isStringOrUndefined (value: unknown): value is string | undefined {
    return isUndefined(value) || isString(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainStringOrUndefined (value: any): string {
    return isStringOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'string', 'undefined' ]));
}

/**
 *
 * @param value
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isStringOrUndefinedOf (
    value: any,
    minLength: number | undefined = undefined,
    maxLength: number | undefined = undefined
): value is string | undefined {
    return isUndefined(value) || isStringOf(value, minLength, maxLength);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseString (value: any): string | undefined {
    if ( value === undefined ) return undefined;
    return `${value}`;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseNonEmptyString (value: any): string | undefined {
    if ( value === undefined ) return undefined;
    if ( value === '' ) return undefined;
    return `${value}`;
}
