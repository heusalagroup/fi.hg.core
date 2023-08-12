// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../Json";
import { map } from "../../../functions/map";
import { forEach } from "../../../functions/forEach";
import { filter } from "../../../functions/filter";
import { get } from "../../../functions/get";
import { uniq } from "../../../functions/uniq";
import { concat } from "../../../functions/concat";

import { SimpleStoredRepositoryItem, StoredRepositoryItemExplainCallback, StoredRepositoryItemTestCallback } from "../../../simpleRepository/types/SimpleStoredRepositoryItem";
import { SimpleRepository as SimpleBaseRepository, REPOSITORY_NEW_IDENTIFIER } from "../../../simpleRepository/types/SimpleRepository";
import { createRepositoryEntry, SimpleRepositoryEntry } from "../../../simpleRepository/types/SimpleRepositoryEntry";
import { createSimpleRepositoryMember } from "../../../simpleRepository/types/SimpleRepositoryMember";
import { SimpleRepositoryUtils } from "../../../simpleRepository/SimpleRepositoryUtils";

import { SimpleEntityRepository } from "./SimpleEntityRepository";
import { SimpleEntity } from "./SimpleEntity";
import { createNewSimpleDTO, NewSimpleDTO } from "./NewSimpleDTO";
import { LogService } from "../../../LogService";
import { LogLevel } from "../../../types/LogLevel";

const LOG = LogService.createLogger('SimpleRepositoryAdapter');

/**
 * This is an adapter between SimpleRepository framework and the Repository
 * framework.
 */
export class SimpleRepositoryAdapter<T extends SimpleStoredRepositoryItem, SimpleEntityT extends SimpleEntity> implements SimpleBaseRepository<T> {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private readonly _repository : SimpleEntityRepository<SimpleEntityT>;
    private readonly _members    : readonly string[];
    private readonly _isT        : StoredRepositoryItemTestCallback;
    // private readonly _explainT   : StoredRepositoryItemExplainCallback;
    // private readonly _tName      : string;
    private readonly _tCreate    : (dto: NewSimpleDTO) => SimpleEntityT;

    public constructor (
        repository : SimpleEntityRepository<SimpleEntityT>,
        tCreate    : (dto: NewSimpleDTO) => SimpleEntityT,
        isT        : StoredRepositoryItemTestCallback,
        // @ts-ignore @todo Why not used?
        tName      : string | undefined,
        // @ts-ignore @todo Why not used?
        explainT   : StoredRepositoryItemExplainCallback | undefined,
        members    : readonly string[] | undefined
    ) {
        this._repository = repository;
        this._members    = members ?? [];
        this._isT        = isT;
        // this._tName      = tName ?? 'T';
        // this._explainT   = explainT ?? ( (value: any) : string => isT(value) ? explainOk() : explainNot(this._tName) );
        this._tCreate    = tCreate;
    }

    public async createItem (
        data: T,
        members?: readonly string[]
    ): Promise<SimpleRepositoryEntry<T>> {
        LOG.debug(`createItem: data = `, data, 'members =', members);
        const newEntity = this._tCreate(
            createNewSimpleDTO(
                data as unknown as ReadonlyJsonObject,
                uniq(concat([], members ? members : [], this._members))
            )
        );
        const savedEntity = await this._repository.save(newEntity);
        return this._createRepositoryEntryFromEntity(savedEntity);
    }

    public async deleteAll (): Promise<SimpleRepositoryEntry<T>[]> {
        // FIXME: This call might not return all non-deleted entries
        const all = await this._repository.findAllByEntityDeleted(false);
        await this._repository.deleteAll();
        return this._createRepositoryEntryArrayFromEntityArray(all);
    }

    public async deleteById (id: string): Promise<SimpleRepositoryEntry<T>> {
        const entity : SimpleEntityT | undefined = await this._repository.findById(id);
        if (!entity) throw new TypeError(`Could not find entity by id: ${id}`);
        entity.entityVersion = SimpleEntity.parseNextVersion(entity);
        entity.entityDeleted = true;
        const savedEntity = await this._repository.save(entity);
        await this._repository.deleteById(id);
        return this._createRepositoryEntryFromEntity(savedEntity);
    }

