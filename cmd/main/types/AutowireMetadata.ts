// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainStringArray, isStringArray } from "../../../types/StringArray";

export interface AutowireMetadata {
    readonly paramNames: readonly (string|undefined)[];
}

export function createAutowireMetadata (
    paramNames : readonly string[]
) : AutowireMetadata {
    return {
        paramNames
    };
}

export function isAutowireMetadata (value: unknown) : value is AutowireMetadata {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'paramNames',
        ])
        && isStringArray(value?.paramNames)
    );
}

export function explainAutowireMetadata (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'paramNames',
            ])
            , explainProperty("paramNames", explainStringArray(value?.paramNames))
        ]
    );
}

export function parseAutowireMetadata (value: unknown) : AutowireMetadata | undefined {
    if (isAutowireMetadata(value)) return value;
    return undefined;
}

export function isAutowireMetadataOrUndefined (value: unknown): value is AutowireMetadata | undefined {
    return isUndefined(value) || isAutowireMetadata(value);
}

export function explainAutowireMetadataOrUndefined (value: unknown): string {
    return isAutowireMetadataOrUndefined(value) ? explainOk() : explainNot(explainOr(['AutowireMetadata', 'undefined']));
}
