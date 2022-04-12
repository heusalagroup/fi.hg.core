import { RequestParamObjectType } from "./RequestParamObjectType";
import {DefaultPathVariableMapValuesType, isDefaultPathVariableMapValuesType} from "./DefaultPathVariableMapValuesType";

export interface RequestPathVariableMapParamObject {

    objectType     : RequestParamObjectType.PATH_VARIABLE_MAP;
    defaultValues ?: DefaultPathVariableMapValuesType;

}

export function isRequestPathVariableMapParamObject (value: any): value is RequestPathVariableMapParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.PATH_VARIABLE_MAP
        && ( value?.defaultValues === undefined || isDefaultPathVariableMapValuesType(value?.defaultValues) )
    );
}


