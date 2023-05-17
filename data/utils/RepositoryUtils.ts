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
import { isReservedRepositoryMethodName } from "../types/Repository";
import { ObjectUtils } from "../../ObjectUtils";

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

            const { propertyName } = item;
            LOG.debug(`propertyName = '${propertyName}'`)

            const camelCasePropertyName = RepositoryUtils._getCamelCaseName(propertyName);
            LOG.debug(`camelCasePropertyName = '${camelCasePropertyName}'`)

            // Standard ones
            const findAllByMethodName = `findAllBy${camelCasePropertyName}`;
            if ( !this._isReservedRepositoryMethodName(proto, findAllByMethodName) ) {
                proto[findAllByMethodName] = function findAllByProperty (propertyValue: any, sort?: Sort): Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findAllByMethodName}" was already defined. Not extending it.`);
            }

            const findByMethodName = `findBy${camelCasePropertyName}`;
            if (!this._isReservedRepositoryMethodName(proto, findByMethodName)) {
                proto[findByMethodName] = function findByProperty (propertyValue: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findByMethodName}" was already defined. Not extending it.`);
            }

            const deleteAllByMethodName = `deleteAllBy${camelCasePropertyName}`;
            if (!this._isReservedRepositoryMethodName(proto, deleteAllByMethodName)) {
                proto[deleteAllByMethodName] = function deleteAllByProperty (propertyValue: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                    );
                };
            } else {
                LOG.debug(`The property "${deleteAllByMethodName}" was already defined. Not extending it.`);
            }

            const existsByMethodName = `existsBy${camelCasePropertyName}`;
            if (!this._isReservedRepositoryMethodName(proto, existsByMethodName)) {
                proto[existsByMethodName] = function existsByProperty (propertyValue: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                    );
                };
            } else {
                LOG.debug(`The property "${existsByMethodName}" was already defined. Not extending it.`);
            }

            const countByMethodName = `countBy${camelCasePropertyName}`;
            if (!this._isReservedRepositoryMethodName(proto, countByMethodName)) {
                proto[countByMethodName] = function countByProperty (propertyValue: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyEquals(propertyName, propertyValue),
                    );
                };
            } else {
                LOG.debug(`The property "${countByMethodName}" was already defined. Not extending it.`);
            }



            // Between

            const findAllByMethodNameBetween = `findAllBy${camelCasePropertyName}Between`;
            if (!this._isReservedRepositoryMethodName(proto, findAllByMethodNameBetween)) {
                proto[findAllByMethodNameBetween] = function findAllByPropertyBetween (startValue: any, endValue: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findAllByMethodNameBetween}" was already defined. Not extending it.`);
            }

            const findByMethodNameBetween = `findBy${camelCasePropertyName}Between`;
            if (!this._isReservedRepositoryMethodName(proto, findByMethodNameBetween)) {
                proto[findByMethodNameBetween] = function findByPropertyBetween (startValue: any, endValue: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findByMethodNameBetween}" was already defined. Not extending it.`);
            }

            const deleteAllByMethodNameBetween = `deleteAllBy${camelCasePropertyName}Between`;
            if (!this._isReservedRepositoryMethodName(proto, deleteAllByMethodNameBetween)) {
                proto[deleteAllByMethodNameBetween] = function deleteAllByPropertyBetween (startValue: any, endValue: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                    );
                };
            } else {
                LOG.debug(`The property "${deleteAllByMethodNameBetween}" was already defined. Not extending it.`);
            }

            const existsByMethodNameBetween = `existsBy${camelCasePropertyName}Between`;
            if (!this._isReservedRepositoryMethodName(proto, existsByMethodNameBetween)) {
                proto[existsByMethodNameBetween] = function existsByPropertyBetween (startValue: any, endValue: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                    );
                };
            } else {
                LOG.debug(`The property "${existsByMethodNameBetween}" was already defined. Not extending it.`);
            }

            const countByMethodNameBetween = `countBy${camelCasePropertyName}Between`;
            if (!this._isReservedRepositoryMethodName(proto, countByMethodNameBetween)) {
                proto[countByMethodNameBetween] = function countByPropertyBetween (startValue: any, endValue: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBetween(propertyName, startValue, endValue),
                    );
                };
            } else {
                LOG.debug(`The property "${countByMethodNameBetween}" was already defined. Not extending it.`);
            }




            // After

            const findAllByMethodNameAfter = `findAllBy${camelCasePropertyName}After`;
            if (!this._isReservedRepositoryMethodName(proto, findAllByMethodNameAfter)) {
                proto[findAllByMethodNameAfter] = function findAllByPropertyAfter (value: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findAllByMethodNameAfter}" was already defined. Not extending it.`);
            }

            const findByMethodNameAfter = `findBy${camelCasePropertyName}After`;
            if (!this._isReservedRepositoryMethodName(proto, findByMethodNameAfter)) {
                proto[findByMethodNameAfter] = function findByPropertyAfter (value: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findByMethodNameAfter}" was already defined. Not extending it.`);
            }

            const deleteAllByMethodNameAfter = `deleteAllBy${camelCasePropertyName}After`;
            if (!this._isReservedRepositoryMethodName(proto, deleteAllByMethodNameAfter)) {
                proto[deleteAllByMethodNameAfter] = function deleteAllByPropertyAfter (value: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                    );
                };
            } else {
                LOG.debug(`The property "${deleteAllByMethodNameAfter}" was already defined. Not extending it.`);
            }

            const existsByMethodNameAfter = `existsBy${camelCasePropertyName}After`;
            if (!this._isReservedRepositoryMethodName(proto, existsByMethodNameAfter)) {
                proto[existsByMethodNameAfter] = function existsByPropertyAfter (value: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                    );
                };
            } else {
                LOG.debug(`The property "${existsByMethodNameAfter}" was already defined. Not extending it.`);
            }

            const countByMethodNameAfter = `countBy${camelCasePropertyName}After`;
            if (!this._isReservedRepositoryMethodName(proto, countByMethodNameAfter)) {
                proto[countByMethodNameAfter] = function countByPropertyAfter (value: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyAfter(propertyName, value),
                    );
                };
            } else {
                LOG.debug(`The property "${countByMethodNameAfter}" was already defined. Not extending it.`);
            }





            // Before

            const findAllByMethodNameBefore = `findAllBy${camelCasePropertyName}Before`;
            if (!this._isReservedRepositoryMethodName(proto, findAllByMethodNameBefore)) {
                proto[findAllByMethodNameBefore] = function findAllByPropertyBefore (value: any, sort?: Sort) : Promise<T[]> {
                    return RepositoryUtils._findAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findAllByMethodNameBefore}" was already defined. Not extending it.`);
            }

            const findByMethodNameBefore = `findBy${camelCasePropertyName}Before`;
            if (!this._isReservedRepositoryMethodName(proto, findByMethodNameBefore)) {
                proto[findByMethodNameBefore] = function findByPropertyBefore (value: any, sort?: Sort) : Promise<T | undefined> {
                    return RepositoryUtils._findByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                        sort
                    );
                };
            } else {
                LOG.debug(`The property "${findByMethodNameBefore}" was already defined. Not extending it.`);
            }

            const deleteAllByMethodNameBefore = `deleteAllBy${camelCasePropertyName}Before`;
            if (!this._isReservedRepositoryMethodName(proto, deleteAllByMethodNameBefore)) {
                proto[deleteAllByMethodNameBefore] = function deleteAllByPropertyBefore (value: any) : Promise<void> {
                    return RepositoryUtils._deleteAllByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                    );
                };
            } else {
                LOG.debug(`The property "${deleteAllByMethodNameBefore}" was already defined. Not extending it.`);
            }

            const existsByMethodNameBefore = `existsBy${camelCasePropertyName}Before`;
            if (!this._isReservedRepositoryMethodName(proto, existsByMethodNameBefore)) {
                proto[existsByMethodNameBefore] = function existsByPropertyBefore (value: any) : Promise<boolean> {
                    return RepositoryUtils._existsByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                    );
                };
            } else {
                LOG.debug(`The property "${existsByMethodNameBefore}" was already defined. Not extending it.`);
            }

            const countByMethodNameBefore = `countBy${camelCasePropertyName}Before`;
            if (!this._isReservedRepositoryMethodName(proto, countByMethodNameBefore)) {
                proto[countByMethodNameBefore] = function countByPropertyBefore (value: any) : Promise<number> {
                    return RepositoryUtils._countByCondition<T, ID>(
                        this,
                        entityMetadata,
                        Where.propertyBefore(propertyName, value),
                    );
                };
            } else {
                LOG.debug(`The property "${countByMethodNameBefore}" was already defined. Not extending it.`);
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

    private static _isReservedRepositoryMethodName (
        proto : any,
        name  : string
    ) : boolean {
        return ObjectUtils.isReservedPropertyName(proto, name) || isReservedRepositoryMethodName(name);
    }

}
