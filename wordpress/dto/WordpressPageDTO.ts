import {hasNoOtherKeysInDevelopment, isRegularObject, isString} from "../../modules/lodash";
import { WP_Types} from "./WordpressTypesDTO";

export interface WordpressPageDTO {
    title:{rendered:string, protected:boolean};
    content:{rendered:string, protected:boolean};
    type?:string;
    id?:string;
    date?: string | null;
    status?: WP_Types;
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
    password?:string;
    date_gtm?: string | null;
    slug?: string;
}

export function isWordpressPageDTO (value:any): value is WordpressPageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'title',
            'content',
            'type',
        ])
        && isString(value?.id)
        && isRegularObject(value?.title)
        && isRegularObject(value?.content)
    )
}