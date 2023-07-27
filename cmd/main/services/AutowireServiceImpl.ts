// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { AutowireService } from "./AutowireService";

export class AutowireServiceImpl implements AutowireService {

    private static _autowireService : AutowireService | undefined;

    private _data : Map<string, any>;

    protected constructor () {
        this._data = new Map<string, any>();
    }

    public hasName (name : string) : boolean {
        return this._data.has(name);
    }

    public getName<T> (name : string) : T {
        if (!this.hasName(name)) throw new TypeError(`Autowire service did not have name: ${name}`);
        return this._data.get(name);
    }

    public setName<T> (name : string, value: T) : void {
        this._data.set(name, value);
    }

    public deleteName (name : string) : void {
        this._data.delete(name);
    }

    public static create () {
        return new AutowireServiceImpl();
    }

    /**
     * Set global autowire service
     * @param service
     */
    public static setAutowireService (service: AutowireService | undefined) : void {
        this._autowireService = service;
    }

    /**
     * Get global autowire service
     */
    public static getAutowireService () : AutowireService {
        if (!this._autowireService) throw new TypeError('Autowire service has not been initialized');
        return this._autowireService;
    }

}
