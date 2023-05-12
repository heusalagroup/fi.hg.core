// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainTemporalType, isTemporalType, TemporalType } from "./TemporalType";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";

export interface TemporalProperty {
    readonly propertyName : string;
    readonly temporalType : TemporalType;
}

export function createTemporalProperty (
    propertyName: string,
    temporalType: TemporalType
) : TemporalProperty {
    return {
        propertyName,
        temporalType
    };
}

export function isTemporalProperty (value: unknown) : value is TemporalProperty {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'propertyName',
            'temporalType'
        ])
        && isString(value?.propertyName)
        && isTemporalType(value?.temporalType)
    );
}

export function explainTemporalProperty (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'propertyName',
                'temporalType'
            ])
            , explainProperty("propertyName", explainString(value?.propertyName))
            , explainProperty("temporalType", explainTemporalType(value?.temporalType))
        ]
    );
}

export function stringifyTemporalProperty (value : TemporalProperty) : string {
    return `TemporalProperty(${value})`;
}

export function parseTemporalProperty (value: unknown) : TemporalProperty | undefined {
    if (isTemporalProperty(value)) return value;
    return undefined;
}
