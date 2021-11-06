import {isBoolean, isString} from "../../modules/lodash";

export interface RequestHeaderOptions {

    required?: boolean;
    defaultValue?: string | undefined;

}

export function isRequestHeaderOptions(value: any): value is RequestHeaderOptions {

    return (
        !!value
        && (value?.required === undefined || isBoolean(value?.required))
        && (value?.defaultValue === undefined || isString(value?.defaultValue))
    );

}

export function isRequestHeaderOptionsOrUndefined (value: any): value is (RequestHeaderOptions|undefined) {
    return value === undefined || isRequestHeaderOptions(value);
}

export default RequestHeaderOptions;
