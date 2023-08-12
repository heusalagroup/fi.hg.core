// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { randomBytes } from "crypto";
import { concat } from "../functions/concat";
import { filter } from "../functions/filter";
import { find } from "../functions/find";
import { findIndex } from "../functions/findIndex";
import { get } from "../functions/get";
import { map } from "../functions/map";
import { remove } from "../functions/remove";
import { uniq } from "../functions/uniq";
import { SimpleRepositoryEntry } from "./types/SimpleRepositoryEntry";
import { SimpleRepository, REPOSITORY_NEW_IDENTIFIER } from "./types/SimpleRepository";
import { SimpleStoredRepositoryItem, StoredRepositoryItemExplainCallback, StoredRepositoryItemTestCallback } from "./types/SimpleStoredRepositoryItem";
import { SimpleMemoryItem } from "./types/SimpleMemoryItem";
import { SimpleRepositoryUtils } from "./SimpleRepositoryUtils";
import { explainNot, explainOk } from "../types/explain";

/**
 * Saves objects of type T in memory.
 *
 * Intended to be used for development purposes.
 *
 * See also
 * [MatrixCrudRepository](https://github.com/heusalagroup/fi.hg.matrix/blob/main/MatrixCrudRepository.ts)
 */
export class SimpleMemoryRepository<T extends SimpleStoredRepositoryItem> implements SimpleRepository<T> {

    private readonly _members  : readonly string[];
    private readonly _isT      : StoredRepositoryItemTestCallback;
    private readonly _explainT : StoredRepositoryItemExplainCallback;
    private readonly _tName    : string;

    private _items        : readonly SimpleMemoryItem<T>[];

    /**
     *
     * @param members Array of members to add in any item created
     * @param isT Test function for T type
     * @param explainT Function to explain if isT fails
     * @param tName The name of the T type for debugging purposes. Defaults to "T".
     */
    public constructor (
        isT       : StoredRepositoryItemTestCallback,
        members   : readonly string[] = [],
        tName     : string | undefined = undefined,
        explainT  : StoredRepositoryItemExplainCallback | undefined = undefined
    ) {
        this._members  = members;
        this._items    = [];
        this._isT      = isT;
        this._tName    = tName ?? 'T';
        this._explainT = explainT ?? ( (value: any) : string => isT(value) ? explainOk() : explainNot(this._tName) );
    }

    public async getAll () : Promise<readonly SimpleRepositoryEntry<T>[]> {
        return map(this._items, (item) : SimpleRepositoryEntry<T> => ({
            id       : item.id,
            version  : item.version,
            data     : item.data,
            deleted  : item.deleted,
            members  : undefined
        }));
    }

    public async getAllByProperty (
        propertyName  : string,
        propertyValue : any
    ): Promise<readonly SimpleRepositoryEntry<T>[]> {

        const items : readonly SimpleMemoryItem<T>[] = this._items;

        const filteredItems : readonly SimpleMemoryItem<T>[] = filter(
            items,
            (item: SimpleMemoryItem<T>) : boolean => get(item?.data, propertyName) === propertyValue
        );

        return map(
            filteredItems,
            (item: SimpleMemoryItem<T>) : SimpleRepositoryEntry<T> => ({
                id       : item.id,
                version  : item.version,
                data     : item.data,
                deleted  : item.deleted,
                members  : undefined
            })
        );

    }

    public async createItem (
        data: T,
        members : string[] = []
    ) : Promise<SimpleRepositoryEntry<T>> {

        const id = SimpleMemoryRepository._createId();

        const existingItem = find(this._items, item => item.id === id);

        if (existingItem) throw new Error(`MemoryRepository: ID "${id}" was not unique`);

        const item : SimpleMemoryItem<T> = {
            id      : SimpleMemoryRepository._createId(),
            version : 1,
            data    : data,
            deleted : false,
            members : uniq(concat([], members ? members : [], this._members))
        };

        this._items = [...this._items, item];

        return {
            id      : item.id,
            version : item.version,
            data    : item.data,
            deleted : item.deleted,
            members : item.members ? map(item.members, id => ({id})) : undefined
        };

    }

    public async findById (
        id              : string,
        includeMembers ?: boolean
    ) : Promise<SimpleRepositoryEntry<T> | undefined> {
        const item = find(this._items, form => form.id === id);
        if (item === undefined) return undefined;
        return {
            id      : item.id,
            version : item.version,
            data    : item.data,
            deleted : item.deleted,
            members : includeMembers && item.members?.length ? map(item.members, id => ({id})) : undefined
        };
    }

    public async findByProperty (
        propertyName  : string,
        propertyValue : any
    ) : Promise<SimpleRepositoryEntry<T> | undefined> {
        const result = await this.getAllByProperty(propertyName, propertyValue);
        const resultCount : number = result?.length ?? 0;
        if (resultCount === 0) return undefined;
        if (resultCount >= 2) throw new TypeError(`MemoryRepository.findByProperty: Multiple items found by property "${propertyName}" as: ${propertyValue}`);
        return result[0];
    }

    public async findByIdAndUpdate (id: string, item: T): Promise<SimpleRepositoryEntry<T>> {
        const rItem : SimpleRepositoryEntry<T> | undefined = await this.findById(id);
        if (rItem === undefined) throw new TypeError(`MemoryRepository.findByIdAndUpdate: Could not find item for "${id}"`);
        return await this.update(rItem.id, item);
    }

