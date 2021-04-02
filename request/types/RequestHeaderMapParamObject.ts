import RequestParamValueType, {isRequestParamValueType} from "./RequestParamValueType";
import {every, isArray, isObject, isString} from "../../modules/lodash";
import RequestInterfaceUtils from "../RequestInterfaceUtils";
import RequestParamObjectType from "./RequestParamObjectType";

export type DefaultHeaderMapValuesType = {[key: string] : string | string[]};

export function isDefaultHeaderMapValuesType (value : any) : value is DefaultHeaderMapValuesType {

    return (
        !!value
        && isObject(value)
        && RequestInterfaceUtils.everyPropertyIs<string>(
            value,
            (item: any) : boolean => {
                return (
                    isString(item)
                    || ( isArray(item) && every(item, isString) )
                );
            }
        )
    );

}

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

export default RequestHeaderMapParamObject;
