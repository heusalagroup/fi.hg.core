// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum TwilioMessageStatus {
    ACCEPTED = "accepted",
    SCHEDULED = "scheduled",
    CANCELED = "canceled",
    QUEUED = "queued",
    SENDING = "sending",
    SENT = "sent",
    FAILED = "failed",
    DELIVERED = "delivered",
    UNDELIVERED = "undelivered",
    RECEIVING = "receiving",
    RECEIVED = "received",
    READ = "read",
}

export function isTwilioMessageStatus (value: unknown) : value is TwilioMessageStatus {
    return isEnum(TwilioMessageStatus, value);
}

export function explainTwilioMessageStatus (value : unknown) : string {
    return explainEnum("TwilioMessageStatus", TwilioMessageStatus, isTwilioMessageStatus, value);
}

export function stringifyTwilioMessageStatus (value : TwilioMessageStatus) : string {
    return stringifyEnum(TwilioMessageStatus, value);
}

export function parseTwilioMessageStatus (value: any) : TwilioMessageStatus | undefined {
    return parseEnum(TwilioMessageStatus, value) as TwilioMessageStatus | undefined;
}

export function isTwilioMessageStatusOrUndefined (value: unknown): value is TwilioMessageStatus | undefined {
    return isUndefined(value) || isTwilioMessageStatus(value);
}

export function explainTwilioMessageStatusOrUndefined (value: unknown): string {
    return isTwilioMessageStatusOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioMessageStatus', 'undefined']));
}
