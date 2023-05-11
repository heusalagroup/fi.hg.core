// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import {forEach} from "../../functions/forEach";
import { has} from "../../functions/has";
import { EntityMetadata } from "../types/EntityMetadata";
import { CrudRepository } from "../types/CrudRepository";
import { Entity, EntityIdTypes } from "../Entity";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { EntityField } from "../types/EntityField";
import { Sort } from "../Sort";

const LOG = LogService.createLogger('RepositoryUtils');

export class RepositoryUtils {

    public static setLogLevel (level : LogLevel) {
        LOG.setLogLevel(level);
    }

    /**
     * Generates default properties using the entity metadata.
     *
     * This will create methods like:
     *
     *   `UserRepository.findAllByEmail(email: string) : Promise<User[]>` ...if the entity has `email` property
     *
     */
    public static generateDefaultMethods<
        T extends Entity,
        ID extends EntityIdTypes,
        RepositoryType extends CrudRepository<T, ID>
    > (
        proto          : any,
        entityMetadata : EntityMetadata
    ) {
        forEach(entityMetadata.fields, (item: EntityField) => {
            const propertyName = item.propertyName;
            LOG.debug(`propertyName = '${propertyName}'`)

            const camelCasePropertyName = RepositoryUtils._getCamelCaseName(propertyName);
            LOG.debug(`camelCasePropertyName = '${camelCasePropertyName}'`)

            const findAllByMethodName = `findAllBy${camelCasePropertyName}`;
            if (!has(proto, findAllByMethodName)) {
                proto[findAllByMethodName] = function findAllByProperty (propertyValue: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByProperty<T, ID>(
                        this,
                        propertyName,
                        propertyValue,
                        entityMetadata,
                        sort
                    );
                };
            }

            const findByMethodName = `findBy${camelCasePropertyName}`;
            if (!has(proto, findByMethodName)) {
                proto[findByMethodName] = function findByProperty (propertyValue: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByProperty<T, ID>(
                        this,
                        propertyName,
                        propertyValue,
                        entityMetadata,
                        sort
                    );
                };
            }

            const deleteAllByMethodName = `deleteAllBy${camelCasePropertyName}`;
            if (!has(proto, deleteAllByMethodName)) {
                proto[deleteAllByMethodName] = function deleteAllByProperty (propertyValue: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByProperty<T, ID>(
                        this,
                        propertyName,
                        propertyValue,
                        entityMetadata
                    );
                };
            }

            const existsByMethodName = `existsBy${camelCasePropertyName}`;
            if (!has(proto, existsByMethodName)) {
                proto[existsByMethodName] = function existsByProperty (propertyValue: any) : Promise<boolean> {
                    return RepositoryUtils._existsByProperty<T, ID>(
                        this,
                        propertyName,
                        propertyValue,
                        entityMetadata
                    );
                };
            }

            const countByMethodName = `countBy${camelCasePropertyName}`;
            if (!has(proto, countByMethodName)) {
                proto[countByMethodName] = function countByProperty (propertyValue: any) : Promise<number> {
                    return RepositoryUtils._countByProperty<T, ID>(
                        this,
                        propertyName,
                        propertyValue,
                        entityMetadata
                    );
                };
            }

        });
    }

    private static _getCamelCaseName (propertyName : string) : string {
        return `${propertyName.substr(0, 1).toUpperCase()}${propertyName.substr(1)}`;
    }

    /**
     * The implementation for `Repository.findAllBy{PropertyName} : T[]`.
     *
     * @param self
     * @param propertyName
     * @param propertyValue
     * @param entityMetadata
     * @param sort
     */
    private static async _findAllByProperty<T extends Entity, ID extends EntityIdTypes> (
        self            : CrudRepository<T, ID>,
        propertyName    : string,
        propertyValue   : any,
        entityMetadata  : EntityMetadata,
        sort            : Sort | undefined
    ) : Promise<T[]> {
        const persister = self.__getPersister();
        return await persister.findAllByProperty<T, ID>(
            propertyName,
            propertyValue,
            entityMetadata,
            sort
        );
    }

    /**
     * The implementation for `Repository.findBy{PropertyName} : Promise<T | undefined>`.
     *
     * @param self
     * @param propertyName
     * @param propertyValue
     * @param entityMetadata
     * @param sort
     */
    private static async _findByProperty<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        propertyName   : string,
        propertyValue  : any,
        entityMetadata : EntityMetadata,
        sort           : Sort | undefined
    ) : Promise<T | undefined> {
        const persister = self.__getPersister();
        return await persister.findByProperty<T, ID>(
            propertyName,
            propertyValue,
            entityMetadata,
            sort
        );
    }

    /**
     * The implementation for `Repository.deleteAllBy{PropertyName} : Promise<void>`.
     *
     * @param self
     * @param propertyName
     * @param propertyValue
     * @param entityMetadata
     */
    private static async _deleteAllByProperty<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        propertyName   : string,
        propertyValue  : any,
        entityMetadata : EntityMetadata
    ) : Promise<void> {

        const persister = self.__getPersister();

        return await persister.deleteAllByProperty<T, ID>(propertyName, propertyValue, entityMetadata);

    }

    /**
     * The implementation for `Repository.existsBy{PropertyName} : Promise<boolean>`.
     *
     * @param self
     * @param propertyName
     * @param propertyValue
     * @param entityMetadata
     */
    private static async _existsByProperty<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        propertyName   : string,
        propertyValue  : any,
        entityMetadata : EntityMetadata
    ) : Promise<boolean> {

        const persister = self.__getPersister();

        return await persister.existsByProperty<T, ID>(propertyName, propertyValue, entityMetadata);

    }

    /**
     * The implementation for `Repository.countBy{PropertyName} : Promise<number>`.
     *
     * @param self
     * @param propertyName
     * @param propertyValue
     * @param entityMetadata
     */
    private static async _countByProperty<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        propertyName   : string,
        propertyValue  : any,
        entityMetadata : EntityMetadata
    ) : Promise<number> {

        const persister = self.__getPersister();

        return await persister.countByProperty<T, ID>(propertyName, propertyValue, entityMetadata);

    }

}
