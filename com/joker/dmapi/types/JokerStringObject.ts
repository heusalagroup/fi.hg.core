// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../../types/String";
import { explainObjectOf, isObjectOf } from "../../../../types/Object";

export interface JokerStringObject {
    readonly [key: string]: string;
}

export function isJokerStringObject (value: any) : value is JokerStringObject {
    return (
        isObjectOf<string, string>(value, isString, isString)
    );
}

export function explainJokerStringObject (value: any) : string {
    return explainObjectOf<string, string>(
        value,
        isString,
        isString,
        "string",
    );
}

export function stringifyJokerStringObject (value : JokerStringObject) : string {
    return `JokerStringObject(${value})`;
}

export function parseJokerStringObject (value: any) : JokerStringObject | undefined {
    if (isJokerStringObject(value)) return value;
    return undefined;
}

