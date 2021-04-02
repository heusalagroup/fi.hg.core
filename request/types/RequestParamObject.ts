// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestQueryParamObject, {isRequestQueryParamObject} from "./RequestQueryParamObject";
import RequestBodyParamObject, {isRequestBodyParamObject} from "./RequestBodyParamObject";
import RequestHeaderParamObject, {isRequestHeaderParamObject} from "./RequestHeaderParamObject";
import RequestHeaderMapParamObject, {isRequestHeaderMapParamObject} from "./RequestHeaderMapParamObject";
import RequestPathVariableParamObject, {isRequestPathVariableParamObject} from "./RequestPathVariableParamObject";
import RequestPathVariableMapParamObject, {isRequestPathVariableMapParamObject} from "./RequestPathVariableMapParamObject";

export type RequestParamObject = (
    RequestQueryParamObject
    | RequestBodyParamObject
    | RequestHeaderParamObject
    | RequestHeaderMapParamObject
    | RequestPathVariableParamObject
    | RequestPathVariableMapParamObject
);

export function isRequestParamObject(value: any): value is RequestParamObject {
    return (
        isRequestQueryParamObject(value)
        || isRequestBodyParamObject(value)
        || isRequestHeaderParamObject(value)
        || isRequestHeaderMapParamObject(value)
        || isRequestPathVariableParamObject(value)
        || isRequestPathVariableMapParamObject(value)
    );
}

export default RequestParamObject;
