import {
    isBooleanOrUndefined,
    isStringOrUndefined
} from "../../modules/lodash";

export interface RequestPathVariableOptions {

    readonly required      ?: boolean;
    readonly defaultValue  ?: string | undefined;
    readonly decodeValue   ?: boolean;

}

export function isRequestPathVariableOptions(value: any): value is RequestPathVariableOptions {

    return (
        !!value
        && isBooleanOrUndefined(value?.required)
        && isStringOrUndefined(value?.defaultValue)
        && isBooleanOrUndefined(value?.decodeValue)
    );

}

export function isRequestPathVariableOptionsOrUndefined (value: any): value is RequestPathVariableOptions {
    return value === undefined || isRequestPathVariableOptions(value);
}


