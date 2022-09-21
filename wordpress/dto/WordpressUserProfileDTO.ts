import {hasNoOtherKeysInDevelopment, isRegularObject, isString} from "../../modules/lodash";
import { WP_Types} from "./WordpressTypesDTO";

export interface WordpressUserProfileDTO {
    title:{rendered:string, protected:boolean};
    content:{rendered:string, protected:boolean};
    id?:string;
    slug?: string;
    description?:string;
    date?:string;
    "extra Information"?: string[];
    status?: WP_Types;
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