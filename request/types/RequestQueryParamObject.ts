import RequestParamType, {isRequestParamType} from "./RequestParamType";
import InterfaceUtils from "../RequestInterfaceUtils";
import {isString} from "../../modules/lodash";

export interface RequestQueryParamObject {

    type: RequestParamType;
    queryParam: string;

}

export function isRequestQueryParamObject(value: any): value is RequestQueryParamObject {
    return (
        InterfaceUtils.isObject(value)
        && InterfaceUtils.hasPropertyQueryParam(value) && isString(value.queryParam)
        && InterfaceUtils.hasPropertyType(value) && isRequestParamType(value.type)
        && value.type !== RequestParamType.BODY
    );
}