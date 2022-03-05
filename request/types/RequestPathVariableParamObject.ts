import { RequestParamValueType, isRequestParamValueType} from "./RequestParamValueType";
import {isBoolean, isString} from "../../modules/lodash";
import { RequestParamObjectType } from "./RequestParamObjectType";

export interface RequestPathVariableParamObject {

    readonly objectType    : RequestParamObjectType.PATH_VARIABLE;
    readonly valueType     : RequestParamValueType;
    readonly variableName  : string;
    readonly isRequired    : boolean;
    readonly defaultValue  : string | undefined;
    readonly decodeValue   : boolean;

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


