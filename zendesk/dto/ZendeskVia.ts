// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { isString } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { isNumber } from "../../types/Number";
import { explainReadonlyJsonObjectOrUndefined, isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../Json";
import { isNull } from "../../types/Null";

export interface ZendeskVia {
    readonly channel: string | number;
    readonly source ?: ReadonlyJsonObject;
}

export function createZendeskVia (
    channel: string | number,
    source ?: ReadonlyJsonObject
) : ZendeskVia {
    return {
        channel,
        source
    };
}

export function isZendeskVia (value: unknown) : value is ZendeskVia {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'channel',
            'source'
        ])
        && (isString(value?.channel) || isNumber(value?.channel))
        && isReadonlyJsonObjectOrUndefined(value?.source)
    );
}

export function explainZendeskVia (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'channel',
                'source'
            ])
            , explainProperty("channel", isString(value?.channel) || isNumber(value?.channel) ? explainOk() : explainNot('string or number'))
            , explainProperty("source", explainReadonlyJsonObjectOrUndefined(value?.source))
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

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskViaOrUndefined (value: unknown): value is ZendeskVia | undefined {
    return isZendeskVia(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskViaOrUndefined (value: any): string {
    return isZendeskViaOrUndefined(value) ? explainOk() : explainNot('ZendeskVia or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskViaOrNullOrUndefined (value: unknown): value is ZendeskVia | undefined | null {
    return isZendeskVia(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskViaOrNullOrUndefined (value: any): string {
    return isZendeskViaOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskVia or undefined or null');
}
