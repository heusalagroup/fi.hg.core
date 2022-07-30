// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import map from 'lodash/map.js';
import { default as _some } from 'lodash/some.js';
import { default as _every } from 'lodash/every.js';
import get from 'lodash/get.js';
import set from 'lodash/set.js';
import concat from 'lodash/concat.js';
import find from 'lodash/find.js';
import reduce from 'lodash/reduce.js';
import remove from 'lodash/remove.js';
import slice from 'lodash/slice.js';
import indexOf from 'lodash/indexOf.js';
import uniq from 'lodash/uniq.js';
import findIndex from 'lodash/findIndex.js';
import sortBy from 'lodash/sortBy.js';
import filter from 'lodash/filter.js';
import forEach from 'lodash/forEach.js';
import split from 'lodash/split.js';
import trim from 'lodash/trim.js';
import toLower from 'lodash/toLower.js';
import toUpper from 'lodash/toUpper.js';
import has from 'lodash/has.js';
import isBoolean from 'lodash/isBoolean.js';
import padStart from "lodash/padStart";
import trimStart from "lodash/trimStart";
import { default as _isObject } from 'lodash/isObject.js';
import isNull from 'lodash/isNull.js';
import { default as _isArray } from 'lodash/isArray.js';
import isFunction from 'lodash/isFunction.js';
import { default as _isString } from 'lodash/isString.js';
import { default as _isNumber } from 'lodash/isNumber.js';
import { default as _isInteger } from 'lodash/isInteger.js';
import { default as _isSafeInteger } from 'lodash/isSafeInteger.js';
import toInteger from 'lodash/toInteger.js';
import toSafeInteger from 'lodash/toSafeInteger.js';
import startsWith from 'lodash/startsWith.js';
import endsWith from 'lodash/endsWith.js';
import values from 'lodash/values.js';
import join from 'lodash/join.js';
import isEqual from 'lodash/isEqual.js';
import first from 'lodash/first.js';
import last from 'lodash/last.js';
import camelCase from 'lodash/camelCase.js';

import { IS_DEVELOPMENT }from "../constants/environment";

export interface StringifyCallback<T = any> {
    (value: T) : string;
}

export interface ParserCallback<T> {
    (value: any) : T | undefined;
}

export interface TestCallbackNonStandard {
    (value: any, arg2 ?: undefined|number|string|boolean, arg3 ?: undefined|number|string|boolean) : boolean;
}

export interface TestCallbackNonStandardOf<T> {
    (value: any, arg2 ?: undefined|number|string|boolean, arg3 ?: undefined|number|string|boolean) : value is T;
}

export interface TestCallback {
    (value: any, index: number, arr: any[]) : boolean;
}

export interface AssertCallback {
    (value: any) : void;
}

export interface ExplainCallback {
    (value: any) : string;
}

/**
 *
 * @param callback
 * @__PURE__
 * @nosideeffects
 */
export function toTestCallback (callback : TestCallbackNonStandard) : TestCallback {
    return (value, index, arr) : boolean => callback(value);
}

/**
 *
 * @param callback
 * @__PURE__
 * @nosideeffects
 */