    public async deleteByIdList (list: readonly string[]): Promise<SimpleRepositoryEntry<T>[]> {
        if (list.length <= 0) throw new TypeError('deleteByIdList: The list argument was empty');
        const entities = await this._repository.findAllById(list);
        forEach(
            entities,
            (item) => {
                item.entityVersion = SimpleEntity.parseNextVersion(item);
                item.entityDeleted = true;
            }
        );
        const savedEntities = await this._repository.saveAll(entities);
        return this._createRepositoryEntryArrayFromEntityArray(savedEntities);
    }

    public async deleteByList (list: SimpleRepositoryEntry<T>[]): Promise<SimpleRepositoryEntry<T>[]> {
        if (list.length <= 0) throw new TypeError('deleteByList: The list argument was empty');
        return await this.deleteByIdList( map(list, item => item.id) );
    }

    public async findById (
        id: string,
        includeMembers?: boolean
    ): Promise<SimpleRepositoryEntry<T> | undefined> {
        const entity : SimpleEntity | undefined = await this._repository.findById(id);
        if (!entity) return undefined;
        return this._createRepositoryEntryFromEntity(entity, includeMembers);
    }

    public async findByIdAndUpdate (id: string, item: T): Promise<SimpleRepositoryEntry<T>> {
        const entity : SimpleEntityT | undefined = await this._repository.findById(id);
        if (!entity) throw new TypeError(`Could not find entity by id: ${id}`);
        entity.entityVersion = SimpleEntity.parseNextVersion(entity);
        entity.entityData = JSON.stringify(item);
        const savedEntity = await this._repository.save(entity);
        return this._createRepositoryEntryFromEntity(savedEntity);
    }

    /**
     *
     * @param propertyName
     * @param propertyValue
     * @fixme Current implementation is slow. Requires better implementation.
     */
    public async findByProperty (propertyName: string, propertyValue: any): Promise<SimpleRepositoryEntry<T> | undefined> {
        const result = await this.getAllByProperty(propertyName, propertyValue);
        const resultCount : number = result?.length ?? 0;
        if (resultCount === 0) return undefined;
        if (resultCount >= 2) throw new TypeError(`MemoryRepository.findByProperty: Multiple items found by property "${propertyName}" as: ${propertyValue}`);
        return result[0];
    }

    public async getAll (): Promise<SimpleRepositoryEntry<T>[]> {
        const entries = await this._repository.findAllByEntityDeleted(false);
        return this._createRepositoryEntryArrayFromEntityArray(entries);
    }

    /**
     *
     * @param propertyName
     * @param propertyValue
     * @FIXME: This is really slow and requires better implementation
     */
    public async getAllByProperty (propertyName: string, propertyValue: any): Promise<SimpleRepositoryEntry<T>[]> {
        const items : SimpleEntity[] = await this._repository.findAllByEntityDeleted(false);
        const filteredEntities = filter(
            items,
            (item: SimpleEntity) : boolean => get( SimpleEntity.parseData(item), propertyName) === propertyValue
        );
        return this._createRepositoryEntryArrayFromEntityArray(filteredEntities);
    }

    public async getSome (idList: readonly string[]): Promise<SimpleRepositoryEntry<T>[]> {
        if (idList.length <= 0) throw new TypeError('getSome: The list argument was empty');
        const list : SimpleEntity[] = await this._repository.findAllById(idList);
        return this._createRepositoryEntryArrayFromEntityArray(list);
    }

