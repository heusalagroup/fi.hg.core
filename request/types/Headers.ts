// Copyright (c) 2023 Heusala Group. All rights reserved.
// Copyright (c) 2020-2023 Sendanor. All rights reserved.

import { HeadersObject, ChangeableHeadersObject } from "./HeadersObject";
import { concat } from "../../functions/concat";
import { forEach } from "../../functions/forEach";
import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { LogService } from "../../LogService";
import { isReadonlyJsonArray } from "../../Json";
import { LogLevel } from "../../types/LogLevel";
import { isArray } from "../../types/Array";
import { isString } from "../../types/String";
import { keys } from "../../functions/keys";

const LOG = LogService.createLogger('Headers');

export class Headers {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private _value              : HeadersObject | undefined;
    private _uninitializedValue : HeadersObject | undefined;

    constructor (value ?: HeadersObject) {
        this._value              = undefined;
        this._uninitializedValue = value;
    }

    public static create (value ?: HeadersObject) : Headers {
        return new Headers(value);
    }

    private _initializeValue () {

        const value = this._value;
        const uninitializedValue = this._uninitializedValue;
        try {

            if (uninitializedValue) {
                this._uninitializedValue = undefined;
                this.addAll(uninitializedValue);
            }

        } catch(err) {
            this._value = value;
            this._uninitializedValue = uninitializedValue;
            throw err;
        }

    }

    public clear () {
        this._value = {};
        this._uninitializedValue = undefined;
    }

    public add (headerName: string, headerValue : string) {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        LOG.debug('add header: ', headerName, headerValue);

        headerName = headerName.toLowerCase();

        const originalHeader : string | readonly string[] | undefined = this._value && has(this._value, headerName) ? this._value[headerName] : undefined;

        if (this._value === undefined) {

            this._value = {
                [headerName]: headerValue
            };

        } else if (originalHeader !== undefined) {

            if (isReadonlyJsonArray(originalHeader)) {

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

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        headerName = headerName.toLowerCase();

        return has(this._value, headerName);

    }

    public isEmpty () : boolean {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        const headersObject : HeadersObject | undefined = this._value;

        return !headersObject || keys(headersObject).length === 0;

    }

    public keySet () : Set<string> {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        const set : Set<string> = new Set();

        if (this._value !== undefined) {
            const list : string[] = keys(this._value);
            forEach(list, (key : string) => {
                set.add(key);
            });
        }

        return set;

    }

    public getValue (headerName: string) : string | readonly string[] | undefined {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        if (!this._value) return undefined;

        headerName = headerName.toLowerCase();

        return has(this._value, headerName) ? this._value[headerName] : undefined;

    }

    public getFirst (headerName: string) : string | undefined {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        const value : string | readonly string[] | undefined = this.getValue(headerName);

        if (isReadonlyJsonArray(value)) {
            return value.length ? value[0] : undefined;
        }

        return value;

    }

    public getHost () : string | undefined {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        return this.getFirst('host');

    }

    public addAll (key : string, values : readonly string[]) : void;
    public addAll (values : HeadersObject) : void;

    public addAll (arg1 : HeadersObject | string, arg2 ?: readonly string[]) {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

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

                const headerValue : string | readonly string[] | undefined = values[headerKey];

                if (isReadonlyJsonArray(headerValue)) {

                    forEach(headerValue, (item : string) => {
                        this.add(headerKey, item);
                    });

                } else if (headerValue !== undefined) {

                    this.add(headerKey, headerValue);

                }

            });

        }

    }

    public remove (headerName : string) : string | readonly string[] | undefined {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        headerName = headerName.toLowerCase();

        const originalValue = this.getValue(headerName);

        const newValues : ChangeableHeadersObject = {...this._value};

        if (newValues && has(newValues, headerName)) {
            delete newValues[headerName];
        }

        this._value = newValues;

        return originalValue;

    }

    public set (headerName : string, headerValue : string | undefined) {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

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

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        forEach(keys(values), (headerKey : string) => {
            this.set(headerKey, values[headerKey]);
        });

    }

    public valueOf () : HeadersObject | undefined {
        if (this._uninitializedValue) {
            this._initializeValue();
        }
        return this._value ?? undefined;
    }

    public toJSON () : HeadersObject | undefined {
        return this.valueOf();
    }

    public toString () : string {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        const headersObject = this._value;

        if ( !headersObject || this.isEmpty() ) return 'Headers()';

        const headerKeys : Array<string> = keys(headersObject);

        const items : Array<string> = map(headerKeys, (headerKey : string) => {

            const headerValue : string | readonly string[] | undefined = headersObject[headerKey];

            if (!headerValue) return `${headerKey}`;

            if (isArray(headerValue)) return `${headerKey}: ${headerValue.map((/*item : string*/) => {
                
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

    public clone () : Headers {

        if (this._uninitializedValue) {
            this._initializeValue();
        }

        return new Headers( this._value ? {
            ...this._value
        } : undefined );

    }

}

export function isHeaders (value : any) : value is Headers {
    return (
        !!value
        && value instanceof Headers
    );
}
