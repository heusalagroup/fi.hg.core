// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr } from "./explain";
import { explainString, isString } from "./String";
import { isUndefined } from "./undefined";

export type Uuid = string;

export function createUuid (
    value : string
) : Uuid {
    if (!isUuid(value)) throw new TypeError(`createUuid: Not uuid: ${value}`)
    return value;
}

export function isUuid (value: unknown) : value is Uuid {
    return (
        isString(value) && /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(value)
    );
}

export function explainUuid (value: any) : string {
    return explain(
        [
            explainString(value),
            /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(value) ? explainOk() : explainNot('Uuid')
        ]
    );
}

export function parseUuid (value: unknown) : Uuid | undefined {
    if (isUuid(value)) return value;
    return undefined;
}

export function isUuidOrUndefined (value: unknown): value is Uuid | undefined {
    return isUndefined(value) || isUuid(value);
}

export function explainUuidOrUndefined (value: unknown): string {
    return isUuidOrUndefined(value) ? explainOk() : explainNot(explainOr(['Uuid', 'undefined']));
}
