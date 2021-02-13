import {isNumber, isString} from "../../modules/lodash";

export enum RequestMethod {

    GET,
    POST,
    PUT,
    DELETE

}

export function stringifyRequestMethod (value : RequestMethod) : string {
    if (isNumber(value)) {
        switch (value) {
            case RequestMethod.GET    : return 'get';
            case RequestMethod.POST   : return 'post';
            case RequestMethod.PUT    : return 'put';
            case RequestMethod.DELETE : return 'delete';
        }
    }
    throw new TypeError(`Unsupported value for stringifyRequestMethod(): ${value}`)
}

export function isRequestMethod (value: any) : value is RequestMethod {
    return isNumber(value) && value >= 0 && value <= 3;
}

export function parseRequestMethod (value: any) : RequestMethod {

    if (isRequestMethod(value)) return value;

    if (isString(value)) {
        value = value.toLowerCase();
        switch(value) {

            case 'get'   : return RequestMethod.GET;
            case 'post'  : return RequestMethod.POST;
            case 'put'   : return RequestMethod.PUT;
            case 'delete': return RequestMethod.DELETE;

            default: break;

        }
    }

    throw new TypeError(`Cannot parse value "${value}" as a valid RequestMethod`);

}

export default RequestMethod;
