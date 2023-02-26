// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainWpPageStatus, isWpPageStatus, WpPageStatus } from "./WpPageStatus";
import { explainString, isString } from "../../types/String";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { explainWpImageDTO, isWpImageDTO, WpImageDTO } from "./WpImageDTO";
import { explainStringArray, isStringArray } from "../../types/StringArray";
import { explainNumber, isNumber } from "../../types/Number";

/**
 * This is the data transfer object for /wp-json/wp/v3/userprofiles end point's items.
 */
export interface WpUserProfileDTO {
    readonly title : string;
    readonly content : string;
    readonly excerpt : string;
    readonly id : number;
    readonly slug : string;
    readonly author : string;
    readonly description : readonly string[];
    readonly date : string;
    readonly "extra Information" : readonly string[];
    readonly status : WpPageStatus;
    readonly featured_image : WpImageDTO;
}

export function isWpUserProfileDTO (value: any): value is WpUserProfileDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'title',
            'content',
            'excerpt',
            'id',
            'author',
            'description',
            'date',
            'status',
            'extra Information',
            'slug',
            'featured_image'
        ])
        && isString(value?.title)
        && isString(value?.content)
        && isString(value?.excerpt)
        && isString(value?.author)
        && isStringArray(value?.description)
        && isNumber(value?.id)
        && isString(value?.date)
        && isStringArray(value['extra Information'])
        && isString(value?.slug)
        && isWpPageStatus(value?.status)
        && isWpImageDTO(value?.featured_image)
    )
}

export function explainWpUserProfileDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'title',
                'content',
                'excerpt',
                'author',
                'description',
                'id',
                'date',
                'status',
                'extra Information',
                'slug',
                'featured_image'
            ])
            , explainProperty("title", explainString(value?.title))
            , explainProperty("content", explainString(value?.content))
            , explainProperty("excerpt", explainString(value?.excerpt))
            , explainProperty("author", explainString(value?.author))
            , explainProperty("description", explainStringArray(value?.description))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("extra", explainStringArray(value['extra Information']))
            , explainProperty("slug", explainString(value?.slug))
            , explainProperty("status", explainWpPageStatus(value?.status))
            , explainProperty("featured_image", explainWpImageDTO(value?.featured_image))
        ]
    );
}