    public async inviteToItem (id: string, members: readonly string[]): Promise<void> {
        const entity : SimpleEntityT | undefined = await this._repository.findById(id);
        if (!entity) throw new TypeError(`Could not find entity by id: ${id}`);
        const prevMembers = SimpleEntity.parseMembers(entity) ?? [];
        const prevInvited = SimpleEntity.parseInvited(entity) ?? [];
        const newInvited = filter(
            uniq(
                concat(
                    [],
                    prevInvited,
                    members
                )
            ),
            (item : string) => !prevMembers.includes(item)
        );
        entity.entityVersion = SimpleEntity.parseNextVersion(entity);
        entity.entityInvited = SimpleEntity.prepareInvited(newInvited);
        const savedEntity = await this._repository.save(entity);
        await this._createRepositoryEntryFromEntity(savedEntity);
    }

    public isRepositoryEntryList (list: any): list is SimpleRepositoryEntry<T>[] {
        return SimpleRepositoryUtils.isRepositoryEntryList(list, this._isT);
    }

    /**
     *
     * @param id
     * @FIXME This will accept all received invites. Should we just accept our
     *        own? The implementation was copied from MemoryRepository.
     */
    public async subscribeToItem (id: string): Promise<void> {
        const entity : SimpleEntityT | undefined = await this._repository.findById(id);
        if (!entity) throw new TypeError(`Could not find entity by id: ${id}`);
        const prevMembers = SimpleEntity.parseMembers(entity) ?? [];
        const prevInvited = SimpleEntity.parseInvited(entity) ?? [];
        const newMembers : string[] = concat(prevMembers, prevInvited);
        const newInvited : string[] = [];
        entity.entityVersion = SimpleEntity.parseNextVersion(entity);
        entity.entityMembers = SimpleEntity.prepareMembers(newMembers);
        entity.entityInvited = SimpleEntity.prepareInvited(newInvited);
        const savedEntity = await this._repository.save(entity);
        await this._createRepositoryEntryFromEntity(savedEntity);
    }

    public async update (id: string, data: T): Promise<SimpleRepositoryEntry<T>> {
        LOG.debug(`update: id=`, id, 'data=', data);
        const entity : SimpleEntityT | undefined = await this._repository.findById(id);
        if (!entity) throw new TypeError(`Could not find entity by id: ${id}`);
        entity.entityVersion = SimpleEntity.parseNextVersion(entity);
        entity.entityData = JSON.stringify(data);
        const savedEntity = await this._repository.save(entity);
        return this._createRepositoryEntryFromEntity(savedEntity);
    }

    public async updateOrCreateItem (item: T): Promise<SimpleRepositoryEntry<T>> {
        LOG.debug(`updateOrCreateItem: item = `, item);
        const id = item.id;
        LOG.debug(`updateOrCreateItem: id = `, id);
        const foundItem : SimpleRepositoryEntry<T> | undefined = id && id !== REPOSITORY_NEW_IDENTIFIER ? await this.findById(id) : undefined;
        LOG.debug(`updateOrCreateItem: foundItem = `, foundItem);
        if (foundItem) {
            return await this.update(foundItem.id, item);
        } else {
            return await this.createItem(item);
        }
    }

    /**
     *
     * @param id
     * @param includeMembers
     * @param timeout
     * @FIXME: Implement real long polling
     */
    public async waitById (id: string, includeMembers?: boolean, timeout?: number): Promise<SimpleRepositoryEntry<T> | undefined> {
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

    private _createRepositoryEntryFromEntity (
        entity          : SimpleEntity,
        includeMembers ?: boolean | undefined
    ) : SimpleRepositoryEntry<T> {
        const dto = SimpleEntity.toDTO(entity);
        return createRepositoryEntry<T>(
            dto.data as unknown as T,
            dto.id,
            dto.version,
            dto.deleted,
            includeMembers && dto.members ? map(dto.members, (id: string) => createSimpleRepositoryMember(id)) : undefined
        );
    }

    private _createRepositoryEntryArrayFromEntityArray (list: readonly SimpleEntity[]) : SimpleRepositoryEntry<T>[] {
        return map(list, (item: SimpleEntity) => this._createRepositoryEntryFromEntity(item));
    }

}
