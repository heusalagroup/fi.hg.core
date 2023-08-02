// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";
import { isTwilioCreateMessageFrom, TwilioCreateMessageFrom } from "./TwilioCreateMessageFrom";
import { isTwilioCreateMessageMessagingServiceSid, TwilioCreateMessageMessagingServiceSid } from "./TwilioCreateMessageMessagingServiceSid";

export type TwilioCreateMessageSender = (
    TwilioCreateMessageFrom
    | TwilioCreateMessageMessagingServiceSid
);

export function createTwilioCreateMessageSender (
    sender : TwilioCreateMessageFrom | TwilioCreateMessageMessagingServiceSid
) : TwilioCreateMessageSender {
    return {
        ...sender
    };
}

export function isTwilioCreateMessageSender (value: unknown) : value is TwilioCreateMessageSender {
    return (
        isTwilioCreateMessageFrom(value)
        || isTwilioCreateMessageMessagingServiceSid(value)
    );
}

export function explainTwilioCreateMessageSender (value: any) : string {
    return isTwilioCreateMessageSender(value) ? explainOk() : explainNot('TwilioCreateMessageSender');
}

export function parseTwilioCreateMessageSender (value: unknown) : TwilioCreateMessageSender | undefined {
    if (isTwilioCreateMessageSender(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageSenderOrUndefined (value: unknown): value is TwilioCreateMessageSender | undefined {
    return isUndefined(value) || isTwilioCreateMessageSender(value);
}

export function explainTwilioCreateMessageSenderOrUndefined (value: unknown): string {
    return isTwilioCreateMessageSenderOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageSender', 'undefined']));
}
