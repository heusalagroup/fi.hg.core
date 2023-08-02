// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainReadonlyJsonObject, isReadonlyJsonObject, ReadonlyJsonObject } from "../../Json";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNumberOrNull, isNumberOrNull } from "../../types/Number";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainString, explainStringOrNull, isString, isStringOrNull } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { explainTwilioMessageDirection, isTwilioMessageDirection, TwilioMessageDirection } from "./types/TwilioMessageDirection";
import { explainTwilioMessageStatus, isTwilioMessageStatus, TwilioMessageStatus } from "./types/TwilioMessageStatus";

/**
 * @example
 *     {
 *         "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 *         "api_version": "2010-04-01",
 *         "body": "Hi there",
 *         "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
 *         "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
 *         "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
 *         "direction": "outbound-api",
 *         "error_code": null,
 *         "error_message": null,
 *         "from": "+15557122661",
 *         "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 *         "num_media": "0",
 *         "num_segments": "1",
 *         "price": null,
 *         "price_unit": null,
 *         "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 *         "status": "sent",
 *         "subresource_uris": {
 *           "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
 *         },
 *         "to": "+15558675310",
 *         "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
 *    }
 */
export interface TwilioMessageDTO {
    readonly account_sid: string;
    readonly api_version: string;
    readonly body: string;
    readonly date_created: string;
    readonly date_sent: string | null;
    readonly date_updated: string;
    readonly direction: TwilioMessageDirection;
    readonly error_code: number | null;
    readonly error_message: string | null;
    readonly from: string;
    readonly messaging_service_sid: string | null;
    readonly num_media: string;
    readonly num_segments: string;
    readonly price: string | null;
    readonly price_unit: string | null;
    readonly sid: string;
    readonly status: TwilioMessageStatus;
    readonly subresource_uris: ReadonlyJsonObject;
    readonly to: string;
    readonly uri: string;
}

export function createTwilioMessageDTO (
    account_sid: string,
    api_version: string,
    body: string,
    date_created: string,
    date_sent: string | null,
    date_updated: string,
    direction: TwilioMessageDirection,
    error_code: number | null,
    error_message: string | null,
    from: string,
    messaging_service_sid: string | null,
    num_media: string,
    num_segments: string,
    price: string | null,
    price_unit: string | null,
    sid: string,
    status: TwilioMessageStatus,
    subresource_uris: ReadonlyJsonObject,
    to: string,
    uri: string,
) : TwilioMessageDTO {
    return {
        account_sid,
        api_version,
        body,
        date_created,
        date_sent,
        date_updated,
        direction,
        error_code,
        error_message,
        from,
        messaging_service_sid,
        num_media,
        num_segments,
        price,
        price_unit,
        sid,
        status,
        subresource_uris,
        to,
        uri
    };
}

export function isTwilioMessageDTO (value: unknown) : value is TwilioMessageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'account_sid',
            'api_version',
            'body',
            'date_created',
            'date_sent',
            'date_updated',
            'direction',
            'error_code',
            'error_message',
            'from',
            'messaging_service_sid',
            'num_media',
            'num_segments',
            'price',
            'price_unit',
            'sid',
            'status',
            'subresource_uris',
            'to',
            'uri'
        ])
        && isString(value?.account_sid)
        && isString(value?.api_version)
        && isString(value?.body)
        && isString(value?.date_created)
        && isStringOrNull(value?.date_sent)
        && isString(value?.date_updated)
        && isTwilioMessageDirection(value?.direction)
        && isNumberOrNull(value?.error_code)
        && isStringOrNull(value?.error_message)
        && isString(value?.from)
        && isStringOrNull(value?.messaging_service_sid)
        && isString(value?.num_media)
        && isString(value?.num_segments)
        && isStringOrNull(value?.price)
        && isStringOrNull(value?.price_unit)
        && isString(value?.sid)
        && isTwilioMessageStatus(value?.status)
        && isReadonlyJsonObject(value?.subresource_uris)
        && isString(value?.to)
        && isString(value?.uri)
    );
}

export function explainTwilioMessageDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'account_sid',
                'api_version',
                'body',
                'date_created',
                'date_sent',
                'date_updated',
                'direction',
                'error_code',
                'error_message',
                'from',
                'messaging_service_sid',
                'num_media',
                'num_segments',
                'price',
                'price_unit',
                'sid',
                'status',
                'subresource_uris',
                'to',
                'uri'
            ])
            , explainProperty("account_sid", explainString(value?.account_sid))
            , explainProperty("api_version", explainString(value?.api_version))
            , explainProperty("body", explainString(value?.body))
            , explainProperty("date_created", explainString(value?.date_created))
            , explainProperty("date_sent", explainStringOrNull(value?.date_sent))
            , explainProperty("date_updated", explainString(value?.date_updated))
            , explainProperty("direction", explainTwilioMessageDirection(value?.direction))
            , explainProperty("error_code", explainNumberOrNull(value?.error_code))
            , explainProperty("error_message", explainStringOrNull(value?.error_message))
            , explainProperty("from", explainString(value?.from))
            , explainProperty("messaging_service_sid", explainStringOrNull(value?.messaging_service_sid))
            , explainProperty("num_media", explainString(value?.num_media))
            , explainProperty("num_segments", explainString(value?.num_segments))
            , explainProperty("price", explainStringOrNull(value?.price))
            , explainProperty("price_unit", explainStringOrNull(value?.price_unit))
            , explainProperty("sid", explainString(value?.sid))
            , explainProperty("status", explainTwilioMessageStatus(value?.status))
            , explainProperty("subresource_uris", explainReadonlyJsonObject(value?.subresource_uris))
            , explainProperty("to", explainString(value?.to))
            , explainProperty("uri", explainString(value?.uri))
        ]
    );
}

export function parseTwilioMessageDTO (value: unknown) : TwilioMessageDTO | undefined {
    if (isTwilioMessageDTO(value)) return value;
    return undefined;
}

export function isTwilioMessageDTOOrUndefined (value: unknown): value is TwilioMessageDTO | undefined {
    return isUndefined(value) || isTwilioMessageDTO(value);
}

export function explainTwilioMessageDTOOrUndefined (value: unknown): string {
    return isTwilioMessageDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['TwilioMessageDTO', 'undefined']));
}
