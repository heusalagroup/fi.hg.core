// Copyright (c) 2020 Sendanor. All rights reserved.
//               2020 Jaakko Heusala <jheusala@iki.fi>
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

import {every, isFunction, isNumber, isString, keys, isBoolean, isNull, isArray} from "./modules/lodash";
import {Test} from "./Test";

export interface WritableJsonSerializable {
    toJSON () : JsonAny;
}

export interface ReadonlyJsonSerializable {
    toJSON () : ReadonlyJsonAny;
}

export function isReadonlyJsonSerializable (value: any) : value is ReadonlyJsonSerializable {
    return !!value && isFunction(value.toJSON);
}


export type JsonSerializable = WritableJsonSerializable | ReadonlyJsonSerializable;

export function isJsonSerializable (value: any) : value is JsonSerializable {
    return !!value && isFunction(value.toJSON);
}


export type FlatJsonValue                   = string | number | boolean | null;

export function isFlatJsonValue (value: any) : value is FlatJsonValue {
    return isString(value) || isNumber(value) || isBoolean(value) || isNull(value);
}


export type FlatJsonObject                  = JsonObjectOf<FlatJsonValue>;


export type FlatJsonArray                   = JsonArrayOf<FlatJsonValue>;


export type JsonAny                         = FlatJsonValue | JsonArray | JsonObject | JsonSerializable;
export type JsonObjectOf<T extends JsonAny> = { [name: string]: T       | undefined };
export type JsonObject                      = { [name: string]: JsonAny | undefined };
export type JsonArrayOf<T extends JsonAny>  = Array<T>;
export type JsonArray                       = Array<JsonAny>;

export type ReadonlyJsonAny                                 = FlatJsonValue | ReadonlyJsonArray | ReadonlyJsonObject;

export function isReadonlyJsonAny (value: any) : value is ReadonlyJsonAny {
    return isFlatJsonValue(value) || isReadonlyJsonArray(value) || isReadonlyJsonObject(value);
}


export type ReadonlyJsonObjectOf<T extends ReadonlyJsonAny> = { readonly [name: string]: T               | undefined };


export type ReadonlyJsonObject                              = { readonly [name: string]: ReadonlyJsonAny | undefined };

export function isReadonlyJsonObject (value: any) : value is ReadonlyJsonObject {

    return Test.isRegularObject(value) && every(keys(value), (key : string) : boolean => {

        const propertyValue = value[key];

        if (propertyValue === undefined) return true;

        return isReadonlyJsonAny(propertyValue);

    });

}

export type ReadonlyJsonArrayOf<T extends ReadonlyJsonAny>  = ReadonlyArray<T>;


export type ReadonlyJsonArray                               = ReadonlyArray<ReadonlyJsonAny>;

export function isReadonlyJsonArray (value: any) : value is ReadonlyJsonArray {
    return isArray(value) && every(value, (item : any) : boolean => isReadonlyJsonAny(item));
}


export type ReadonlyFlatJsonObject = ReadonlyJsonObjectOf<FlatJsonValue>;
export type ReadonlyFlatJsonArray  = ReadonlyJsonArrayOf<FlatJsonValue>;

export default JsonAny;
