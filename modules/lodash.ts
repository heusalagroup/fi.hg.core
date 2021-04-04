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
import sortBy from 'lodash/sortBy.js';
import filter from 'lodash/filter.js';
import forEach from 'lodash/forEach.js';
import split from 'lodash/split.js';
import keys from 'lodash/keys.js';
import trim from 'lodash/trim.js';
import has from 'lodash/has.js';
import isBoolean from 'lodash/isBoolean.js';
import isObject from 'lodash/isObject.js';
import isNull from 'lodash/isNull.js';
import isArray from 'lodash/isArray.js';
import isFunction from 'lodash/isFunction.js';
import isString from 'lodash/isString.js';
import isNumber from 'lodash/isNumber.js';

export function isBooleanOrUndefined (value : any) : value is boolean | undefined {
    return (
        value === undefined
        || isBoolean(value)
    );
}

export function isNumberOrUndefined (value : any) : value is number | undefined {
    return (
        value === undefined
        || isNumber(value)
    );
}

export function isStringOrUndefined (value : any) : value is string | undefined {
    return (
        value === undefined
        || isString(value)
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
    sortBy,
    split,
    filter,
    forEach,
    keys,
    trim,
    isBoolean,
    isObject,
    isNull,
    isFunction,
    isArray,
    isString,
    isNumber,
    has
};
