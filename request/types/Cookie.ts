// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CookieLike } from "./CookieLike";
import { SameSite } from "../../types/SameSite";

export class Cookie implements CookieLike {

    private _name : string;
    private _path : string | undefined;
    private _value : string | undefined;
    private _domain : string | undefined;
    private _httpOnly : boolean | undefined;
    private _secure : boolean | undefined;
    private _maxAge : number | undefined;
    private _sameSite : SameSite | undefined;

    private constructor (
        name      : string,
        value     : string | undefined,
        path      : string | undefined,
        domain    : string | undefined,
        httpOnly  : boolean | undefined,
        secure    : boolean | undefined,
        maxAge    : number | undefined,
        sameSite  : SameSite | undefined,
    ) {
        this._path = path;
        this._name = name;
        this._value = value;
        this._domain = domain;
        this._httpOnly = httpOnly;
        this._secure = secure;
        this._maxAge = maxAge;
        this._sameSite = sameSite;
    }

    public static create (
        name      : string,
        value     : string | undefined = undefined,
        path      : string | undefined = undefined,
        domain    : string | undefined = undefined,
        httpOnly  : boolean | undefined = undefined,
        secure    : boolean | undefined = undefined,
        maxAge    : number | undefined = undefined,
        sameSite  : SameSite | undefined = undefined,
    ) : CookieLike {
        return new Cookie(
            name,
            value,
            path,
            domain,
            httpOnly,
            secure,
            maxAge,
            sameSite,
        );
    }

    public getDomain (): string | undefined {
        return this._domain;
    }

    public getHttpOnly (): boolean | undefined {
        return this._httpOnly;
    }

    public getMaxAge (): number | undefined {
        return this._maxAge;
    }

    public getName (): string {
        return this._name;
    }

    public getValue (): string | undefined {
        return this._value;
    }

    public getPath (): string | undefined {
        return this._path;
    }

    public getSameSite (): SameSite | undefined {
        return this._sameSite;
    }

    public getSecure (): boolean | undefined {
        return this._secure;
    }

    public setDomain (domain: string): void {
        this._domain = domain;
    }

    public setHttpOnly (httpOnly: boolean): void {
        this._httpOnly = httpOnly;
    }

    public setMaxAge (maxAge: number): void {
        this._maxAge = maxAge;
    }

    public setName (name: string): void {
        this._name = name;
    }

    public setValue (value: string | undefined): void {
        this._value = value;
    }

    public setPath (path: string): void {
        this._path = path;
    }

    public setSameSite (sameSite: SameSite): void {
        this._sameSite = sameSite;
    }

    public setSecure (secure: boolean): void {
        this._secure = secure;
    }

}
