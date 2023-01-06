// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestParamValueType, isRequestParamValueType} from "./RequestParamValueType";
import { isBoolean } from "../../types/Boolean";
import { RequestParamObjectType } from "./RequestParamObjectType";
import { isString } from "../../types/String";

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


