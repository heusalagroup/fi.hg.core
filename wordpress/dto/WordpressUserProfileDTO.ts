// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WpPageStatus } from "./WpPageStatus";
import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";

export interface WordpressUserProfileDTO {
    title:{rendered:string, protected:boolean};
    content:{rendered:string, protected:boolean};
    id?:string;
    slug?: string;
    description?:string;
    date?:string;
    "extra Information"?: string[];
    status?: WpPageStatus;
    featured_image?: {
        thumbnail : string;
        medium :string;
        large : string;
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
