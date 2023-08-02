// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum TwilioMessageDirection {

    /**
     * `"inbound"` for incoming messages
     */
    INBOUND = "inbound",

    /**
     * `"outbound-api"` for messages created by the REST API
     */
    OUTBOUND_API = "outbound-api",

    /**
     * `"outbound-call"` for messages created during a call
     */
    OUTBOUND_CALL = "outbound-call",

    /**
     * `"outbound-reply"` for messages created in response to an incoming message
     */
    OUTBOUND_REPLY = "outbound-reply",

}

export function isTwilioMessageDirection (value: unknown) : value is TwilioMessageDirection {
    return isEnum(TwilioMessageDirection, value);
}

export function explainTwilioMessageDirection (value : unknown) : string {
    return explainEnum("TwilioMessageDirection", TwilioMessageDirection, isTwilioMessageDirection, value);
}

export function stringifyTwilioMessageDirection (value : TwilioMessageDirection) : string {
    return stringifyEnum(TwilioMessageDirection, value);
}

export function parseTwilioMessageDirection (value: any) : TwilioMessageDirection | undefined {
    return parseEnum(TwilioMessageDirection, value) as TwilioMessageDirection | undefined;
}

export function isTwilioMessageDirectionOrUndefined (value: unknown): value is TwilioMessageDirection | undefined {
    return isUndefined(value) || isTwilioMessageDirection(value);
}

export function explainTwilioMessageDirectionOrUndefined (value: unknown): string {
    return isTwilioMessageDirectionOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioMessageDirection', 'undefined']));
}
