// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestParamValueType, isRequestParamValueType} from "./RequestParamValueType";
import { RequestParamObjectType } from "./RequestParamObjectType";
import { isStringOrUndefined } from "../../types/String";

export interface RequestQueryParamObject {
    objectType : RequestParamObjectType.QUERY_PARAM;
    valueType  : RequestParamValueType;

    /**
     * If undefined, result will be an object of all query parameters provided
     */
    queryParam : string | undefined;

}

export function isRequestQueryParamObject(value: any): value is RequestQueryParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.QUERY_PARAM
        && isStringOrUndefined(value?.queryParam)
        && isRequestParamValueType(value?.valueType)
    );
}


