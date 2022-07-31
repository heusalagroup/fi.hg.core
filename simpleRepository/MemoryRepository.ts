// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { randomBytes } from "crypto";
import { concat, filter, find, findIndex, get, map, remove, uniq } from "../modules/lodash";
import { RepositoryEntry } from "./types/RepositoryEntry";
import { Repository, REPOSITORY_NEW_IDENTIFIER } from "./types/Repository";
import { StoredRepositoryItem, StoredRepositoryItemTestCallback } from "./types/StoredRepositoryItem";
import { MemoryItem } from "./types/MemoryItem";
import { RepositoryUtils } from "./RepositoryUtils";

/**
 * Saves objects of type T in memory.
 *
 * Intended to be used for development purposes.
 *
 * See also
 * [MatrixCrudRepository](https://github.com/heusalagroup/fi.hg.matrix/blob/main/MatrixCrudRepository.ts)
 */
export class MemoryRepository<T extends StoredRepositoryItem> implements Repository<T> {

    private readonly _members : readonly string[];
    private readonly _isT     : StoredRepositoryItemTestCallback;

    private _items        : readonly MemoryItem<T>[];

    /**
     *
     * @param members Array of members to add in any item created
     * @param isT Test function for T type
     */
    public constructor (
        members : readonly string[] = [],
        isT     : StoredRepositoryItemTestCallback
    ) {
        this._members = members;
        this._items   = [];
        this._isT     = isT;
    }

    public async getAll () : Promise<readonly RepositoryEntry<T>[]> {
        return map(this._items, (item) : RepositoryEntry<T> => ({
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
    ): Promise<readonly RepositoryEntry<T>[]> {

        const items : readonly MemoryItem<T>[] = this._items;

        const filteredItems : readonly MemoryItem<T>[] = filter(
            items,
            (item: MemoryItem<T>) : boolean => get(item?.data, propertyName) === propertyValue
        );

        return map(
            filteredItems,
            (item: MemoryItem<T>) : RepositoryEntry<T> => ({
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
    ) : Promise<RepositoryEntry<T>> {

        const id = MemoryRepository._createId();

        const existingItem = find(this._items, item => item.id === id);

        if (existingItem) throw new Error(`ID "${id}" was not unique`);

        const item : MemoryItem<T> = {
            id      : MemoryRepository._createId(),
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
    ) : Promise<RepositoryEntry<T> | undefined> {
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

    public async waitById (
        id              : string,
        includeMembers ?: boolean,
        timeout        ?: number
    ): Promise<RepositoryEntry<T> | undefined> {
        // FIXME: Implement real long polling
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    resolve(this.findById(id, includeMembers));
                },
                timeout ?? 4000
            )
        });
    }

    public async update (id: string, data: T) : Promise<RepositoryEntry<T>> {

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

    public async deleteById (id: string) : Promise<RepositoryEntry<T>> {

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
        members  : string[]
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

        const prevItem    = this._items[itemIndex];
        const prevMembers = prevItem?.members ?? [];
        const prevInvited = prevItem?.invited ?? [];

        const nextItem = {
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
        newItem   : MemoryItem<T>
    ) {
        this._items = map(
            this._items,
            (item : MemoryItem<T>, i: number) : MemoryItem<T> => i === itemIndex ? newItem : item
        );
    }

    public async deleteByIdList (list: readonly string[]): Promise<RepositoryEntry<T>[]> {
        const results = [];
        let i = 0;
        for (; i < list.length; i += 1) {
            results.push( await this.deleteById(list[i]) );
        }
        return results;
    }

    public async deleteByList (list: RepositoryEntry<T>[]): Promise<RepositoryEntry<T>[]> {
        return this.deleteByIdList( map(list, item => item.id) );
    }

    public async findByIdAndUpdate (id: string, item: T): Promise<RepositoryEntry<T>> {
        const rItem : RepositoryEntry<T> | undefined = await this.findById(id);
        if (rItem === undefined) throw new TypeError(`MemoryRepository.findByIdAndUpdate: Could not find item for "${id}"`);
        return await this.update(rItem.id, item);
    }

    public async getSome (idList: readonly string[]): Promise<RepositoryEntry<T>[]> {
        const allList : readonly RepositoryEntry<T>[] = await this.getAll();
        const list = filter(
            allList,
            (item : RepositoryEntry<T>) : boolean => !!item?.id && idList.includes(item?.id)
        );
        if (!this.isRepositoryEntryList(list)) {
            throw new TypeError(`MemoryRepository.getSome: Illegal data from database`);
        }
        return list;
    }

    public isRepositoryEntryList (list: any): list is RepositoryEntry<T>[] {
        return RepositoryUtils.isRepositoryEntryList(list, this._isT);
    }

    public async updateOrCreateItem (item: T): Promise<RepositoryEntry<T>> {
        const id = item.id;
        const foundItem : RepositoryEntry<T> | undefined = id !== REPOSITORY_NEW_IDENTIFIER ? await this.findById(id) : undefined;
        if (foundItem) {
            return await this.update(foundItem.id, item);
        } else {
            return await this.createItem(item);
        }
    }

}
