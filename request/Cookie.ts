// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CookieLike } from "./CookieLike";
import { SameSite } from "../types/SameSite";

export class Cookie implements CookieLike {

    private _path : string;
    private _name : string;
    private _domain : string;
    private _httpOnly : boolean;
    private _secure : boolean;
    private _maxAge : number;
    private _sameSite : SameSite;

    public constructor () {
        this._path = '';
        this._name = '';
        this._domain = '';
        this._httpOnly = false;
        this._secure = false;
        this._maxAge = 0;
        this._sameSite = SameSite.NONE;
    }

    public getDomain (): string {
        return this._domain;
    }

    public getHttpOnly (): boolean {
        return this._httpOnly;
    }

    public getMaxAge (): number {
        return this._maxAge;
    }

    public getName (): string {
        return this._name;
    }

    public getPath (): string {
        return this._path;
    }

    public getSameSite (): SameSite {
        return this._sameSite;
    }

    public getSecure (): boolean {
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
