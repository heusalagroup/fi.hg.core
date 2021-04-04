import {every, isArray, isObject, isString} from "../../modules/lodash";
import RequestInterfaceUtils from "../RequestInterfaceUtils";

export type DefaultHeaderMapValuesType = { [key: string]: string | string[] };

export function isDefaultHeaderMapValuesType(value: any): value is DefaultHeaderMapValuesType {

    return (
        !!value
        && isObject(value)
        && RequestInterfaceUtils.everyPropertyIs<string>(
            value,
            (item: any): boolean => {
                return (
                    isString(item)
                    || (isArray(item) && every(item, isString))
                );
            }
        )
    );

}

export default DefaultHeaderMapValuesType;
