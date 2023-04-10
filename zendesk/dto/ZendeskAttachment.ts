// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainStringOrNullOrUndefined, explainStringOrNumberOrNullOrUndefined, isStringOrNullOrUndefined, isStringOrNumberOrNullOrUndefined } from "../../types/String";
import { explainBooleanOrNullOrUndefined, isBooleanOrNullOrUndefined } from "../../types/Boolean";
import { explainNumber, explainNumberOrNullOrUndefined, isNumber, isNumberOrNullOrUndefined } from "../../types/Number";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../types/Array";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskAttachment {
    readonly content_type ?: string | null | undefined;
    readonly content_url ?: string | null | undefined;
    readonly deleted ?: boolean | null | undefined;
    readonly file_name ?: string | null | undefined;
    readonly height ?: string | null | undefined;
    readonly id : number;
    readonly inline ?: boolean | null | undefined;
    readonly malware_access_override ?: boolean | null | undefined;
    readonly malware_scan_result ?: string | null | undefined;
    readonly mapped_content_url ?: string | null | undefined;
    readonly size ?: number | null | undefined;
    readonly thumbnails ?: readonly ZendeskAttachment[];
    readonly url ?: string | null | undefined;
    readonly width ?: string | null | undefined;

}

export function createZendeskAttachment (
    id : number,
    content_type ?: string | null | undefined,
    content_url ?: string | null | undefined,
    deleted ?: boolean | null | undefined,
    file_name ?: string | null | undefined,
    height ?: string | null | undefined,
    inline ?: boolean | null | undefined,
    malware_access_override ?: boolean | null | undefined,
    malware_scan_result ?: string | null | undefined,
    mapped_content_url ?: string | null | undefined,
    size ?: number | null | undefined,
    thumbnails ?: readonly ZendeskAttachment[],
    url ?: string | null | undefined,
    width ?: string | null | undefined,
) : ZendeskAttachment {
    return {
        content_type,
        content_url,
        deleted,
        file_name,
        height,
        id,
        inline,
        malware_access_override,
        malware_scan_result,
        mapped_content_url,
        size,
        thumbnails,
        url,
        width
    };
}

export function isZendeskAttachment (value: unknown) : value is ZendeskAttachment {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'content_type',
            'content_url',
            'deleted',
            'file_name',
            'height',
            'id',
            'inline',
            'malware_access_override',
            'malware_scan_result',
            'mapped_content_url',
            'size',
            'thumbnails',
            'url',
            'width'
        ])
        && isStringOrNullOrUndefined(value?.content_type)
        && isStringOrNullOrUndefined(value?.content_url)
        && isBooleanOrNullOrUndefined(value?.deleted)
        && isStringOrNullOrUndefined(value?.file_name)
        && isStringOrNumberOrNullOrUndefined(value?.height)
        && isNumber(value?.id)
        && isBooleanOrNullOrUndefined(value?.inline)
        && isBooleanOrNullOrUndefined(value?.malware_access_override)
        && isStringOrNullOrUndefined(value?.malware_scan_result)
        && isStringOrNullOrUndefined(value?.mapped_content_url)
        && isNumberOrNullOrUndefined(value?.size)
        && isArrayOfOrUndefined<ZendeskAttachment>(value?.thumbnails, isZendeskAttachment)
        && isStringOrNullOrUndefined(value?.url)
        && isStringOrNumberOrNullOrUndefined(value?.width)
    );
}

export function explainZendeskAttachment (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'content_type',
                'content_url',
                'deleted',
                'file_name',
                'height',
                'id',
                'inline',
                'malware_access_override',
                'malware_scan_result',
                'mapped_content_url',
                'size',
                'thumbnails',
                'url',
                'width'
            ])
            , explainProperty("content_type", explainStringOrNullOrUndefined(value?.content_type))
            , explainProperty("content_url", explainStringOrNullOrUndefined(value?.content_url))
            , explainProperty("deleted", explainBooleanOrNullOrUndefined(value?.deleted))
            , explainProperty("file_name", explainStringOrNullOrUndefined(value?.file_name))
            , explainProperty("height", explainStringOrNumberOrNullOrUndefined(value?.height))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("inline", explainBooleanOrNullOrUndefined(value?.inline))
            , explainProperty("malware_access_override", explainBooleanOrNullOrUndefined(value?.malware_access_override))
            , explainProperty("malware_scan_result", explainStringOrNullOrUndefined(value?.malware_scan_result))
            , explainProperty("mapped_content_url", explainStringOrNullOrUndefined(value?.mapped_content_url))
            , explainProperty("size", explainNumberOrNullOrUndefined(value?.size))
            , explainProperty("thumbnails", explainArrayOfOrUndefined<ZendeskAttachment>("ZendeskAttachment", explainZendeskAttachment, value?.thumbnails, isZendeskAttachment))
            , explainProperty("url", explainStringOrNullOrUndefined(value?.url))
            , explainProperty("width", explainStringOrNumberOrNullOrUndefined(value?.width))
        ]
    );
}

export function stringifyZendeskAttachment (value : ZendeskAttachment) : string {
    return `ZendeskAttachment(${value})`;
}

export function parseZendeskAttachment (value: unknown) : ZendeskAttachment | undefined {
    if (isZendeskAttachment(value)) return value;
    return undefined;
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAttachmentOrUndefined (value: unknown): value is ZendeskAttachment | undefined {
    return isZendeskAttachment(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAttachmentOrUndefined (value: any): string {
    return isZendeskAttachmentOrUndefined(value) ? explainOk() : explainNot('ZendeskAttachment or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAttachmentOrNullOrUndefined (value: unknown): value is ZendeskAttachment | undefined | null {
    return isZendeskAttachment(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAttachmentOrNullOrUndefined (value: any): string {
    return isZendeskAttachmentOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskAttachment or undefined or null');
}
