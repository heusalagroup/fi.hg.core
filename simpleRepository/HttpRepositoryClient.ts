// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Repository } from "./types/Repository";
import { RepositoryEntry } from "./types/RepositoryEntry";
import { StoredRepositoryItem } from "./types/StoredRepositoryItem";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";

const LOG = LogService.createLogger('HttpRepositoryClient');

export class HttpRepositoryClient<T extends StoredRepositoryItem> implements Repository<T> {

    private readonly _url : string;
    private _loggedIn : boolean;

    public static setLogLevel (value : LogLevel | undefined) {
        LOG.setLogLevel(value);
    }

    public constructor (
        url: string
    ) {
        this._url = url;
        this._loggedIn = false;
    }

    public async createItem (data: T, members?: readonly string[]): Promise<RepositoryEntry<T>> {
        return {
            id: 'new',
            data,
            version: 0
        };
    }

    public async deleteById (id: string): Promise<RepositoryEntry<T>> {
        return {
            id,
            data: {
                id: '',
                target: ''
            } as T,
            version: 0
        };
    }

    public async deleteByIdList (list: readonly string[]): Promise<readonly RepositoryEntry<T>[]> {
        return [];
    }

    public async deleteByList (list: RepositoryEntry<T>[]): Promise<readonly RepositoryEntry<T>[]> {
        return [];
    }

    public async deleteAll (): Promise<readonly RepositoryEntry<T>[]> {
        return [];
    }

    public async findById (id: string, includeMembers?: boolean): Promise<RepositoryEntry<T> | undefined> {
        return undefined;
    }

    public async findByIdAndUpdate (id: string, item: T): Promise<RepositoryEntry<T>> {
        return {
            id,
            data: item,
            version: 0
        };
    }

    public async findByProperty (propertyName: string, propertyValue: any): Promise<RepositoryEntry<T> | undefined> {
        return undefined;
    }

    public async getAll (): Promise<readonly RepositoryEntry<T>[]> {
        return [];
    }

    public async getAllByProperty (propertyName: string, propertyValue: any): Promise<readonly RepositoryEntry<T>[]> {
        return [];
    }

    public async getSome (idList: readonly string[]): Promise<readonly RepositoryEntry<T>[]> {
        return [];
    }

    public async inviteToItem (id: string, members: readonly string[]): Promise<void> {
        return undefined;
    }

    public isRepositoryEntryList (list: any): list is RepositoryEntry<T>[] {
        return false;
    }

    public async subscribeToItem (id: string): Promise<void> {
        return undefined;
    }

    public async update (id: string, data: T): Promise<RepositoryEntry<T>> {
        return {
            id,
            data,
            version: 0
        };
    }

    public async updateOrCreateItem (item: T): Promise<RepositoryEntry<T>> {
        return {
            id: 'new',
            data: item,
            version: 0
        };
    }

    public async waitById (id: string, includeMembers?: boolean, timeout?: number): Promise<RepositoryEntry<T> | undefined> {
        return undefined;
    }

    public async login (
        username: string,
        password: string
    ) {
        this._loggedIn = true;
    }

    public isLoggedIn() : boolean {
        return this._loggedIn;
    }

}
