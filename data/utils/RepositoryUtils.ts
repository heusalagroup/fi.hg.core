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
import { Where } from "../Where";

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
        entityMetadata : EntityMetadata,
    ) {
        forEach(entityMetadata.fields, (item: EntityField) => {
            const propertyName = item.propertyName;
            LOG.debug(`propertyName = '${propertyName}'`)

            const camelCasePropertyName = RepositoryUtils._getCamelCaseName(propertyName);
            LOG.debug(`camelCasePropertyName = '${camelCasePropertyName}'`)

            // Standard ones
            const findAllByMethodName = `findAllBy${camelCasePropertyName}`;
            if (!has(proto, findAllByMethodName)) {
                proto[findAllByMethodName] = function findAllByProperty (propertyValue: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                        sort
                    );
                };
            }

            const findByMethodName = `findBy${camelCasePropertyName}`;
            if (!has(proto, findByMethodName)) {
                proto[findByMethodName] = function findByProperty (propertyValue: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                        sort
                    );
                };
            }

            const deleteAllByMethodName = `deleteAllBy${camelCasePropertyName}`;
            if (!has(proto, deleteAllByMethodName)) {
                proto[deleteAllByMethodName] = function deleteAllByProperty (propertyValue: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                    );
                };
            }

            const existsByMethodName = `existsBy${camelCasePropertyName}`;
            if (!has(proto, existsByMethodName)) {
                proto[existsByMethodName] = function existsByProperty (propertyValue: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                    );
                };
            }

            const countByMethodName = `countBy${camelCasePropertyName}`;
            if (!has(proto, countByMethodName)) {
                proto[countByMethodName] = function countByProperty (propertyValue: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                    );
                };
            }



            // Between

            const findAllByMethodNameBetween = `findAllBy${camelCasePropertyName}Between`;
            if (!has(proto, findAllByMethodNameBetween)) {
                proto[findAllByMethodNameBetween] = function findAllByPropertyBetween (startValue: any, endValue: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                        sort
                    );
                };
            }

            const findByMethodNameBetween = `findBy${camelCasePropertyName}Between`;
            if (!has(proto, findByMethodNameBetween)) {
                proto[findByMethodNameBetween] = function findByPropertyBetween (startValue: any, endValue: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                        sort
                    );
                };
            }

            const deleteAllByMethodNameBetween = `deleteAllBy${camelCasePropertyName}Between`;
            if (!has(proto, deleteAllByMethodNameBetween)) {
                proto[deleteAllByMethodNameBetween] = function deleteAllByPropertyBetween (startValue: any, endValue: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                    );
                };
            }

            const existsByMethodNameBetween = `existsBy${camelCasePropertyName}Between`;
            if (!has(proto, existsByMethodNameBetween)) {
                proto[existsByMethodNameBetween] = function existsByPropertyBetween (startValue: any, endValue: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                    );
                };
            }

            const countByMethodNameBetween = `countBy${camelCasePropertyName}Between`;
            if (!has(proto, countByMethodNameBetween)) {
                proto[countByMethodNameBetween] = function countByPropertyBetween (startValue: any, endValue: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                    );
                };
            }




            // After

            const findAllByMethodNameAfter = `findAllBy${camelCasePropertyName}After`;
            if (!has(proto, findAllByMethodNameAfter)) {
                proto[findAllByMethodNameAfter] = function findAllByPropertyAfter (value: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                        sort
                    );
                };
            }

            const findByMethodNameAfter = `findBy${camelCasePropertyName}After`;
            if (!has(proto, findByMethodNameAfter)) {
                proto[findByMethodNameAfter] = function findByPropertyAfter (value: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                        sort
                    );
                };
            }

            const deleteAllByMethodNameAfter = `deleteAllBy${camelCasePropertyName}After`;
            if (!has(proto, deleteAllByMethodNameAfter)) {
                proto[deleteAllByMethodNameAfter] = function deleteAllByPropertyAfter (value: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                    );
                };
            }

            const existsByMethodNameAfter = `existsBy${camelCasePropertyName}After`;
            if (!has(proto, existsByMethodNameAfter)) {
                proto[existsByMethodNameAfter] = function existsByPropertyAfter (value: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                    );
                };
            }

            const countByMethodNameAfter = `countBy${camelCasePropertyName}After`;
            if (!has(proto, countByMethodNameAfter)) {
                proto[countByMethodNameAfter] = function countByPropertyAfter (value: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                    );
                };
            }





            // Before

            const findAllByMethodNameBefore = `findAllBy${camelCasePropertyName}Before`;
            if (!has(proto, findAllByMethodNameBefore)) {
                proto[findAllByMethodNameBefore] = function findAllByPropertyBefore (value: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                        sort
                    );
                };
            }

            const findByMethodNameBefore = `findBy${camelCasePropertyName}Before`;
            if (!has(proto, findByMethodNameBefore)) {
                proto[findByMethodNameBefore] = function findByPropertyBefore (value: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                        sort
                    );
                };
            }

            const deleteAllByMethodNameBefore = `deleteAllBy${camelCasePropertyName}Before`;
            if (!has(proto, deleteAllByMethodNameBefore)) {
                proto[deleteAllByMethodNameBefore] = function deleteAllByPropertyBefore (value: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                    );
                };
            }

            const existsByMethodNameBefore = `existsBy${camelCasePropertyName}Before`;
            if (!has(proto, existsByMethodNameBefore)) {
                proto[existsByMethodNameBefore] = function existsByPropertyBefore (value: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                    );
                };
            }

            const countByMethodNameBefore = `countBy${camelCasePropertyName}Before`;
            if (!has(proto, countByMethodNameBefore)) {
                proto[countByMethodNameBefore] = function countByPropertyBefore (value: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
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
     * @param where
     * @param entityMetadata
     * @param sort
     */
    private static async _findAllByCondition<T extends Entity, ID extends EntityIdTypes> (
        self            : CrudRepository<T, ID>,
        entityMetadata  : EntityMetadata,
        where           : Where,
        sort            : Sort | undefined
    ) : Promise<T[]> {
        const persister = self.__getPersister();
        return await persister.findAll<T, ID>(
            entityMetadata,
            where,
            sort
        );
    }

    /**
     * The implementation for `Repository.findBy{PropertyName} : Promise<T | undefined>`.
     *
     * @param self
     * @param where
     * @param entityMetadata
     * @param sort
     */
    private static async _findByCondition<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        entityMetadata : EntityMetadata,
        where          : Where,
        sort           : Sort | undefined
    ) : Promise<T | undefined> {
        const persister = self.__getPersister();
        return await persister.findBy<T, ID>(
            entityMetadata,
            where,
            sort
        );
    }

    /**
     * The implementation for `Repository.deleteAllBy{PropertyName} : Promise<void>`.
     *
     * @param self
     * @param where
     * @param entityMetadata
     */
    private static async _deleteAllByCondition<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        entityMetadata : EntityMetadata,
        where          : Where,
    ) : Promise<void> {
        const persister = self.__getPersister();
        return await persister.deleteAll<T, ID>(
            entityMetadata,
            where
        );
    }

    /**
     * The implementation for `Repository.existsBy{PropertyName} : Promise<boolean>`.
     *
     * @param self
     * @param where
     * @param entityMetadata
     */
    private static async _existsByCondition<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        entityMetadata : EntityMetadata,
        where          : Where,
    ) : Promise<boolean> {
        const persister = self.__getPersister();
        return await persister.existsBy<T, ID>(
            entityMetadata,
            where
        );
    }

    /**
     * The implementation for `Repository.countBy{PropertyName} : Promise<number>`.
     *
     * @param self
     * @param where
     * @param entityMetadata
     */
    private static async _countByCondition<T extends Entity, ID extends EntityIdTypes> (
        self           : CrudRepository<T, ID>,
        entityMetadata : EntityMetadata,
        where          : Where,
    ) : Promise<number> {
        const persister = self.__getPersister();
        return await persister.count<T, ID>(
            entityMetadata,
            where
        );
    }

}
