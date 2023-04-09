// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";
import { explainString, isString } from "../../types/String";

export interface ZendeskVia {
    readonly channel: string;
}

export function createZendeskVia (
    channel: string
) : ZendeskVia {
    return {
        channel
    };
}

export function isZendeskVia (value: unknown) : value is ZendeskVia {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'channel'
        ])
        && isString(value?.channel)
    );
}

export function explainZendeskVia (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'channel'
            ])
            , explainProperty("channel", explainString(value?.channel))
        ]
    );
}

export function stringifyZendeskVia (value : ZendeskVia) : string {
    return `ZendeskVia(${value})`;
}

export function parseZendeskVia (value: unknown) : ZendeskVia | undefined {
    if (isZendeskVia(value)) return value;
    return undefined;
}
