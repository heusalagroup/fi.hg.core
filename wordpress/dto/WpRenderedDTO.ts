// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, isString } from "../../types/String";
import { explainBooleanOrUndefined, isBooleanOrUndefined } from "../../types/Boolean";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";

/**
 * Wordpress object used in the v2 JSON API
 */
export interface WpRenderedDTO {
    readonly rendered : string;
    readonly protected ?: boolean;
}

export function createWpRenderedDTO (
    rendered    : string,
    protected_ ?: boolean | undefined
) : WpRenderedDTO {
    return {
        rendered,
        ...( protected_ !== undefined ? {protected: protected_} : {})
    };
}

export function isWpRenderedDTO (value: unknown) : value is WpRenderedDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'rendered',
            'protected'
        ])
        && isString(value?.rendered)
        && isBooleanOrUndefined(value?.protected)
    );
}

export function explainWpRenderedDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'rendered',
                'protected'
            ])
            , explainProperty("rendered", explainString(value?.rendered))
            , explainProperty("protected", explainBooleanOrUndefined(value?.protected))
        ]
    );
}

export function stringifyWpRenderedDTO (value : WpRenderedDTO) : string {
    return `WpRenderedDTO(${value})`;
}

export function parseWpRenderedDTO (value: unknown) : WpRenderedDTO | undefined {
    if (isWpRenderedDTO(value)) return value;
    return undefined;
}
