import {isObject, isString} from "../../modules/lodash";
import RequestInterfaceUtils from "../RequestInterfaceUtils";

export type DefaultPathVariableMapValuesType = { [key: string]: string };

export function isDefaultPathVariableMapValuesType(value: any): value is DefaultPathVariableMapValuesType {

    return (
        !!value
        && isObject(value)
        && RequestInterfaceUtils.everyPropertyIs<string>(value, isString)
    );

}

export default DefaultPathVariableMapValuesType;
