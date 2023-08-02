// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { isTwilioCreateMessageContent, TwilioCreateMessageContent } from "./types/TwilioCreateMessageContent";
import { isTwilioCreateMessageRecipient, TwilioCreateMessageRecipient } from "./types/TwilioCreateMessageRecipient";
import { isTwilioCreateMessageSender, TwilioCreateMessageSender } from "./types/TwilioCreateMessageSender";

export type TwilioCreateMessageDTO = (
    TwilioCreateMessageRecipient
    & TwilioCreateMessageSender
    & TwilioCreateMessageContent
);

export function createTwilioCreateMessageDTO (
    recipient : TwilioCreateMessageRecipient,
    sender    : TwilioCreateMessageSender,
    content   : TwilioCreateMessageContent
) : TwilioCreateMessageDTO {
    return {
        ...recipient,
        ...sender,
        ...content
    };
}

export function isTwilioCreateMessageDTO (value: unknown) : value is TwilioCreateMessageDTO {
    return (
        isTwilioCreateMessageRecipient(value)
        && isTwilioCreateMessageSender(value)
        && isTwilioCreateMessageContent(value)
    );
}

export function explainTwilioCreateMessageDTO (value: any) : string {
    return isTwilioCreateMessageDTO(value) ? explainOk() : explainNot('TwilioCreateMessageDTO');
}

export function parseTwilioCreateMessageDTO (value: unknown) : TwilioCreateMessageDTO | undefined {
    if (isTwilioCreateMessageDTO(value)) return value;
    return undefined;
}

export function isTwilioCreateMessageDTOOrUndefined (value: unknown): value is TwilioCreateMessageDTO | undefined {
    return isUndefined(value) || isTwilioCreateMessageDTO(value);
}

export function explainTwilioCreateMessageDTOOrUndefined (value: unknown): string {
    return isTwilioCreateMessageDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioCreateMessageDTO', 'undefined']));
}

