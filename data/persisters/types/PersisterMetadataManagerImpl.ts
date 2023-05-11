// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadata } from "../../types/EntityMetadata";
import { PersisterMetadataManager } from "./PersisterMetadataManager";
import { has } from "../../../functions/has";
import { EntityUtils } from "../../utils/EntityUtils";
import { forEach } from "../../../functions/forEach";
import { createEntityRelationManyToOne, EntityRelationManyToOne } from "../../types/EntityRelationManyToOne";
import { find } from "../../../functions/find";
import { EntityField } from "../../types/EntityField";
import { EntityFieldType } from "../../types/EntityFieldType";
import { LogService } from "../../../LogService";
import { LogLevel } from "../../../types/LogLevel";
import { values } from "../../../functions/values";
import { createEntityRelationOneToMany, EntityRelationOneToMany } from "../../types/EntityRelationOneToMany";
import { map } from "../../../functions/map";

const LOG = LogService.createLogger('PersisterMetadataManagerImpl');

export class PersisterMetadataManagerImpl implements PersisterMetadataManager {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private readonly _metadata : { [tableName: string] : EntityMetadata };
    private readonly _idToTableName : { [id: string] : string };
    private readonly _idColumnToTableName : { [columnName: string] : string };

    constructor () {
        this._metadata = {};
        this._idToTableName = {};
        this._idColumnToTableName = {};
    }

    public getMetadataByTable (tableName: string) : EntityMetadata | undefined {
        return has(this._metadata, tableName) ? this._metadata[tableName] : undefined;
    }

    public getTableForIdPropertyName (id: string) : string | undefined {
        return has(this._idToTableName, id) ? this._idToTableName[id] : undefined;
    }

    public getTableForIdColumnName (columnName: string) : string | undefined {
        return has(this._idColumnToTableName, columnName) ? this._idColumnToTableName[columnName] : undefined;
    }

    /**
     * Introduce a metadata object to the manager.
     *
     * Note! Once you have introduced all entities you should call `.setup()`.
     *
     * @param metadata
     */
    public setupEntityMetadata (metadata: EntityMetadata) : void {
        const tableName = metadata.tableName;
        const fields = metadata.fields;
        const idPropertyName = metadata.idPropertyName;
        const idColumnName = EntityUtils.getColumnName(idPropertyName, fields);
        this._metadata[tableName] = metadata;
        if (idPropertyName) {
            this._idToTableName[idPropertyName] = tableName;
        }
        if (idColumnName) {
            this._idColumnToTableName[idColumnName] = tableName;
        }
        this._updateRelations();
    }

    /**
     * Updates relations between tables
     */
    private _updateRelations () : void {
        forEach(
            values(this._metadata),
            (metadata: EntityMetadata) : void => {

                LOG.debug(`metadata = `, metadata);

                /**
                 * This is the table name where the @ManyToOne annotation is located
                 */
                const tableName = metadata.tableName;

                const fields = metadata.fields;
                const manyToOneRelations = metadata.manyToOneRelations;

                LOG.debug(`fields = `, fields);
                LOG.debug(`manyToOneRelations = `, manyToOneRelations);

                forEach(
                    manyToOneRelations,
                    (item: EntityRelationManyToOne) => {
                        LOG.debug(`item = `, item);

                        const propertyName = item.propertyName;
                        if (!propertyName) {
                            LOG.warn(`Warning! Property name invalid: ${propertyName}`);
                            return;
                        }
                        const field : EntityField | undefined = find(fields, (item: EntityField) : boolean => item.propertyName === propertyName);
                        if (!field) {
                            LOG.warn(`Warning! Property "${propertyName}" had @ManyToOne annotation but no field configuration found.`);
                            return;
                        }
                        if (field.fieldType !== EntityFieldType.JOINED_ENTITY) {
                            LOG.warn(`Warning! Property "${propertyName}" had @ManyToOne annotation but was not joined column type (it was "${field.fieldType}").`);
                            return;
                        }

                        const remoteColumnName = field.columnName;

                        /**
                         * This is the table name where the @OneToMany annotation is located
                         */
                        const remoteTableName = this.getTableForIdColumnName(remoteColumnName);
                        if (!remoteTableName) {
                            LOG.debug(`Property "${propertyName}" had @ManyToOne annotation but we could not find remote table name. This might be because the remote entity has not been setup yet.`);
                            return;
                        }

                        /**
                         * This is the metadata where the @OneToMany annotation is located
                         */
                        const remoteMetadata = this.getMetadataByTable(remoteTableName);
                        if (!remoteMetadata) {
                            LOG.debug(`Property "${propertyName}" had @ManyToOne annotation but we could not find metadata for remote table "${remoteTableName}". This might be because the remote entity has not been setup yet.`);
                            return;
                        }

                        remoteMetadata.oneToManyRelations = map(
                            remoteMetadata.oneToManyRelations,
                            (item: EntityRelationOneToMany) : EntityRelationOneToMany => {
                                LOG.debug(`item = `, item, propertyName, remoteTableName);
                                if (item.mappedBy === propertyName && item.mappedTable !== remoteTableName) {
                                    LOG.debug(`Column "${remoteColumnName}" in "${remoteTableName}" will be linked to property "${propertyName}" in table "${tableName}"`);
                                    return createEntityRelationOneToMany(
                                        item.propertyName,
                                        item.mappedBy,
                                        tableName
                                    );
                                } else {
                                    return item;
                                }
                            }
                        );

                        metadata.manyToOneRelations = map(
                            metadata.manyToOneRelations,
                            (i: EntityRelationManyToOne) : EntityRelationManyToOne => {
                                LOG.debug(`item = `, item, propertyName, remoteTableName);

                                let field : EntityField | undefined = find(metadata?.fields, (field: EntityField) => field.propertyName === propertyName);
                                if (field) {
                                    LOG.debug(`Updated metadata for property "${item.propertyName}" and id "${i.propertyName}" as `, remoteMetadata);
                                    field.metadata = remoteMetadata;
                                }

                                if (i.propertyName === propertyName && item.mappedTable !== remoteTableName) {
                                    LOG.debug(`Property "${item.propertyName}" in "${tableName}" will be linked to table "${remoteTableName}"`);
                                    return createEntityRelationManyToOne(
                                        item.propertyName,
                                        remoteTableName
                                    );
                                }

                                return item;
                            }
                        );

                    }
                );

            }
        )
    }

}
