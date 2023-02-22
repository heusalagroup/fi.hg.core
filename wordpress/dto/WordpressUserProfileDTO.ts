// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WordpressEnum } from "./WordpressTypesDTO";
import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";

export interface WordpressUserProfileDTO {
    id: number;
    author: string;
    date: string;
    excerpt: string;
    title: string;
    content: string;
    slug: string;
    status: WordpressEnum;
    description: string[];
    "extra Information": string[];
    featured_image?: {
        thumbnail: string;
        medium: string;
        large: string;
    }
}

export function isWordpressUserprofileDTO (value:any): value is WordpressUserProfileDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'title',
            'content',
            'id',
            'date',
            'status',
            'extra Information',
            'date_gtm',
            'slug',
            'featured_image'
        ])
        && isString(value?.id)
        && isRegularObject(value?.title)
        && isRegularObject(value?.content)
    )
}
