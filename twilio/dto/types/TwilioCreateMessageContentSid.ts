// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../types/explain";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainString, isString } from "../../../types/String";
import { isUndefined } from "../../../types/undefined";

export interface TwilioCreateMessageContentSid {
    readonly ContentSid: string;
}

export function createTwilioCreateMessageContentSid (
    ContentSid : string
) : TwilioCreateMessageContentSid {
    return {
        ContentSid
    };
}

export function isTwilioCreateMessageContentSid (value: unknown) : value is TwilioCreateMessageContentSid {
    return (
        isRegularObject(value)
        && isString(value?.ContentSid)
    );
}

export function explainTwilioCreateMessageContentSid (value: any) : string {
    return explain(
        [
            explainRegularObject(value)
            , explainProperty("ContentSid", explainString(value?.ContentSid))
        ]
    );
}

export function parseTwilioCreateMessageContentSid (value: unknown) : TwilioCreateMessageContentSid | undefined {
    if (isTwilioCreateMessageContentSid(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageContentSidOrUndefined (value: unknown): value is TwilioCreateMessageContentSid | undefined {
    return isUndefined(value) || isTwilioCreateMessageContentSid(value);
}

export function explainTwilioCreateMessageContentSidOrUndefined (value: unknown): string {
    return isTwilioCreateMessageContentSidOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageContentSid', 'undefined']));
}
