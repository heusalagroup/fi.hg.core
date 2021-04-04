import DefaultHeaderMapValuesType, {isDefaultHeaderMapValuesType} from "./DefaultHeaderMapValuesType";

export interface RequestHeaderListOptions {

    defaultValues?: DefaultHeaderMapValuesType;

}

export function isRequestHeaderListOptions (value : any) : value is RequestHeaderListOptions {

    return (
        !!value
        && (
            value?.defaultValues === undefined
            || isDefaultHeaderMapValuesType(value?.defaultValues)
        )
    );

}

export default RequestHeaderListOptions;
