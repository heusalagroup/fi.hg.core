// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import map from 'lodash/map.js';
import some from 'lodash/some.js';
import every from 'lodash/every.js';
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

export interface TestCallback {
    (value: any) : boolean;
}

export function isUndefined (value: any) : value is undefined {
    return value === undefined;
}

export function isArray<T = any> (
    value     : any,
    isItem    : TestCallback | undefined = undefined,
    minLength : number | undefined = undefined,
    maxLength : number | undefined = undefined
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

export function isBooleanOrUndefined (value : any) : value is boolean | undefined {
    return isUndefined(value) || isBoolean(value);
}

export function isNumberOrUndefined (value : any) : value is number | undefined {
    return isUndefined(value) || isNumber(value);
}

export function isString (
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

export function isStringOrUndefined (
    value : any,
    minLength : number | undefined = undefined,
    maxLength : number | undefined = undefined
) : value is string | undefined {
    return (
        isUndefined(value)
        || isString(value, minLength, maxLength)
    );
}

export function isStringArray (value : any) : value is string[] {
    return (
        !!value
        && isArray(value)
        && every(value, isString)
    );
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

export function isInteger (
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

export function isSafeInteger (
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

export function everyKey<T extends string = string> (
    value : any,
    isKey : TestCallback | undefined
) : value is {[P in T]: any} {
    return _isObject(value) && every(keys(value), isKey);
}

export function everyValue<T = any> (
    value  : any,
    isItem : TestCallback | undefined
) : value is {[key: string]: T} {
    return _isObject(value) && every(values(value), isItem);
}

export function everyProperty<K extends string = string, T = any> (
    value  : any,
    isKey  : TestCallback | undefined,
    isItem : TestCallback | undefined
) : value is {[P in K]: T} {
    return everyKey<K>(value, isKey) && everyValue<T>(value, isItem);
}

/**
 *
 * @FIXME: Does not detect Date... and probably others too.
 * @param value
 */
export function isRegularObject (value: any) : value is { [name: string]: any } {

    if (!_isObject(value)) return false;
    if (value instanceof Date) return false;
    if (isFunction(value)) return false;
    if (isArray(value)) return false;

    return everyKey(value, isString);

}

export function isPromise (value: any) : value is Promise<any> {
    // @ts-ignore
    return _isObject(value) && !!value.then && !!value.catch;
}

export function createOr<T = any> (...callbacks: TestCallback[]) : TestCallback {
    return (value : any) : value is T => some(callbacks, callback => callback(value));
}

export function createAnd<T = any> (...callbacks: TestCallback[]) : TestCallback {
    return (value : any) : value is T => every(callbacks, callback => callback(value));
}

export function isObject<K extends string = string, T = any> (
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
    some,
    every,
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
    has
};
