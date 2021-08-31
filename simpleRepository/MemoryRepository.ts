import crypto from "crypto";
import {
    concat,
    filter,
    find,
    findIndex,
    get,
    map,
    remove,
    uniq
} from "../modules/lodash";
import RepositoryEntry from "./types/RepositoryEntry";
import Repository from "./types/Repository";

export interface MemoryItem<T> {

    readonly id      : string;
    readonly version : number;
    readonly data    : T;
    readonly deleted : boolean;
    readonly members ?: string[];
    readonly invited ?: string[];

}

/**
 * Saves objects of type T in memory.
 *
 * Intended to be used for development purposes.
 *
 * See also
 * [MatrixCrudRepository](https://github.com/sendanor/matrix/blob/main/MatrixCrudRepository.ts)
 */
export class MemoryRepository<T> implements Repository<T> {

    private readonly _members : string[];
    private readonly _items   : MemoryItem<T>[];

    /**
     *
     * @param members Array of members to add in any item created
     */
    public constructor (
        members: string[] = []
    ) {
        this._members = concat([], members);
        this._items   = [];
    }

    public async getAll () : Promise<RepositoryEntry<T>[]> {
        return map(this._items, item => ({
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
    ): Promise<RepositoryEntry<T>[]> {

        const items = this._items;

        return map(
            filter(
                items,
                (item: RepositoryEntry<T>) : boolean => get(item?.data, propertyName) === propertyValue
            ),
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

        this._items.push(item);

        return {
            id      : item.id,
            version : item.version,
            data    : item.data,
            deleted : item.deleted,
            members : item.members ? concat([], item.members) : undefined
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
            members : includeMembers && item.members?.length ? concat([], item.members) : undefined
        };

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

        this._items[itemIndex] = nextItem;

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

        this._items[itemIndex] = nextItem;

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

        this._items[itemIndex] = nextItem;

    }

    private static _createId () : string {
        return crypto.randomBytes(20).toString('hex');
    }

}

export default MemoryRepository;
