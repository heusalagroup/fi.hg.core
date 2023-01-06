// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallback, TestCallbackNonStandardOf } from "./TestCallback";
import { isString } from "./String";
import { default as _isObject } from "lodash/isObject";
import { isFunction } from "./Function";
import { isArray } from "./Array";
import { ExplainCallback } from "./ExplainCallback";
import { explainNot, explainOk, explainOr } from "./explain";
import { assertEveryProperty, everyProperty } from "../functions/everyProperty";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isRegularObject (
    value: any
): value is { [P in string]: any } {

    if ( !_isObject(value) ) return false;
    if ( value instanceof Date ) return false;
    if ( isFunction(value) ) return false;
    if ( isArray(value) ) return false;

    return everyProperty<string, any>(value, isString, undefined);

}

export function explainRegularObject (value: any) {
    return isRegularObject(value) ? explainOk() : 'not regular object';
}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function isRegularObjectOf<K extends keyof any = string, T = any> (
    value: any,
    isKey: TestCallback = isString,
    isItem: TestCallback | undefined = undefined
): value is { [P in K]: T } {

    if ( !_isObject(value) ) return false;
    if ( value instanceof Date ) return false;
    if ( isFunction(value) ) return false;
    if ( isArray(value) ) return false;

    return everyProperty<K, T>(value, isKey, isItem);

}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @param explainKey
 * @param explainValue
 * @__PURE__
 * @nosideeffects
 */
export function assertRegularObjectOf<K extends keyof any = string,
    T = any> (
    value: any,
    isKey: TestCallbackNonStandardOf<K> | undefined = undefined,
    isItem: TestCallbackNonStandardOf<T> | undefined = undefined,
    explainKey: ExplainCallback | undefined = undefined,
    explainValue: ExplainCallback | undefined = undefined
): void {

    const isKeyTest: TestCallbackNonStandardOf<K> = isKey === undefined ? isString as TestCallbackNonStandardOf<K> : isKey;

    if ( !_isObject(value) ) {
        throw new TypeError(`value was not object`);
    }

    if ( value instanceof Date ) {
        throw new TypeError(`value was Date`);
    }

    if ( isFunction(value) ) {
        throw new TypeError(`value was Function`);
    }

    if ( isArray(value) ) {
        throw new TypeError(`value was array`);
    }

    assertEveryProperty<K, T>(value, isKeyTest, isItem, explainKey, explainValue);

}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @param explainKey
 * @param explainValue
 * @__PURE__
 * @nosideeffects
 */
export function explainRegularObjectOf<K extends keyof any = string,
    T = any> (
    value: any,
    isKey: TestCallbackNonStandardOf<K> | undefined = undefined,
    isItem: TestCallbackNonStandardOf<T> | undefined = undefined,
    explainKey: ExplainCallback | undefined = undefined,
    explainValue: ExplainCallback | undefined = undefined
) {
    try {
        assertRegularObjectOf<K, T>(value, isKey, isItem, explainKey, explainValue);
        return explainOk();
    } catch (err: any) {
        return err?.message ?? `${err}`;
    }
}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function isRegularObjectOrUndefinedOf<K extends keyof any = string, T = any> (
    value: any,
    isKey: TestCallback = isString,
    isItem: TestCallback | undefined = undefined
): value is ({ [P in K]: T } | undefined) {

    if ( value === undefined ) return true;

    return isRegularObjectOf<K, T>(value, isKey, isItem);

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isRegularObjectOrUndefined (value: unknown): value is ({ [P in string]: any } | undefined) {

    if ( value === undefined ) return true;

    return isRegularObjectOf<string, any>(value, isString, undefined);

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainRegularObjectOrUndefined (value: any): string {
    return isRegularObjectOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'regular object', 'undefined' ]));
}
