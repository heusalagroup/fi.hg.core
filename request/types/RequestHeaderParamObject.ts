import RequestParamValueType, {isRequestParamValueType} from "./RequestParamValueType";
import {isBoolean, isString} from "../../modules/lodash";
import RequestParamObjectType from "./RequestParamObjectType";

export interface RequestHeaderParamObject {

    objectType    : RequestParamObjectType.REQUEST_HEADER;
    valueType     : RequestParamValueType;
    headerName    : string;
    isRequired    : boolean;
    defaultValue  : string | undefined;

}

export function isRequestHeaderParamObject (value: any): value is RequestHeaderParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.REQUEST_HEADER
        && isString(value?.headerName)
        && isBoolean(value?.isRequired)
        && isRequestParamValueType(value?.valueType)
        && ( value?.defaultValue === undefined || isString(value?.defaultValue) )
    );
}

export default RequestHeaderParamObject;