export function toTestCallbackNonStandard (callback : TestCallback) : TestCallbackNonStandard {
    // @ts-ignore
    return (value, index, arr) : boolean => callback(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isUndefined (value: any) : value is undefined {
    return value === undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isArray (value : any) : value is any[] | readonly any[] {
    return _isArray(value);
}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOf<T = any> (
    value     : any,
    isItem    : TestCallback | undefined = undefined,
    minLength : number | undefined       = undefined,
    maxLength : number | undefined       = undefined
) : value is T[] | readonly T[] {

    if (!_isArray(value)) return false;

    const len = value?.length ?? 0;

    if ( minLength !== undefined && len < minLength ) {
        return false;
    }

    if ( maxLength !== undefined && len > maxLength ) {
        return false;
    }

    if ( isItem !== undefined ) {
        return every(value, isItem);
    }

    return true;

}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOfOrUndefined<T = any> (
    value     : any,
    isItem    : TestCallback | undefined = undefined,
    minLength : number | undefined       = undefined,
    maxLength : number | undefined       = undefined
) : value is T[] | readonly T[] | undefined {
    if (value === undefined) return true;
    return isArrayOf(value, isItem, minLength, maxLength);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOrUndefined (value : any) : value is (any[] | readonly any[] | undefined) {

    if (value === undefined) return true;

    return isArray(value);

}

/**
 *
 * @param value
 * @param isItem
 * @param minLength
 * @param maxLength
 * @__PURE__
 * @nosideeffects
 */
export function isArrayOrUndefinedOf<T = any> (
    value     : any,
    isItem    : TestCallback | undefined = undefined,
    minLength : number | undefined = undefined,
    maxLength : number | undefined = undefined
) : value is (T[] | readonly T[] | undefined) {

    if (value === undefined) return true;

    return isArrayOf<T>(value, isItem, minLength, maxLength);

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isBooleanOrUndefined (value : any) : value is boolean | undefined {
    return isUndefined(value) || isBoolean(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberOrUndefined (value : any) : value is number | undefined {
    return isUndefined(value) || isNumber(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isString (value : any) : value is string {
    return _isString(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumber (value : any) : value is number {
    return _isNumber(value);
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
    value     : any,
    minLength : number | undefined = undefined,
    maxLength : number | undefined = undefined
) : value is string {

    if (!_isString(value)) return false;

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
export function isStringOrUndefined (value : any) : value is string | undefined {
    return isUndefined(value) || isString(value);
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
    value : any,
    minLength : number | undefined = undefined,
    maxLength : number | undefined = undefined
) : value is string | undefined {
    return isUndefined(value) || isStringOf(value, minLength, maxLength);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isStringArray (value : any) : value is string[] {
    return (
        !!value
        && isArray(value)
        && every(value, isString)
    );
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isStringArrayOrUndefined (value : any) : value is string[] | undefined {
    return isUndefined(value) || isStringArray(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isBooleanArray (value : any) : value is boolean[] {
    return (
        !!value
        && isArray(value)
        && every(value, isBoolean)
    );
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberArray (value : any) : value is number[] {
    return (
        !!value
        && isArray(value)
        && every(value, isNumber)
    );
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseInteger (value: any) : number | undefined {

    if (value === undefined) {
        return undefined;
    }

    if (isSafeInteger(value)) {
        return value;
    }

    if (isString(value)) {
        value = trim(value);
        if (value.length === 0) return undefined;
    }

    const parsedValue = toSafeInteger(value);

    return isSafeInteger(parsedValue) ? parsedValue : undefined;

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isInteger (value : any) : value is number {
    return _isInteger(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isIntegerOrUndefined (value : any) : value is number | undefined {
    return isUndefined(value) || _isInteger(value);
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
    value      : any,
    rangeStart : number | undefined = undefined,
    rangeEnd   : number | undefined = undefined
) : value is number {

    if (!_isInteger(value)) return false;

    if (rangeStart !== undefined && value < rangeStart) {
        return false;
    }

    if (rangeEnd !== undefined && value > rangeEnd) {
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
export function isSafeInteger (value : any) : value is number {
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
    value      : any,
    rangeStart : number | undefined = undefined,
    rangeEnd   : number | undefined = undefined
) : value is number {

    if (!_isSafeInteger(value)) return false;

    if (rangeStart !== undefined && value < rangeStart) {
        return false;
    }

    if (rangeEnd !== undefined && value > rangeEnd) {
        return false;
    }

    return true;

}

/**
 *
 * @param value
 * @param isValue
 * @__PURE__
 * @nosideeffects
 */
export function some<T = any> (
    value   : any,
    isValue : TestCallback
) : value is (T|any)[] {
    return _some(value, isValue);
}

/**
 *
 * @param value
 * @param isValue
 * @__PURE__
 * @nosideeffects
 */
export function every<T = any> (
    value   : any,
    isValue : TestCallback
) : value is T[] {
    return _every(value, isValue);
}

/**
 *
 * @param value
 * @param isKey
 * @__PURE__
 * @nosideeffects
 */
export function everyKey<T extends keyof any = string> (
    value : any,
    isKey : TestCallback
) : value is {[P in T]: any} {
    return _isObject(value) && every(keys(value), isKey);
}

/**
 *
 * @param value
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function everyValue<T = any> (
    value  : any,
    isItem : TestCallback
) : value is {[key: string]: T} {
    return _isObject(value) && every(values(value), isItem);
}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function everyProperty<K extends keyof any = string, T = any> (
    value  : any,
    isKey  : TestCallback | undefined = isString,
    isItem : TestCallback | undefined = undefined
) : value is {[P in K]: T} {

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
 * @param explainKey
 * @param explainValue
 * @__PURE__
 * @nosideeffects
 */
export function assertEveryProperty<
    K extends keyof any = string,
    T                   = any
> (
    value        : any,
    isKey        : TestCallbackNonStandardOf<K> | undefined = undefined,
    isItem       : TestCallbackNonStandardOf<T> | undefined = undefined,
    explainKey   : ExplainCallback         | undefined = undefined,
    explainValue : ExplainCallback         | undefined = undefined
) : void {

    const isKeyTest : TestCallbackNonStandardOf<K> = isKey === undefined ? isString as TestCallbackNonStandardOf<K> : isKey;

    if ( isItem !== undefined && !everyValue<T>(value, (item : T) : boolean => isItem(item)) ) {

        const valueArray : T[]                      = values(value);
        const itemIndex  : number                   = findIndex(valueArray, (item : T) : boolean => !isItem(item));
        const itemKey    : string | Symbol | number = keys(value)[itemIndex];
        const itemValue  : T                        = valueArray[itemIndex];
        if (explainValue) {
            throw new TypeError(`Property "${itemKey}": value not correct: ${explainValue(itemValue)}`);
        } else {
            throw new TypeError(`Property "${itemKey}": value not correct: ${JSON.stringify(itemValue, null, 2)}`);
        }

    }

    const key : string | Symbol | number | undefined = find(keys(value), (key : Symbol | string | number) : boolean => !isKeyTest(key));

    if (explainKey) {
        throw new TypeError(`Property "${key}": key was not correct: ${explainKey(key)}`);
    } else {
        throw new TypeError(`Property "${key}": key was not correct: ${JSON.stringify(key, null, 2)}`);
    }

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isRegularObject (
    value  : any
) : value is {[P in string]: any} {

    if (!_isObject(value)) return false;
    if (value instanceof Date) return false;
    if (isFunction(value)) return false;
    if (isArray(value)) return false;

    return everyProperty<string,any>(value, isString, undefined);

}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function isRegularObjectOf<K extends keyof any = string, T=any> (
    value  : any,
    isKey  : TestCallback = isString,
    isItem : TestCallback | undefined = undefined
) : value is {[P in K]: T} {

    if (!_isObject(value)) return false;
    if (value instanceof Date) return false;
    if (isFunction(value)) return false;
    if (isArray(value)) return false;

    return everyProperty<K,T>(value, isKey, isItem);

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
export function assertRegularObjectOf<
    K extends keyof any = string,
    T                   = any
> (
    value        : any,
    isKey        : TestCallbackNonStandardOf<K> | undefined = undefined,
    isItem       : TestCallbackNonStandardOf<T> | undefined = undefined,
    explainKey   : ExplainCallback              | undefined = undefined,
    explainValue : ExplainCallback              | undefined = undefined
) : void {

    const isKeyTest : TestCallbackNonStandardOf<K> = isKey === undefined ? isString as TestCallbackNonStandardOf<K> : isKey;

    if (!_isObject(value)) {
        throw new TypeError(`value was not object`);
    }

    if (value instanceof Date){
        throw new TypeError(`value was Date`);
    }

    if (isFunction(value)){
        throw new TypeError(`value was Function`);
    }

    if (isArray(value)){
        throw new TypeError(`value was array`);
    }

    assertEveryProperty<K,T>(value, isKeyTest, isItem, explainKey, explainValue);

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
export function explainRegularObjectOf<
    K extends keyof any = string,
    T                   = any
> (
    value        : any,
    isKey        : TestCallbackNonStandardOf<K> | undefined = undefined,
    isItem       : TestCallbackNonStandardOf<T> | undefined = undefined,
    explainKey   : ExplainCallback              | undefined = undefined,
    explainValue : ExplainCallback              | undefined = undefined
) {
    try {
        assertRegularObjectOf<K, T>(value, isKey, isItem, explainKey, explainValue);
        return 'No errors detected';
    } catch (err : any) {
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
export function isRegularObjectOrUndefinedOf<K extends keyof any = string, T=any> (
    value  : any,
    isKey  : TestCallback = isString,
    isItem : TestCallback | undefined = undefined
) : value is ({[P in K]: T} | undefined) {

    if (value === undefined) return true;

    return isRegularObjectOf<K,T>(value, isKey, isItem);

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isRegularObjectOrUndefined (value : any) : value is ({[P in string]: any} | undefined) {

    if (value === undefined) return true;

    return isRegularObjectOf<string,any>(value, isString, undefined);

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isPromise (value: any) : value is Promise<any> {
    // @ts-ignore
    return _isObject(value) && !!value.then && !!value.catch;
}

/**
 *
 * @param callbacks
 * @__PURE__
 * @nosideeffects
 */
export function createOr<T = any> (...callbacks: (TestCallback|TestCallbackNonStandard)[]) : TestCallback {
    return (value : any) : value is T => some(callbacks, callback => callback(value));
}

/**
 *
 * @param callbacks
 * @__PURE__
 * @nosideeffects
 */
export function createAnd<T = any> (...callbacks: (TestCallback|TestCallbackNonStandard)[]) : TestCallback {
    return (value : any) : value is T => every(callbacks, callback => callback(value));
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isObject (value: any) : value is {[P in string]: any} {
    return _isObject(value);
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
    isKey  : TestCallback | undefined = undefined,
    isItem : TestCallback | undefined = undefined
) : value is {[P in K]: T} {

    if (isKey === undefined) {
        return _isObject(value);
    }

    if (isItem === undefined) {
        return everyKey<K>(value, isKey);
    }

    return everyProperty<K, T>(value, isKey, isItem);

}

/**
 *
 * @param f
 * @__PURE__
 * @nosideeffects
 */
export function parseFunctionSignature (f: any) : string | undefined {

    if (!isFunction(f)) return undefined;

    let fString = trim(`${f}`);

    if (startsWith(fString, 'function ')) {
        fString = trim(fString.substr('function '.length));
    }

    const index = fString.indexOf('{');
    if (index >= 0) {
        return trim(fString.substr(0, index));
    }
    return trim(fString);

}

/**
 *
 * @param obj
 * @param acceptedKeys
 * @__PURE__
 * @nosideeffects
 */
export function getOtherKeys (obj: any, acceptedKeys: readonly string[]) : readonly string[] {
    return filter(keys(obj), (key : string) : boolean => !acceptedKeys.includes(key));
}

/**
 *
 * @param obj
 * @param acceptedKeys
 * @__PURE__
 * @nosideeffects
 */
export function hasNoOtherKeys (obj: any, acceptedKeys: readonly string[]) : boolean {
    return isObject(obj) && getOtherKeys(obj, acceptedKeys).length === 0;
}

/**
 *
 * @param value
 * @param array
 * @__PURE__
 * @nosideeffects
 */
export function hasNoOtherKeysInDevelopment (value: any, array : readonly string[] ){
    return (
        IS_DEVELOPMENT ? hasNoOtherKeys(value, array) : true
    )
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseBoolean (value: any) : boolean | undefined {
    if ( value === undefined || value === '' ) return undefined;
    if ( isBoolean(value) ) return value;
    return ["true", "t", "on", "1", "enabled"].includes( `${value}`.toLowerCase() );
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseString (value: any) : string | undefined {
    if (value === undefined) return undefined;
    return `${value}`;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseNonEmptyString (value: any) : string | undefined {
    if (value === undefined) return undefined;
    if (value === '') return undefined;
    return `${value}`;
}

/**
 * Returns path to every scalar item in the variable.
 *
 * @param value
 * @param baseKey
 * @returns Every path to scalar properties.
 *          If the value is not an array or object, will return the baseKey itself if it's defined.
 *          If the baseKey is not defined or is empty, will return an empty array.
 * @__PURE__
 * @nosideeffects
 */
export function pathsToScalarItems (
    value   : any,
    baseKey : string = ''
) : string[] {

    if (isArray(value)) {

        let allKeys : string[] = [];

        forEach(
            value,
            (item : any, itemIndex: number) => {

                const itemKey = `${baseKey}${baseKey?'.':''}${itemIndex}`;

                const allItemKeys = pathsToScalarItems(item, itemKey);

                allKeys = allKeys.concat(allItemKeys);

            }
        );

        return allKeys;

    }

    if (isObject(value)) {

        let allKeys : string[] = [];

        forEach(
            keys(value),
            (itemKey : any, itemIndex: number) => {

                const itemFullKey = `${baseKey}${baseKey?'.':''}${itemKey}`;

                const item : any = value[itemKey];

                const allItemKeys = pathsToScalarItems(item, itemFullKey);

                allKeys = allKeys.concat(allItemKeys);

            }
        );

        return allKeys;

    }

    if (baseKey === '') {
        return [];
    }

    return [baseKey];

}

export function keys<
    T extends keyof any = string
> (
    value : any,
    isKey : TestCallbackNonStandard                    = isString
) : T[] {

    if (isArray(value)) {

        const indexes : number[] = map(value, (item : any, index: number) => index);

        const items : T[] = filter(indexes, (key: number) => isKey(key)) as T[];

        return items;

    } else if (isObject(value)) {

        const allKeys : (string|Symbol)[] = Reflect.ownKeys(value);

        const items = filter(allKeys, (key: string|Symbol) => isKey(key)) as T[];

        return items;

    }

    return [] as T[];

}

export {
    map,
    get,
    set,
    concat,
    find,
    reduce,
    remove,
    slice,
    indexOf,
    findIndex,
    sortBy,
    split,
    filter,
    forEach,
    trim,
    isBoolean,
    isNull,
    isFunction,
    toInteger,
    toSafeInteger,
    startsWith,
    endsWith,
    has,
    values,
    uniq,
    first,
    last,
    toLower,
    toUpper,
    join,
    isEqual,
    camelCase,
    padStart,
    trimStart
};
