// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020. Sendanor. All rights reserved.
//               2020. Jaakko Heusala <jheusala@iki.fi>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { isBoolean } from "./types/Boolean";
import { isNull } from "./types/Null";
import { map } from "./functions/map";
import { reduce } from "./functions/reduce";
import { createOr, TestCallbackNonStandard } from "./types/TestCallback";
import { isUndefined } from "./types/undefined";
import { explainNot, explainOk, explainOr } from "./types/explain";
import { isString } from "./types/String";
import { isFunction } from "./types/Function";
import { isNumber } from "./types/Number";
import { isRegularObject } from "./types/RegularObject";
import { keys } from "./functions/keys";
import { everyProperty } from "./functions/everyProperty";
import { isArrayOf } from "./types/Array";


export interface WritableJsonSerializable {
    toJSON () : JsonAny;
}

export interface ReadonlyJsonSerializable {
    toJSON () : ReadonlyJsonAny;
}


export type JsonSerializable                = WritableJsonSerializable | ReadonlyJsonSerializable;
export type FlatJsonValue                   = string | number | boolean | null;
export type FlatJsonObject                  = JsonObjectOf<FlatJsonValue>;
export type FlatJsonArray                   = JsonArrayOf<FlatJsonValue>;
export type JsonAny                         = FlatJsonValue | JsonArray | JsonObject | JsonSerializable;
export type JsonObjectOf<T extends JsonAny> = { [name: string]: T       | undefined };
export type JsonObject                      = { [name: string]: JsonAny | undefined };
export type JsonArrayOf<T extends JsonAny>  = T[];
export type JsonArray                       = (JsonAny | undefined)[];

export type ReadonlyJsonAny                                 = FlatJsonValue | ReadonlyJsonArray | ReadonlyJsonObject;
export type ReadonlyJsonObjectOf<T extends ReadonlyJsonAny> = { readonly [name: string]: T               | undefined };
export type ReadonlyJsonObject                              = { readonly [name: string]: ReadonlyJsonAny | undefined };
export type ReadonlyJsonArrayOf<T extends ReadonlyJsonAny>  = readonly T[];
export type ReadonlyJsonArray                               = readonly ReadonlyJsonAny[];
export type ReadonlyFlatJsonObject                          = ReadonlyJsonObjectOf<FlatJsonValue>;
export type ReadonlyFlatJsonArray                           = ReadonlyJsonArrayOf<FlatJsonValue>;


export function isReadonlyJsonSerializable (value: any) : value is ReadonlyJsonSerializable {
    return !!value && isFunction(value?.toJSON);
}

export function isJsonSerializable (value: any) : value is JsonSerializable {
    return !!value && isFunction(value?.toJSON);
}

export function isFlatJsonValue (value: any) : value is FlatJsonValue {
    return isString(value) || isNumber(value) || isBoolean(value) || isNull(value);
}


export function isJson (value: any) : value is JsonAny | ReadonlyJsonAny {
    return isJsonAny(value);
}

export function isJsonAny (value: any) : value is JsonAny | ReadonlyJsonAny {
    return isFlatJsonValue(value) || isJsonArray(value) || isJsonObject(value);
}

export function isJsonAnyOrUndefined (value: any) : value is JsonAny | ReadonlyJsonAny {
    return isJsonAny(value) || isUndefined(value);
}

/**
 * Will accept objects with undefined values, which usually disappear from the JSON when stringified.
 *
 * @param value
 */
export function isJsonObject (value : any) : value is JsonObject | ReadonlyJsonObject {
    return isRegularObject(value) && everyProperty<string, JsonAny>(value, isString, createOr(isJsonAny, isUndefined));
}

export function explainJsonObject (value: any) : string {
    return isJsonObject(value) ? explainOk() : explainNot('JsonObject');
}

/**
 * Will accept objects with undefined values, which usually disappear from the JSON when stringified.
 *
 * @param value
 */
export function isJsonObjectOrUndefined (value : any) : value is JsonObject | ReadonlyJsonObject | undefined {
    return isUndefined(value) || isJsonObject(value);
}

export function explainJsonObjectOrUndefined (value: any) : string {
    return isJsonObjectOrUndefined(value) ? explainOk() : explainNot(explainOr(['JsonObject', 'undefined']));
}

/**
 * Will accept objects with undefined values, which usually disappear from the JSON when stringified.
 *
 * @param value
 * @param isPropertyOf
 */
export function isJsonObjectOf<T extends JsonAny = JsonAny> (
    value        : any,
    isPropertyOf : TestCallbackNonStandard = isJsonAny
) : value is JsonObject | ReadonlyJsonObject {
    return isRegularObject(value) && everyProperty<string, T>(value, isString, createOr(isPropertyOf, isUndefined));
}

/**
 * Will also accept arrays with undefined values, too, although these will usually convert to null.
 *
 * @param value
 */
export function isJsonArray (
    value    : any
) : value is JsonArrayOf<JsonAny> {
    return isArrayOf<JsonAny>(value, createOr(isJsonAny, isUndefined));
}

/**
 * Will also accept arrays with undefined values, too, although these will usually convert to null.
 *
 * @param value
 * @param isItemOf
 */
