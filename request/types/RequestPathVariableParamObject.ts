// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestParamValueType, isRequestParamValueType} from "./RequestParamValueType";
import { isBoolean } from "../../types/Boolean";
import { RequestParamObjectType } from "./RequestParamObjectType";
import { isString } from "../../types/String";

export interface RequestPathVariableParamObject {

    readonly objectType    : RequestParamObjectType.PATH_VARIABLE;
    readonly valueType     : RequestParamValueType;
    readonly variableName  : string;
    readonly isRequired    : boolean;
    readonly defaultValue  : string | undefined;
    readonly decodeValue   : boolean;

}

export function isRequestPathVariableParamObject (value: any): value is RequestPathVariableParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.PATH_VARIABLE
        && isString(value?.variableName)
        && isBoolean(value?.isRequired)
        && isRequestParamValueType(value?.valueType)
        && ( value?.defaultValue === undefined || isString(value?.defaultValue) )
    );
}


