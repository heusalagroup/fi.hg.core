// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../../types/OtherKeys";
import { explain, explainProperty } from "../../../../types/explain";
import { explainNumber, isNumber } from "../../../../types/Number";

export interface HgRsCountResponseDTO {
    readonly count: number;
}

export function createHgRsCountResponseDTO (
    count : number
) : HgRsCountResponseDTO {
    return {
        count
    };
}

export function isHgRsCountResponseDTO (value: unknown) : value is HgRsCountResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'count',
        ])
        && isNumber(value?.count)
    );
}

export function explainHgRsCountResponseDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'count',
            ])
            , explainProperty("count", explainNumber(value?.count))
        ]
    );
}

export function stringifyHgRsCountResponseDTO (value : HgRsCountResponseDTO) : string {
    return `HgRsCountResponseDTO(${value})`;
}

export function parseHgRsCountResponseDTO (value: unknown) : HgRsCountResponseDTO | undefined {
    if (isHgRsCountResponseDTO(value)) return value;
    return undefined;
}
