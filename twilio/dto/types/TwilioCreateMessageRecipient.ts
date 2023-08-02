// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../types/explain";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainString, isString } from "../../../types/String";
import { isUndefined } from "../../../types/undefined";

/**
 * @Example
 *   {"To": "+15558675310"}
 */
export interface TwilioCreateMessageRecipient {
    readonly To: string;
}

export function createTwilioCreateMessageRecipient (
    To : string
) : TwilioCreateMessageRecipient {
    return {
        To
    };
}

export function isTwilioCreateMessageRecipient (value: unknown) : value is TwilioCreateMessageRecipient {
    return (
        isRegularObject(value)
        && isString(value?.To)
    );
}

export function explainTwilioCreateMessageRecipient (value: any) : string {
    return explain(
        [
            explainRegularObject(value)
            , explainProperty("To", explainString(value?.To))
        ]
    );
}

export function parseTwilioCreateMessageRecipient (value: unknown) : TwilioCreateMessageRecipient | undefined {
    if (isTwilioCreateMessageRecipient(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageRecipientOrUndefined (value: unknown): value is TwilioCreateMessageRecipient | undefined {
    return isUndefined(value) || isTwilioCreateMessageRecipient(value);
}

export function explainTwilioCreateMessageRecipientOrUndefined (value: unknown): string {
    return isTwilioCreateMessageRecipientOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageRecipient', 'undefined']));
}
