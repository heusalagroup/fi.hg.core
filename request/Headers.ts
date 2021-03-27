import HeadersObject from "./types/HeadersObject";

export class Headers {

    private _value : HeadersObject | undefined;

    constructor (value ?: HeadersObject) {

        this._value = value;

    }

}

export function isHeaders (value : any) : value is Headers {
    return (
        !!value
        && value instanceof Headers
    );
}

export default Headers;
