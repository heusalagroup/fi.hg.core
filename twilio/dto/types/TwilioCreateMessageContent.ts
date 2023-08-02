// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";
import { isTwilioCreateMessageBody, TwilioCreateMessageBody } from "./TwilioCreateMessageBody";
import { isTwilioCreateMessageContentSid, TwilioCreateMessageContentSid } from "./TwilioCreateMessageContentSid";
import { isTwilioCreateMessageMediaUrl, TwilioCreateMessageMediaUrl } from "./TwilioCreateMessageMediaUrl";

export type TwilioCreateMessageContent = TwilioCreateMessageMediaUrl | TwilioCreateMessageBody | TwilioCreateMessageContentSid;

export function createTwilioCreateMessageContent (
    content : TwilioCreateMessageMediaUrl | TwilioCreateMessageBody | TwilioCreateMessageContentSid
) : TwilioCreateMessageContent {
    return {
        ...content
    };
}

export function isTwilioCreateMessageContent (value: unknown) : value is TwilioCreateMessageContent {
    return (
        isTwilioCreateMessageMediaUrl(value)
        || isTwilioCreateMessageBody(value)
        || isTwilioCreateMessageContentSid(value)
    );
}

export function explainTwilioCreateMessageContent (value: any) : string {
    return isTwilioCreateMessageContent(value) ? explainOk() : explainNot('TwilioCreateMessageContent');
}

export function parseTwilioCreateMessageContent (value: unknown) : TwilioCreateMessageContent | undefined {
    if (isTwilioCreateMessageContent(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageContentOrUndefined (value: unknown): value is TwilioCreateMessageContent | undefined {
    return isUndefined(value) || isTwilioCreateMessageContent(value);
}

export function explainTwilioCreateMessageContentOrUndefined (value: unknown): string {
    return isTwilioCreateMessageContentOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageContent', 'undefined']));
}
