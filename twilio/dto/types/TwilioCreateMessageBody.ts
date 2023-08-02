// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../types/explain";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainString, isString } from "../../../types/String";
import { isUndefined } from "../../../types/undefined";

/**
 * @Example
 *   {"Body": "Hi there"}
 */
export interface TwilioCreateMessageBody {
    readonly Body: string;
}

export function createTwilioCreateMessageBody (
    Body : string
) : TwilioCreateMessageBody {
    return {
        Body
    };
}

export function isTwilioCreateMessageBody (value: unknown) : value is TwilioCreateMessageBody {
    return (
        isRegularObject(value)
        && isString(value?.Body)
    );
}

export function explainTwilioCreateMessageBody (value: any) : string {
    return explain(
        [
            explainRegularObject(value)
            , explainProperty("Body", explainString(value?.Body))
        ]
    );
}

export function parseTwilioCreateMessageBody (value: unknown) : TwilioCreateMessageBody | undefined {
    if (isTwilioCreateMessageBody(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageBodyOrUndefined (value: unknown): value is TwilioCreateMessageBody | undefined {
    return isUndefined(value) || isTwilioCreateMessageBody(value);
}

export function explainTwilioCreateMessageBodyOrUndefined (value: unknown): string {
    return isTwilioCreateMessageBodyOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageBody', 'undefined']));
}