    public async waitById (
        id              : string,
        includeMembers ?: boolean,
        timeout        ?: number
    ): Promise<SimpleRepositoryEntry<T> | undefined> {
        // FIXME: Implement real long polling
        return new Promise((resolve, reject) => {
            try {
                setTimeout(
                    () => {
                        try {
                            resolve(this.findById(id, includeMembers));
                        } catch (err) {
                            reject(err);
                        }
                    },
                    timeout ?? 4000
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    public async update (id: string, data: T) : Promise<SimpleRepositoryEntry<T>> {

        const itemIndex = findIndex(this._items, item => item.id === id);
        if (itemIndex < 0) throw new TypeError(`No item found: ${id}`);

        const prevItem = this._items[itemIndex];

        const nextItem = {
            ...prevItem,
            version: prevItem.version + 1,
            data: data
        };

        this._setItemByIndex(itemIndex, nextItem);

        return {
            id      : nextItem.id,
            version : nextItem.version,
            data    : nextItem.data,
            deleted : nextItem.deleted,
            members : undefined
        };

    }

    public async deleteById (id: string) : Promise<SimpleRepositoryEntry<T>> {

        const items = remove(this._items, item => item.id === id);
        const item  = items.shift();

        if (item === undefined) {
            throw new TypeError(`Could not find item: ${id}`);
        }

        return {
            id: item.id,
            data: item.data,
            version: item.version + 1,
            deleted: true,
            members: undefined
        };

    }

    public async inviteToItem (
        id       : string,
        members  : readonly string[]
    ): Promise<void> {

        const itemIndex = findIndex(this._items, item => item.id === id);
        if (itemIndex < 0) throw new TypeError(`No item found: ${id}`);

        const prevItem = this._items[itemIndex];

        const prevMembers = prevItem?.members ?? [];

        const nextItem = {
            ...prevItem,
            invited: filter(
                uniq(
                    concat(
                        [],
                        prevItem?.invited ?? [],
                        members
                    )
                ),
                (item : string) => !prevMembers.includes(item)
            )
        };

        this._setItemByIndex(itemIndex, nextItem);

    }

    public async subscribeToItem (id: string): Promise<void> {

        const itemIndex = findIndex(this._items, item => item.id === id);
        if (itemIndex < 0) throw new TypeError(`No item found: ${id}`);

        const prevItem    : SimpleMemoryItem<T> = this._items[itemIndex];
        const prevMembers = prevItem?.members ?? [];
        const prevInvited = prevItem?.invited ?? [];

        const nextItem : SimpleMemoryItem<T> = {
            ...prevItem,
            members: concat(prevMembers, prevInvited),
            invited: []
        };

        this._setItemByIndex(itemIndex, nextItem);

    }

    private static _createId () : string {
        return randomBytes(20).toString('hex');
    }

    private _setItemByIndex (
        itemIndex : number,
        newItem   : SimpleMemoryItem<T>
    ) {
        this._items = map(
            this._items,
            (item : SimpleMemoryItem<T>, i: number) : SimpleMemoryItem<T> => i === itemIndex ? newItem : item
        );
    }

    public async deleteByIdList (list: readonly string[]): Promise<SimpleRepositoryEntry<T>[]> {
        const results = [];
        let i = 0;
        for (; i < list.length; i += 1) {
            results.push( await this.deleteById(list[i]) );
        }
        if (!this.isRepositoryEntryList(results)) {
            throw new TypeError(`MemoryRepository.getSome: Illegal data from database: Not RepositoryEntryList: ${
                this.explainRepositoryEntryList(results)
            }`);
        }
        return results;
    }

    public async deleteByList (list: SimpleRepositoryEntry<T>[]): Promise<SimpleRepositoryEntry<T>[]> {
        return await this.deleteByIdList( map(list, item => item.id) );
    }

    public async deleteAll (): Promise<SimpleRepositoryEntry<T>[]> {
        return await this.deleteByIdList( map(this._items, item => item.id) );
    }

    public async getSome (idList: readonly string[]): Promise<SimpleRepositoryEntry<T>[]> {
        const allList : readonly SimpleRepositoryEntry<T>[] = await this.getAll();
        const list = filter(
            allList,
            (item : SimpleRepositoryEntry<T>) : boolean => !!item?.id && idList.includes(item?.id)
        );
        if (!this.isRepositoryEntryList(list)) {
            throw new TypeError(`MemoryRepository.getSome: Illegal data from database: Not RepositoryEntryList: ${
                this.explainRepositoryEntryList(list)
            }`);
        }
        return list;
    }

    public isRepositoryEntryList (list: any): list is SimpleRepositoryEntry<T>[] {
        return SimpleRepositoryUtils.isRepositoryEntryList(list, this._isT);
    }

    public explainRepositoryEntryList (list: any): string {
        return SimpleRepositoryUtils.explainRepositoryEntryList(list, this._isT, this._explainT, this._tName);
    }

    public async updateOrCreateItem (item: T): Promise<SimpleRepositoryEntry<T>> {
        const id = item.id;
        const foundItem : SimpleRepositoryEntry<T> | undefined = id !== REPOSITORY_NEW_IDENTIFIER ? await this.findById(id) : undefined;
        if (foundItem) {
            return await this.update(foundItem.id, item);
        } else {
            return await this.createItem(item);
        }
    }

}
