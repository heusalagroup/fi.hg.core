// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../../types/OtherKeys";
import { explain, explainProperty } from "../../../../types/explain";
import { EntityMetadata, explainEntityMetadata, isEntityMetadata } from "../../../types/EntityMetadata";
import { isWhereOrUndefined, Where } from "../../../Where";

export interface HgRsCountRequestDTO {
    readonly metadata : EntityMetadata;
    readonly where : Where | undefined;
}

export function createHgRsCountRequestDTO (
    metadata : EntityMetadata,
    where : Where | undefined
) : HgRsCountRequestDTO {
    return {
        metadata,
        where
    };
}

export function isHgRsCountRequestDTO (value: unknown) : value is HgRsCountRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'metadata',
            'where',
        ])
        && isEntityMetadata(value?.metadata)
        && isWhereOrUndefined(value?.where)
    );
}

export function explainHgRsCountRequestDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'metadata',
                'where',
            ])
            , explainProperty("metadata", explainEntityMetadata(value?.metadata))
            , explainProperty("where", explainWhere(value?.where))
        ]
    );
}

export function stringifyHgRsCountRequestDTO (value : HgRsCountRequestDTO) : string {
    return `HgRsCountRequestDTO(${value})`;
}

export function parseHgRsCountRequestDTO (value: unknown) : HgRsCountRequestDTO | undefined {
    if (isHgRsCountRequestDTO(value)) return value;
    return undefined;
}
