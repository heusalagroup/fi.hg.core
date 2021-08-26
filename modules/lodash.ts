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
import findIndex from 'lodash/findIndex.js';
import sortBy from 'lodash/sortBy.js';
import filter from 'lodash/filter.js';
import forEach from 'lodash/forEach.js';
import split from 'lodash/split.js';
import keys from 'lodash/keys.js';
import trim from 'lodash/trim.js';
import has from 'lodash/has.js';
import isBoolean from 'lodash/isBoolean.js';
import { default as _isObject } from 'lodash/isObject.js';
import isNull from 'lodash/isNull.js';
import { default as _isArray } from 'lodash/isArray.js';
import isFunction from 'lodash/isFunction.js';
import { default as _isString } from 'lodash/isString.js';
import isNumber from 'lodash/isNumber.js';
import { default as _isInteger } from 'lodash/isInteger.js';
import { default as _isSafeInteger } from 'lodash/isSafeInteger.js';
import toInteger from 'lodash/toInteger.js';
import toSafeInteger from 'lodash/toSafeInteger.js';
import startsWith from 'lodash/startsWith.js';
import values from 'lodash/values.js';

export interface StringifyCallback<T = any> {
    (value: T) : string;
}

export interface ParserCallback<T> {
    (value: any) : T | undefined;
}

export interface TestCallbackNonStandard {
    (value: any, arg2 ?: undefined|number|string|boolean, arg3 ?: undefined|number|string|boolean) : boolean;
}

export interface TestCallback {
    (value: any, index: number, arr: any[]) : boolean;
}

export function toTestCallback (callback : TestCallbackNonStandard) : TestCallback {
    return (value, index, arr) : boolean => callback(value);
}

export function toTestCallbackNonStandard (callback : TestCallback) : TestCallbackNonStandard {
    // @ts-ignore
    return (value, index, arr) : boolean => callback(value);
}

export function isUndefined (value: any) : value is undefined {
    return value === undefined;
}

export function isArray (value : any) : value is any[] | readonly any[] {
    return _isArray(value);
}

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

export function isArrayOrUndefined (value : any) : value is (any[] | readonly any[] | undefined) {

    if (value === undefined) return true;

    return isArray(value);

}

export function isArrayOrUndefinedOf<T = any> (
    value     : any,
    isItem    : TestCallback | undefined = undefined,
    minLength : number | undefined = undefined,
    maxLength : number | undefined = undefined
) : value is (T[] | readonly T[] | undefined) {

    if (value === undefined) return true;

    return isArrayOf<T>(value, isItem, minLength, maxLength);

}

export function isBooleanOrUndefined (value : any) : value is boolean | undefined {
    return isUndefined(value) || isBoolean(value);
}

export function isNumberOrUndefined (value : any) : value is number | undefined {
    return isUndefined(value) || isNumber(value);
}

export function isString (value : any) : value is string {
    return _isString(value);
}

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

export function isStringOrUndefined (value : any) : value is string | undefined {
    return isUndefined(value) || isString(value);
}

export function isStringOrUndefinedOf (
    value : any,
    minLength : number | undefined = undefined,
    maxLength : number | undefined = undefined
) : value is string | undefined {
    return isUndefined(value) || isStringOf(value, minLength, maxLength);
}

export function isStringArray (value : any) : value is string[] {
    return (
        !!value
        && isArray(value)
        && every(value, isString)
    );
}

export function isStringArrayOrUndefined (value : any) : value is string[] | undefined {
    return isUndefined(value) || isStringArray(value);
}

export function isBooleanArray (value : any) : value is boolean[] {
    return (
        !!value
        && isArray(value)
        && every(value, isBoolean)
    );
}

export function isNumberArray (value : any) : value is number[] {
    return (
        !!value
        && isArray(value)
        && every(value, isNumber)
    );
}

export function parseInteger (value: any) : number | undefined {

    if (isString(value)) {
        value = trim(value);
        if (value.length === 0) return undefined;
    }

    const parsedValue = toSafeInteger(value);

    return isSafeInteger(parsedValue) ? parsedValue : undefined;

}

export function isInteger (value : any) : value is number {
    return _isInteger(value);
}

export function isIntegerOrUndefined (value : any) : value is number | undefined {
    return isUndefined(value) || _isInteger(value);
}

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

export function isSafeInteger (value : any) : value is number {
    return _isSafeInteger(value);
}

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

export function some<T = any> (
    value   : any,
    isValue : TestCallback
) : boolean {
    return _some(value, isValue);
}

