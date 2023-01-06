// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallback, TestCallbackNonStandardOf, TestCallbackOf } from "../types/TestCallback";
import { isString } from "../types/String";
import { everyValue } from "./everyValue";
import { everyKey, explainEveryKey } from "./everyKey";
import { ExplainCallback } from "../types/ExplainCallback";
import { values } from "./values";
import { findIndex } from "./findIndex";
import { keys } from "./keys";
import { find } from "./find";

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function everyProperty<K extends keyof any = string, T = any> (
    value: any,
    isKey: TestCallback | undefined = isString,
    isItem: TestCallback | undefined = undefined
): value is { [P in K]: T } {
    if ( isItem !== undefined && !everyValue<T>(value, isItem) ) {
        return false;
    }
    if ( isKey !== undefined ) {
        return everyKey<K>(value, isKey);
    }
    return everyKey<K>(value, isString);
}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function explainEveryProperty<K extends keyof any = string, T = any> (
    value: any,
    isKey: TestCallbackOf<K> | TestCallbackOf<string> | undefined = isString,
    isItem: TestCallbackOf<T> | undefined = undefined
): string {
    if ( isItem !== undefined && !everyValue<T>(value, isItem) ) {
        return 'values were not correct';
    }
    if ( isKey !== undefined ) {
        return explainEveryKey<K>(value, isKey, "T");
    }
    return explainEveryKey<K>(value, isString, "string");
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
export function assertEveryProperty<K extends keyof any = string,
    T = any> (
    value: any,
    isKey: TestCallbackNonStandardOf<K> | undefined = undefined,
    isItem: TestCallbackNonStandardOf<T> | undefined = undefined,
    explainKey: ExplainCallback | undefined = undefined,
    explainValue: ExplainCallback | undefined = undefined
): void {

    const isKeyTest: TestCallbackNonStandardOf<K> = isKey === undefined ? isString as TestCallbackNonStandardOf<K> : isKey;

    if ( isItem !== undefined && !everyValue<T>(value, (item: T): boolean => isItem(item)) ) {

        const valueArray: T[] = values(value);
        const itemIndex: number = findIndex(valueArray, (item: T): boolean => !isItem(item));
        const itemKey: string | Symbol | number = keys(value)[itemIndex];
        const itemValue: T = valueArray[itemIndex];
        if ( explainValue ) {
            throw new TypeError(`Property "${itemKey}": value not correct: ${explainValue(itemValue)}`);
        } else {
            throw new TypeError(`Property "${itemKey}": value not correct: ${JSON.stringify(itemValue, null, 2)}`);
        }

    }

    const key: string | Symbol | number | undefined = find(keys(value), (key: Symbol | string | number): boolean => !isKeyTest(key));

    if ( explainKey ) {
        throw new TypeError(`Property "${key}": key was not correct: ${explainKey(key)}`);
    } else {
        throw new TypeError(`Property "${key}": key was not correct: ${JSON.stringify(key, null, 2)}`);
    }

}
