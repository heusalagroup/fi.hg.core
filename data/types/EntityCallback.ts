// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainStringOrSymbol, isStringOrSymbol } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { EntityCallbackType, explainEntityCallbackType, isEntityCallbackType } from "./EntityCallbackType";

export interface EntityCallback {
    readonly propertyName : string | symbol;
    readonly callbackType : EntityCallbackType;
}

export function createEntityCallback (
    propertyName : string | symbol,
    callbackType : EntityCallbackType
) : EntityCallback {
    return {
        propertyName,
        callbackType
    };
}

export function isEntityCallback (value: unknown) : value is EntityCallback {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'propertyName',
            'callbackType',
        ])
        && isStringOrSymbol(value?.propertyName)
        && isEntityCallbackType(value?.callbackType)
    );
}

export function explainEntityCallback (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'propertyName',
                'callbackType',
            ])
            , explainProperty("propertyName", explainStringOrSymbol(value?.propertyName))
            , explainProperty("callbackType", explainEntityCallbackType(value?.callbackType))
        ]
    );
}

export function stringifyEntityCallback (value : EntityCallback) : string {
    return `EntityCallback(${value})`;
}

export function parseEntityCallback (value: unknown) : EntityCallback | undefined {
    if (isEntityCallback(value)) return value;
    return undefined;
}
