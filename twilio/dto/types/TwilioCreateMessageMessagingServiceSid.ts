// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../types/explain";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainString, isString } from "../../../types/String";
import { isUndefined } from "../../../types/undefined";

/**
 * @Example
 *   {"MessagingServiceSid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
 */
export interface TwilioCreateMessageMessagingServiceSid {
    readonly MessagingServiceSid: string;
}

export function createTwilioCreateMessageMessagingServiceSid (
    MessagingServiceSid : string
) : TwilioCreateMessageMessagingServiceSid {
    return {
        MessagingServiceSid
    };
}

export function isTwilioCreateMessageMessagingServiceSid (value: unknown) : value is TwilioCreateMessageMessagingServiceSid {
    return (
        isRegularObject(value)
        && isString(value?.MessagingServiceSid)
    );
}

export function explainTwilioCreateMessageMessagingServiceSid (value: any) : string {
    return explain(
        [
            explainRegularObject(value)
            , explainProperty("MessagingServiceSid", explainString(value?.MessagingServiceSid))
        ]
    );
}

export function parseTwilioCreateMessageMessagingServiceSid (value: unknown) : TwilioCreateMessageMessagingServiceSid | undefined {
    if (isTwilioCreateMessageMessagingServiceSid(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageMessagingServiceSidOrUndefined (value: unknown): value is TwilioCreateMessageMessagingServiceSid | undefined {
    return isUndefined(value) || isTwilioCreateMessageMessagingServiceSid(value);
}

export function explainTwilioCreateMessageMessagingServiceSidOrUndefined (value: unknown): string {
    return isTwilioCreateMessageMessagingServiceSidOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageMessagingServiceSid', 'undefined']));
}
