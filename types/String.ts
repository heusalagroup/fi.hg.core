// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { default as _isString } from "lodash/isString";
import { isUndefined } from "./undefined";
import { explainNot, explainOk, explainOr } from "./explain";
import { isNull } from "lodash";

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
export function isStringOrFalse (value: unknown): value is string | false {
    return isString(value) || (value === false);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNonEmptyString (value: unknown): value is string {
    return _isString(value) && !!value;
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
 * @__PURE__
 * @nosideeffects
 */
export function explainStringOrFalse (value: any): string {
    return isStringOrFalse(value) ? explainOk() : explainNot(explainOr(['string', 'false']));
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNonEmptyString (value: any): string {
    return isNonEmptyString(value) ? explainOk() : explainNot('non-empty string');
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
 * @__PURE__
 * @nosideeffects
 */
export function isStringOrNullOrUndefined (value: unknown): value is string | undefined | null {
    return isNull(value) || isUndefined(value) || isString(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainStringOrNullOrUndefined (value: any): string {
    return isStringOrNullOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'string', 'null', 'undefined' ]));
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isStringOrNull (value: unknown): value is string | null {
    return isNull(value) || isString(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainStringOrNull (value: any): string {
    return isStringOrNull(value) ? explainOk() : explainNot(explainOr([ 'string', 'null' ]));
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
