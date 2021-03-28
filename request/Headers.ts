import HeadersObject from "./types/HeadersObject";
import {concat, forEach, has, isArray, isString, keys, map, trim} from "../modules/lodash";
import LogService from "../LogService";

const LOG = LogService.createLogger('Headers');

export class Headers {

    private _value : HeadersObject | undefined;

    constructor (value ?: HeadersObject) {

        this._value = undefined;

        if (value) {
            this.addAll(value);
        }

    }

    public clear () {
        this._value = {};
    }

    public add (headerName: string, headerValue : string) {

        LOG.debug('add header: ', headerName, headerValue);

        headerName = headerName.toLowerCase();

        const originalHeader : string | string[] | undefined = this._value && has(this._value, headerName) ? this._value[headerName] : undefined;

        if (this._value === undefined) {

            this._value = {
                [headerName]: headerValue
            };

        } else if (originalHeader !== undefined) {

            if (isArray(originalHeader)) {

                this._value = {
                    ...this._value,
                    [headerName]: concat([], originalHeader, [headerValue])
                };

            } else {

                this._value = {
                    ...this._value,
                    [headerName]: [originalHeader, headerValue]
                };

            }

        } else {

            this._value = {
                ...this._value,
                [headerName]: headerValue
            };

        }

    }

    public containsKey (headerName : string) : boolean {
        headerName = headerName.toLowerCase();
        return has(this._value, headerName);
    }

    public isEmpty () : boolean {

        const headersObject : HeadersObject | undefined = this._value;

        return !headersObject || keys(headersObject).length === 0;

    }

    public keySet () : Set<string> {

        const set : Set<string> = new Set();

        forEach(keys(this._value), (key : string) => {
            set.add(key);
        });

        return set;

    }

    public getValue (headerName: string) : string | string[] | undefined {
        if (!this._value) return undefined;
        headerName = headerName.toLowerCase();
        return has(this._value, headerName) ? this._value[headerName] : undefined;
    }

    public getFirst (headerName: string) : string | undefined {
        const value : string | string[] | undefined = this.getValue(headerName);
        if (isArray(value)) {
            return value.length ? value[0] : undefined;
        }
        return value;
    }

    public getHost () : string | undefined {
        return this.getFirst('host');
    }

    public addAll (key : string, values : string[]) : void;
    public addAll (values : HeadersObject) : void;

    public addAll (arg1 : HeadersObject | string, arg2 ?: string[]) {

        if (isString(arg1)) {

            const headerKey = arg1;
            const headerValues = arg2;
            if (!isArray(headerValues)) throw new TypeError('Headers.addAll signature must be (string, string[]) or (HeadersObject)');

            forEach(headerValues, (item : string) => {
                this.add(headerKey, item);
            });

        } else {

            const values = arg1;

            forEach(keys(values), (headerKey : string) => {

                const headerValue : string | string[] | undefined = values[headerKey];

                if (isArray(headerValue)) {

                    forEach(headerValue, (item : string) => {
                        this.add(headerKey, item);
                    });

                } else if (headerValue !== undefined) {

                    this.add(headerKey, headerValue);

                }

            });

        }

    }

    public remove (headerName : string) : string | string[] | undefined {

        headerName = headerName.toLowerCase();

        const originalValue = this.getValue(headerName);

        const newValues = {...this._value};

        if (newValues && has(newValues, headerName)) {
            delete newValues[headerName];
        }

        this._value = newValues;

        return originalValue;

    }

    public set (headerName : string, headerValue : string | undefined) {

        headerName = headerName.toLowerCase();

        if (this._value === undefined) {
            this._value = {
                [headerName]: headerValue
            }
        } else {
            this._value = {
                ...this._value,
                [headerName]: headerValue
            };
        }

    }

    public setAll (values : { [key: string]: string }) {

        forEach(keys(values), (headerKey : string) => {
            this.set(headerKey, values[headerKey]);
        });

    }

    public valueOf () : HeadersObject | undefined {
        return this._value ?? undefined;
    }

    public toString () : string {

        const headersObject = this._value;

        if ( !headersObject || this.isEmpty() ) return 'Headers()';

        const headerKeys : Array<string> = keys(headersObject);

        const items : Array<string> = map(headerKeys, (headerKey : string) => {

            const headerValue : string | string[] | undefined = headersObject[headerKey];

            if (!headerValue) return `${headerKey}`;

            if (isArray(headerValue)) return `${headerKey}: ${headerValue.map((item : string) => {
                
                if ( headerValue.indexOf(';') >= 0 || headerValue.indexOf(',') >= 0 ) {
                    return `"${headerValue}"`;
                }
                
                return headerValue;
                
            }).join(', ')}`;

            if (headerValue.indexOf(';') >= 0) {
                return `${headerKey}: "${headerValue}"`;
            }

            return `${headerKey}: ${headerValue}`;

        });

        return `Headers(${items.join('; ')})`;

    }

}

export function isHeaders (value : any) : value is Headers {
    return (
        !!value
        && value instanceof Headers
    );
}

export default Headers;
