// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "./explain";
import { trim } from "../functions/trim";
import { default as _isSafeInteger } from "lodash/isSafeInteger";
import { isUndefined } from "./undefined";
import { isNull } from "./Null";

// These are required to overcome circular references
import _isString from "lodash/isString";
import _isInteger from "lodash/isInteger";
import _isNumber from "lodash/isNumber";
import _toSafeInteger from "lodash/toSafeInteger";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function toSafeInteger (value: unknown): number {
    return _toSafeInteger(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumber (value: unknown): value is number {
    return _isNumber(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumber (value: any): string {
    return isNumber(value) ? explainOk() : explainNot('number');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberOrUndefined (value: unknown): value is number | undefined {
    return isUndefined(value) || isNumber(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberOrUndefined (value: any): string {
    return isNumberOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'number', 'undefined' ]));
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberOrNullOrUndefined (value: unknown): value is number | null | undefined {
    return isUndefined(value) || isNull(value) || isNumber(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberOrNullOrUndefined (value: any): string {
    return isNumberOrNullOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'number', 'null', 'undefined' ]));
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberOrNull (value: unknown): value is number | null {
    return isNull(value) || isNumber(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberOrNull (value: any): string {
    return isNumberOrNull(value) ? explainOk() : explainNot(explainOr([ 'number', 'null' ]));
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseInteger (value: any): number | undefined {
    if ( value === undefined ) return undefined;
    if ( value === null ) return undefined;
    if ( isSafeInteger(value) ) return value;
    if ( _isString(value) ) {
        value = trim(value);
        if ( value.length === 0 ) return undefined;
    }
    const parsedValue = toSafeInteger(value);
    return isSafeInteger(parsedValue) && parsedValue.toFixed(0) === value ? parsedValue : undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isInteger (value: unknown): value is number {
    return _isInteger(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainInteger (value: any): string {
    return isInteger(value) ? explainOk() : explainNot('integer');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isIntegerOrUndefined (value: unknown): value is number | undefined {
    return isUndefined(value) || _isInteger(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainIntegerOrUndefined (value: any): string {
    return isInteger(value) ? explainOk() : explainNot(explainOr([ 'integer', 'undefined' ]));
}

/**
 *
 * @param value
 * @param rangeStart
 * @param rangeEnd
 * @__PURE__
 * @nosideeffects
 */
export function isIntegerOf (
    value: any,
    rangeStart: number | undefined = undefined,
    rangeEnd: number | undefined = undefined
): value is number {

    if ( !_isInteger(value) ) return false;

    if ( rangeStart !== undefined && value < rangeStart ) {
        return false;
    }

    if ( rangeEnd !== undefined && value > rangeEnd ) {
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
export function isSafeInteger (value: unknown): value is number {
    return _isSafeInteger(value);
}

/**
 *
 * @param value
 * @param rangeStart
 * @param rangeEnd
 * @__PURE__
 * @nosideeffects
 */
export function isSafeIntegerOf (
    value: any,
    rangeStart: number | undefined = undefined,
    rangeEnd: number | undefined = undefined
): value is number {

    if ( !_isSafeInteger(value) ) return false;

    if ( rangeStart !== undefined && value < rangeStart ) {
        return false;
    }

    if ( rangeEnd !== undefined && value > rangeEnd ) {
        return false;
    }

    return true;

}
