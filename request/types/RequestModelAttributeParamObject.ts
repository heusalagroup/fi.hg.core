// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestParamValueType, isRequestParamValueType} from "./RequestParamValueType";
import { RequestParamObjectType } from "./RequestParamObjectType";
import { isString } from "../../types/String";

export interface RequestModelAttributeParamObject {

    objectType    : RequestParamObjectType.MODEL_ATTRIBUTE;
    valueType     : RequestParamValueType;
    attributeName : string;

}

export function isRequestModelAttributeParamObject (value: any): value is RequestModelAttributeParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.MODEL_ATTRIBUTE
        && isString(value?.attributeName)
        && isRequestParamValueType(value?.valueType)
    );
}


