// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestParamValueType, isRequestParamValueType} from "./RequestParamValueType";
import { RequestParamObjectType } from "./RequestParamObjectType";

export interface RequestBodyParamObject {

    objectType : RequestParamObjectType.REQUEST_BODY;
    valueType  : RequestParamValueType;

}

export function isRequestBodyParamObject (value: any): value is RequestBodyParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.REQUEST_BODY
        && isRequestParamValueType(value?.valueType)
    );
}


