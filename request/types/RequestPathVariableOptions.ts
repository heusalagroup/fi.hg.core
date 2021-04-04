import {isBoolean, isString} from "../../modules/lodash";

export interface RequestPathVariableOptions {

    required?: boolean;
    defaultValue?: string | undefined;

}

export function isRequestPathVariableOptions(value: any): value is RequestPathVariableOptions {

    return (
        !!value
        && (value?.required === undefined || isBoolean(value?.required))
        && (value?.defaultValue === undefined || isString(value?.defaultValue))
    );

}

export default RequestPathVariableOptions;
