// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "./JokerStringObject";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, isString } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface JokerComApiRegisterDTO {
    readonly trackingId : string;
    readonly headers : JokerStringObject;
}

export function createJokerComApiRegisterDTO (
    trackingId : string,
    headers: JokerStringObject
) : JokerComApiRegisterDTO {
    return {
        trackingId,
        headers
    };
}

export function isJokerComApiRegisterDTO (value: any) : value is JokerComApiRegisterDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'trackingId',
            'headers'
        ])
        && isString(value?.trackingId)
        && isJokerStringObject(value?.headers)
    );
}

export function explainJokerComApiRegisterDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'trackingId',
                'headers'
            ]),
            explainProperty("trackingId", explainString(value?.trackingId)),
            explainProperty("headers", explainJokerStringObject(value?.headers)),
        ]
    );
}

export function stringifyJokerComApiRegisterDTO (value : JokerComApiRegisterDTO) : string {
    return `JokerComApiRegisterDTO(${value})`;
}

export function parseJokerComApiRegisterDTO (value: any) : JokerComApiRegisterDTO | undefined {
    if (isJokerComApiRegisterDTO(value)) return value;
    return undefined;
}
