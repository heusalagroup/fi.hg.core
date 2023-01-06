// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { NativeMessageType } from "./NativeMessageType";
import { explain, explainNot, explainOk, explainProperty } from "../types/explain";
import { explainString, isString } from "../types/String";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../types/OtherKeys";

/**
 * Intended to be sent from webview to the native application to send a text
 * body
 */
export interface NativeSmsMessage {

    readonly type : NativeMessageType.SEND_SMS;

    /**
     * Target phone number
     */
    readonly to : string;

    /**
     * Message content
     */
    readonly body : string;

}

export function createNativeSmsMessage (
    to: string,
    body : string
) : NativeSmsMessage {
    return {
        type: NativeMessageType.SEND_SMS,
        to,
        body
    };
}

export function isNativeSmsMessage (value: any) : value is NativeSmsMessage {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'type',
            'to',
            'body'
        ])
        && value?.type === NativeMessageType.SEND_SMS
        && isString(value?.to)
        && isString(value?.body)
    );
}

export function explainNativeSmsMessage (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'type',
                'to',
                'body'
            ])
            , explainProperty("type", value?.type === NativeMessageType.SEND_SMS ? explainOk() : explainNot('NativeMessageType.SEND_SMS') )
            , explainProperty("to", explainString(value?.to))
            , explainProperty("body", explainString(value?.body))
        ]
    );
}

export function stringifyNativeSmsMessage (value : NativeSmsMessage) : string {
    return `NativeSmsMessage(${value})`;
}

export function parseNativeSmsMessage (value: any) : NativeSmsMessage | undefined {
    if (isNativeSmsMessage(value)) return value;
    return undefined;
}
