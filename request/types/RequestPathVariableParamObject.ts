import RequestParamValueType, {isRequestParamValueType} from "./RequestParamValueType";
import {isBoolean, isString} from "../../modules/lodash";
import RequestParamObjectType from "./RequestParamObjectType";

export interface RequestPathVariableParamObject {

    objectType    : RequestParamObjectType.PATH_VARIABLE;
    valueType     : RequestParamValueType;
    variableName  : string;
    isRequired    : boolean;
    defaultValue  : string | undefined;

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

export default RequestPathVariableParamObject;
