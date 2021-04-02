import {isObject, isString} from "../../modules/lodash";
import RequestInterfaceUtils from "../RequestInterfaceUtils";
import RequestParamObjectType from "./RequestParamObjectType";

export type DefaultPathVariableMapValuesType = {[key: string] : string};

export function isDefaultPathVariableMapValuesType (value : any) : value is DefaultPathVariableMapValuesType {

    return (
        !!value
        && isObject(value)
        && RequestInterfaceUtils.everyPropertyIs<string>(value, isString)
    );

}

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

export default RequestPathVariableMapParamObject;
