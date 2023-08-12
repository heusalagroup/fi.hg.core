// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleRepository } from "./types/SimpleRepository";
import { SimpleRepositoryEntry } from "./types/SimpleRepositoryEntry";
import { SimpleStoredRepositoryItem } from "./types/SimpleStoredRepositoryItem";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";

const LOG = LogService.createLogger('SimpleHttpRepositoryClient');

export class SimpleHttpRepositoryClient<T extends SimpleStoredRepositoryItem> implements SimpleRepository<T> {

    // private readonly _url : string;
    private _loggedIn : boolean;

    public static setLogLevel (value : LogLevel | undefined) {
        LOG.setLogLevel(value);
    }

    public constructor (
        // @ts-ignore @TODO: Why not used?
        url: string
    ) {
        // this._url = url;
        this._loggedIn = false;
    }

    public async createItem (
        data: T,
        // @ts-ignore @TODO: Why not used?
        members?: readonly string[]
    ): Promise<SimpleRepositoryEntry<T>> {
        return {
            id: 'new',
            data,
            version: 0
        };
    }

    public async deleteById (id: string): Promise<SimpleRepositoryEntry<T>> {
        return {
            id,
            data: {
                id: '',
                target: ''
            } as T,
            version: 0
        };
    }

    public async deleteByIdList (
        // @ts-ignore @TODO: Why not used?
        list: readonly string[]
    ): Promise<readonly SimpleRepositoryEntry<T>[]> {
        return [];
    }

    public async deleteByList (
        // @ts-ignore @TODO: Why not used?
        list: SimpleRepositoryEntry<T>[]
    ): Promise<readonly SimpleRepositoryEntry<T>[]> {
        return [];
    }

    public async deleteAll (): Promise<readonly SimpleRepositoryEntry<T>[]> {
        return [];
    }

    public async findById (
        // @ts-ignore @TODO: Why not used?
        id: string, includeMembers?: boolean
    ): Promise<SimpleRepositoryEntry<T> | undefined> {
        return undefined;
    }

    public async findByIdAndUpdate (
        id: string, item: T): Promise<SimpleRepositoryEntry<T>> {
        return {
            id,
            data: item,
            version: 0
        };
    }

    public async findByProperty (
        // @ts-ignore @TODO: Why not used?
        propertyName: string, propertyValue: any
    ): Promise<SimpleRepositoryEntry<T> | undefined> {
        return undefined;
    }

    public async getAll (): Promise<readonly SimpleRepositoryEntry<T>[]> {
        return [];
    }

    public async getAllByProperty (
        // @ts-ignore @TODO: Why not used?
        propertyName: string, propertyValue: any
    ): Promise<readonly SimpleRepositoryEntry<T>[]> {
        return [];
    }

    public async getSome (
        // @ts-ignore @TODO: Why not used?
        idList: readonly string[]
    ): Promise<readonly SimpleRepositoryEntry<T>[]> {
        return [];
    }

    public async inviteToItem (
        // @ts-ignore @TODO: Why not used?
        id: string, members: readonly string[]
    ): Promise<void> {
        return undefined;
    }

    public isRepositoryEntryList (
        // @ts-ignore @TODO: Why not used?
        list: any
    ): list is SimpleRepositoryEntry<T>[] {
        return false;
    }

    public async subscribeToItem (
        // @ts-ignore @TODO: Why not used?
        id: string
    ): Promise<void> {
        return undefined;
    }

    public async update (id: string, data: T): Promise<SimpleRepositoryEntry<T>> {
        return {
            id,
            data,
            version: 0
        };
    }

    public async updateOrCreateItem (item: T): Promise<SimpleRepositoryEntry<T>> {
        return {
            id: 'new',
            data: item,
            version: 0
        };
    }

    public async waitById (
        // @ts-ignore @TODO: Why not used?
        id: string, includeMembers?: boolean, timeout?: number
    ): Promise<SimpleRepositoryEntry<T> | undefined> {
        return undefined;
    }

    public async login (
        // @ts-ignore @TODO: Why not used?
        username: string,
        // @ts-ignore @TODO: Why not used?
        password: string
    ) {
        this._loggedIn = true;
    }

    public isLoggedIn() : boolean {
        return this._loggedIn;
    }

}
