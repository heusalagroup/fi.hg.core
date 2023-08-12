// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "./explain";
import { TestCallback, TestCallbackOf } from "./TestCallback";
import { default as _isObject } from "lodash/isObject";
import { isUndefined } from "./undefined";
import { everyKey, explainEveryKey } from "../functions/everyKey";
import { everyProperty, explainEveryProperty } from "../functions/everyProperty";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isObject (value: any): value is { [P in string]: any } {
    return _isObject(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainObject (value: any): string {
    return isObject(value) ? explainOk() : 'not object';
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isObjectOrUndefined (value: any): value is { [P in string]: any } | undefined {
    return _isObject(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainObjectOrUndefined (value: any): string {
    return isObjectOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'object', 'undefined' ]));
}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function isObjectOf<K extends string = string, T = any> (
    value: any,
    isKey: TestCallback | undefined = undefined,
    isItem: TestCallback | undefined = undefined
): value is { [P in K]: T } {

    if ( isKey === undefined ) {
        return _isObject(value);
    }

    if ( isItem === undefined ) {
        return everyKey<K>(value, isKey);
    }

    return everyProperty<K, T>(value, isKey, isItem);

}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @param keyTypeName
 * @param itemTypeName
 * @__PURE__
 * @nosideeffects
 */
export function explainObjectOf<K extends string = string, T = any> (
    value: any,
    isKey: TestCallbackOf<K> | undefined = undefined,
    isItem: TestCallbackOf<T> | undefined = undefined,
    keyTypeName: string,
): string {
    if ( isObjectOf<K>(value, isKey, isItem) ) {
        return explainOk();
    }
    if ( isKey === undefined ) {
        return explainObject(value);
    }
    if ( isItem === undefined ) {
        return explainEveryKey<K>(value, isKey, keyTypeName);
    }
    return explainEveryProperty<K, T>(value, isKey, isItem);
}
