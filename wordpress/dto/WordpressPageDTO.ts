import {hasNoOtherKeysInDevelopment, isRegularObject} from "../../modules/lodash";
import { WP_Types} from "./WordpressTypesDTO";

export interface WordpressPageDTO {
    title:object;
    content:object;
    date?: string | null;
    status?: WP_Types;
    id?:string;
    generated_slug?:string;
    permalink_template?:string;
    parent?:number;
    author?:number;
    excerpt?:object;
    featured_media?:number;
    comment_status?:string;
    ping_status?:string;
    menu_order?:number;
    meta?:object;
    template?:string;
    type?:string;
    password?:string;
    date_gtm?: string | null;
    slug?: string;
}

export function isWordpressPageDTO (value:any): value is WordpressPageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'Title',
            'Content',
        ])
        && isRegularObject(value?.title)
        && isRegularObject(value?.content)
    )
}