// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestQueryParamObject, {isRequestQueryParamObject} from "./RequestQueryParamObject";
import RequestBodyParamObject, {isRequestBodyParamObject} from "./RequestBodyParamObject";
import RequestHeaderParamObject, {isRequestHeaderParamObject} from "./RequestHeaderParamObject";
import RequestHeaderMapParamObject, {isRequestHeaderMapParamObject} from "./RequestHeaderMapParamObject";

export type RequestParamObject = (
    RequestQueryParamObject
    | RequestBodyParamObject
    | RequestHeaderParamObject
    | RequestHeaderMapParamObject
);

export function isRequestParamObject(value: any): value is RequestParamObject {
    return (
        isRequestQueryParamObject(value)
        || isRequestBodyParamObject(value)
        || isRequestHeaderParamObject(value)
        || isRequestHeaderMapParamObject(value)
    );
}

export default RequestParamObject;
