import {isRequestQueryParamObject, RequestQueryParamObject} from "./RequestQueryParamObject";
import {isRequestBodyParamObject, RequestBodyParamObject} from "./RequestBodyParamObject";

export type RequestParamObject = RequestQueryParamObject | RequestBodyParamObject;

export function isRequestParamObject(value: any): value is RequestParamObject {
    return (
        isRequestQueryParamObject(value)
        || isRequestBodyParamObject(value)
    );
}