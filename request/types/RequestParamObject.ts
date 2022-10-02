// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestQueryParamObject, isRequestQueryParamObject} from "./RequestQueryParamObject";
import { RequestBodyParamObject, isRequestBodyParamObject} from "./RequestBodyParamObject";
import { RequestHeaderParamObject, isRequestHeaderParamObject} from "./RequestHeaderParamObject";
import { RequestHeaderMapParamObject, isRequestHeaderMapParamObject} from "./RequestHeaderMapParamObject";
import { RequestPathVariableParamObject, isRequestPathVariableParamObject} from "./RequestPathVariableParamObject";
import { RequestPathVariableMapParamObject, isRequestPathVariableMapParamObject} from "./RequestPathVariableMapParamObject";
import { RequestModelAttributeParamObject, isRequestModelAttributeParamObject} from "./RequestModelAttributeParamObject";

export type RequestParamObject = (
    RequestQueryParamObject
    | RequestBodyParamObject
    | RequestHeaderParamObject
    | RequestHeaderMapParamObject
    | RequestPathVariableParamObject
    | RequestPathVariableMapParamObject
    | RequestModelAttributeParamObject
);

export function isRequestParamObject(value: any): value is RequestParamObject {
    return (
        isRequestQueryParamObject(value)
        || isRequestBodyParamObject(value)
        || isRequestHeaderParamObject(value)
        || isRequestHeaderMapParamObject(value)
        || isRequestPathVariableParamObject(value)
        || isRequestPathVariableMapParamObject(value)
        || isRequestModelAttributeParamObject(value)
    );
}