export function isJsonArrayOf<T extends JsonAny = JsonAny> (
    value    : any,
    isItemOf : TestCallbackNonStandard = isJsonAny
) : value is JsonArrayOf<T> {
    return isArrayOf<T>(value, createOr(isItemOf, isUndefined));
}


export function isReadonlyJsonAny (value: any) : value is ReadonlyJsonAny {
    return isFlatJsonValue(value) || isReadonlyJsonArray(value) || isReadonlyJsonObject(value);
}

export function explainReadonlyJsonAny (value: any) : string {
    return isReadonlyJsonAny(value) ? explainOk() : explainNot('ReadonlyJsonAny');
}

export function isReadonlyJsonObject (value : any) : value is ReadonlyJsonObjectOf<ReadonlyJsonAny> {
    return isRegularObject(value) && everyProperty<string, ReadonlyJsonAny>(value, isString, createOr(isReadonlyJsonAny, isUndefined));
}

export function isReadonlyJsonObjectOrUndefined (value : any) : value is ReadonlyJsonObjectOf<ReadonlyJsonAny> | undefined {
    return isUndefined(value) || isReadonlyJsonObject(value);
}

export function explainReadonlyJsonObjectOrUndefined (value: any) : string {
    return isReadonlyJsonObjectOrUndefined(value) ? explainOk() : explainNot(explainOr(['undefined', 'ReadonlyJsonObject']));
}

export function isReadonlyJsonObjectOrNullOrUndefined (value : any) : value is ReadonlyJsonObjectOf<ReadonlyJsonAny> | undefined | null {
    return isUndefined(value) || isNull(value) || isReadonlyJsonObject(value);
}

export function explainReadonlyJsonObjectOrNullOrUndefined (value: any) : string {
    return isReadonlyJsonObjectOrNullOrUndefined(value) ? explainOk() : explainNot(explainOr(['undefined', 'null', 'ReadonlyJsonObject']));
}

export function explainReadonlyJsonObject (value: any) : string {
    return isReadonlyJsonObject(value) ? explainOk() : explainNot('ReadonlyJsonObject');
}

export function explainReadonlyJsonArray (value: any) : string {
    return isReadonlyJsonArray(value) ? explainOk() : explainNot('ReadonlyJsonArray');
}

export function parseReadonlyJsonObject (value : any) : ReadonlyJsonObject | undefined {
    if (isString(value)) value = parseJson(value);
    return isReadonlyJsonObject(value) ? value : undefined;
}

export function isReadonlyJsonObjectOf<T extends ReadonlyJsonAny = ReadonlyJsonAny> (
    value        : any,
    isPropertyOf : TestCallbackNonStandard = isReadonlyJsonAny
) : value is ReadonlyJsonObjectOf<T> {
    return isRegularObject(value) && everyProperty<string, T>(value, isString, createOr(isPropertyOf, isUndefined));
}

export function isReadonlyJsonArray<T extends ReadonlyJsonAny = ReadonlyJsonAny> (
    value : any
) : value is ReadonlyJsonArrayOf<ReadonlyJsonAny> {
    return isArrayOf<T>(value, createOr(isReadonlyJsonAny, isUndefined));
}

export function isReadonlyJsonArrayOf<T extends ReadonlyJsonAny = ReadonlyJsonAny> (
    value    : any,
    isItemOf : TestCallbackNonStandard = isReadonlyJsonAny
) : value is ReadonlyJsonArrayOf<T> {
    return isArrayOf<T>(value, createOr(isItemOf, isUndefined));
}

export function parseJson (value: any) : JsonAny | undefined {
    try {
        return JSON.parse(value);
    } catch (err) {
        return undefined;
    }
}

export function isJsonString (value : any) : value is string {
    return parseJson(value) !== undefined;
}

export function explainJsonString (value : any) : string {
    return isJsonString(value) ? explainOk() : explainNot('JSON as string');
}

export function closeJsonArray (value: JsonArray | ReadonlyJsonArray) : JsonArray | ReadonlyJsonArray {
    if (isJsonArray(value)) {
        return map(value, cloneJson) as JsonArray | ReadonlyJsonArray;
    }
    throw new TypeError(`closeJsonArray: Not an JSON array: ${value}`);
}

export function cloneJsonObject (value: JsonObject | ReadonlyJsonObject) : JsonObject | ReadonlyJsonObject {
    if (isJsonObject(value)) {
        return reduce(
            keys(value),
            (obj: {[key: string]: any}, key: string) : JsonObject => {
                obj[key] = cloneJson(value[key]);
                return obj;
            },
            {} as JsonObject | ReadonlyJsonObject
        );
    }
    throw new TypeError(`cloneJsonObject: Not an JSON object: ${value}`);
}

export function cloneJson (value: any) : JsonAny | ReadonlyJsonAny | undefined {

    if (value === undefined) return undefined;
    if (value === null) return null;
    if (isString(value)) return value;
    if (isNumber(value)) return value;
    if (isBoolean(value)) return value;
    if (isJsonArray(value)) return closeJsonArray(value);
    if (isJsonObject(value)) return cloneJsonObject(value);

    throw new TypeError(`cloneJson: Not JSON compatible value: ${value}`);

}
