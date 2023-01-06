// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WordpressEnum } from "./WordpressTypesDTO";
import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";

export interface WordpressPageDTO {
    title:{rendered:string, protected:boolean};
    content:{rendered:string, protected:boolean};
    excerpt?:{rendered?:string, protected?:boolean};
    type?:string;
    id?:string;
    date?: string | null;
    status?: WordpressEnum;
    generated_slug?:string;
    permalink_template?:string;
    parent?:number;
    author?:number;
    featured_media?:number;
    comment_status?:string;
    ping_status?:string;
    menu_order?:number;
    meta?:object;
    template?:string;
    password?:string;
    date_gtm?: string | null;
    slug?: string;
}

export function isWordpressPageDTO (value:any): value is WordpressPageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'title',
            'content',
            'type',
            'id',
            'date',
            'status',
            'generated_slug',
            'permalink_template',
            'parent',
            'author',
            'excerpt',
            'featured_media',
            'comment_status',
            'ping_status',
            'menu_order',
            'meta',
            'template',
            'password',
            'date_gtm',
            'slug'
        ])
        && isString(value?.id)
        && isRegularObject(value?.title)
        && isRegularObject(value?.content)
    )
}
