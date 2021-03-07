// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestParamType, {isRequestParamType} from "./RequestParamType";
import InterfaceUtils from "../RequestInterfaceUtils";

export interface RequestBodyParamObject {

    type: RequestParamType.BODY;

}

export function isRequestBodyParamObject(value: any): value is RequestBodyParamObject {
    return (
        InterfaceUtils.isObject(value)
        && InterfaceUtils.hasPropertyType(value) && isRequestParamType(value.type)
        && value.type === RequestParamType.BODY
    );
}