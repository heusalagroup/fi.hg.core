// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainZendeskGroup, isZendeskGroup, ZendeskGroup } from "./ZendeskGroup";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";

export interface ZendeskGroupDTO {
    readonly group: ZendeskGroup;
}

export function createZendeskGroupDTO (
    group: ZendeskGroup
) : ZendeskGroupDTO {
    return {
        group
    };
}

export function isZendeskGroupDTO (value: unknown) : value is ZendeskGroupDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'group'
        ])
        && isZendeskGroup(value?.group)
    );
}

export function explainZendeskGroupDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'group'
            ])
            , explainProperty("group", explainZendeskGroup(value?.group))
        ]
    );
}

export function stringifyZendeskGroupDTO (value : ZendeskGroupDTO) : string {
    return `ZendeskGroupDTO(${value})`;
}

export function parseZendeskGroupDTO (value: unknown) : ZendeskGroupDTO | undefined {
    if (isZendeskGroupDTO(value)) return value;
    return undefined;
}
