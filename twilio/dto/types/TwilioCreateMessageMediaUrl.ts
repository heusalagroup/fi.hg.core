// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../types/explain";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainString, isString } from "../../../types/String";
import { isUndefined } from "../../../types/undefined";

export interface TwilioCreateMessageMediaUrl {
    readonly MediaUrl: string;
}

export function createTwilioCreateMessageMediaUrl (
    MediaUrl : string
) : TwilioCreateMessageMediaUrl {
    return {
        MediaUrl
    };
}

export function isTwilioCreateMessageMediaUrl (value: unknown) : value is TwilioCreateMessageMediaUrl {
    return (
        isRegularObject(value)
        && isString(value?.MediaUrl)
    );
}

export function explainTwilioCreateMessageMediaUrl (value: any) : string {
    return explain(
        [
            explainRegularObject(value)
            , explainProperty("MediaUrl", explainString(value?.MediaUrl))
        ]
    );
}

export function parseTwilioCreateMessageMediaUrl (value: unknown) : TwilioCreateMessageMediaUrl | undefined {
    if (isTwilioCreateMessageMediaUrl(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageMediaUrlOrUndefined (value: unknown): value is TwilioCreateMessageMediaUrl | undefined {
    return isUndefined(value) || isTwilioCreateMessageMediaUrl(value);
}

export function explainTwilioCreateMessageMediaUrlOrUndefined (value: unknown): string {
    return isTwilioCreateMessageMediaUrlOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageMediaUrl', 'undefined']));
}