export function every<T = any> (
    value   : any,
    isValue : TestCallback
) : value is T[] {
    return _every(value, isValue);
}

export function everyKey<T extends keyof any = string> (
    value : any,
    isKey : TestCallback
) : value is {[P in T]: any} {
    return _isObject(value) && every(keys(value), isKey);
}

export function everyValue<T = any> (
    value  : any,
    isItem : TestCallback
) : value is {[key: string]: T} {
    return _isObject(value) && every(values(value), isItem);
}

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

export function assertEveryProperty<K extends keyof any = string, T = any> (
    value       : any,
    isKey       : TestCallback | undefined = isString,
    isItem      : TestCallback | undefined = undefined,
    explainKey   : ExplainCallback | undefined = undefined,
    explainValue : ExplainCallback | undefined = undefined
) : void {

    if ( isItem !== undefined && !everyValue<T>(value, isItem) ) {
        const valueArray = values(value);
        // @ts-ignore
        const itemIndex : number = findIndex(valueArray, (item) : boolean => !isItem(item));
        const itemKey : string = keys(value)[itemIndex];
        const itemValue : string = valueArray[itemIndex];
        if (explainValue) {
            throw new TypeError(`Property "${itemKey}": value not correct: ${explainValue(itemValue)}`);
        } else {
            throw new TypeError(`Property "${itemKey}": value not correct: ${JSON.stringify(itemValue, null, 2)}`);
        }
    }

    if ( isKey !== undefined ) {
        // @ts-ignore
        const key : any = find(keys(value), (key) : boolean => !isKey(key));
        if (explainKey) {
            throw new TypeError(`Property "${key}": key was not correct: ${explainKey(key)}`);
        } else {
            throw new TypeError(`Property "${key}": key was not correct: ${JSON.stringify(key, null, 2)}`);
        }

    }

    // @ts-ignore
    const key : any = find(keys(value), (key) : boolean => !isString(key));
    throw new TypeError(`Property "${key}": key was not string: ${key}`);

}

/**
 *
 * @param value
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

export interface AssertCallback {
    (value: any) : void;
}

export interface ExplainCallback {
    (value: any) : string;
}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
 * @param explainKey
 * @param explainValue
 */
export function assertRegularObjectOf<K extends keyof any = string, T=any> (
    value       : any,
    isKey       : TestCallback = isString,
    isItem      : TestCallback | undefined = undefined,
    explainKey   : ExplainCallback | undefined = undefined,
    explainValue : ExplainCallback | undefined = undefined
) : void {

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

    assertEveryProperty<K,T>(value, isKey, isItem, explainKey, explainValue);

}

export function explainRegularObjectOf<K extends keyof any = string, T=any> (
    value  : any,
    isKey  : TestCallback = isString,
    isItem : TestCallback | undefined = undefined,
    explainKey   : ExplainCallback | undefined = undefined,
    explainValue : ExplainCallback | undefined = undefined
) {
    try {
        assertRegularObjectOf(value, isKey, isItem, explainKey, explainValue);
        return 'No errors detected';
    } catch (err) {
        return err.message;
    }
}

/**
 *
 * @param value
 * @param isKey
 * @param isItem
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
 */
export function isRegularObjectOrUndefined (value : any) : value is ({[P in string]: any} | undefined) {

    if (value === undefined) return true;

    return isRegularObjectOf<string,any>(value, isString, undefined);

}

export function isPromise (value: any) : value is Promise<any> {
    // @ts-ignore
    return _isObject(value) && !!value.then && !!value.catch;
}

export function createOr<T = any> (...callbacks: (TestCallback|TestCallbackNonStandard)[]) : TestCallback {
    return (value : any) : value is T => some(callbacks, callback => callback(value));
}

export function createAnd<T = any> (...callbacks: (TestCallback|TestCallbackNonStandard)[]) : TestCallback {
    return (value : any) : value is T => every(callbacks, callback => callback(value));
}

export function isObject (value: any) : value is {[P in string]: any} {
    return _isObject(value);
}

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

export function getOtherKeys (obj: any, acceptedKeys: string[]) : string[] {
    return filter(keys(obj), (key : string) : boolean => !acceptedKeys.includes(key));
}

export function hasNoOtherKeys (obj: any, acceptedKeys: string[]) : boolean {
    return isObject(obj) && getOtherKeys(obj, acceptedKeys).length === 0;
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
    keys,
    trim,
    isBoolean,
    isNull,
    isFunction,
    isNumber,
    toInteger,
    toSafeInteger,
    startsWith,
    has,
    values
};
