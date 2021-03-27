import {every, isArray, isObject, isString, keys} from "../../modules/lodash";

export interface HeadersObject {
    readonly [key: string]: string | string[] | undefined;
}

export function isHeadersObject (value : any) : value is HeadersObject {

    if (!value) return false;
    if (!isObject(value)) return false;
    if (isArray(value)) return false;

    const propertyKeys : Array<string> = keys(value);

    return every(propertyKeys, (key : string) => {

        // @ts-ignore
        const propertyValue : any = value[key];

        return propertyValue === undefined || isString(propertyValue) || (isArray(propertyValue) && every(propertyValue, isString));

    });

}

export default HeadersObject;
