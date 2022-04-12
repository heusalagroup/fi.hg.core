import { RequestParamObjectType } from "./RequestParamObjectType";
import {DefaultHeaderMapValuesType, isDefaultHeaderMapValuesType} from "./DefaultHeaderMapValuesType";

export interface RequestHeaderMapParamObject {

    objectType     : RequestParamObjectType.REQUEST_HEADER_MAP;
    defaultValues ?: DefaultHeaderMapValuesType;

}

export function isRequestHeaderMapParamObject (value: any): value is RequestHeaderMapParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.REQUEST_HEADER_MAP
        && ( value?.defaultValues === undefined || isDefaultHeaderMapValuesType(value?.defaultValues) )
    );
}


