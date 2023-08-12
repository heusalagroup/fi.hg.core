// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityMetadata } from "../../types/EntityMetadata";
import { PersisterMetadataManager } from "./PersisterMetadataManager";
import { has } from "../../../functions/has";
import { forEach } from "../../../functions/forEach";
import { EntityRelationManyToOne } from "../../types/EntityRelationManyToOne";
import { find } from "../../../functions/find";
import { EntityField } from "../../types/EntityField";
import { EntityFieldType } from "../../types/EntityFieldType";
import { LogService } from "../../../LogService";
import { LogLevel } from "../../../types/LogLevel";
import { values } from "../../../functions/values";

const LOG = LogService.createLogger('PersisterMetadataManagerImpl');

export class PersisterMetadataManagerImpl implements PersisterMetadataManager {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private readonly _metadata : { [tableName: string] : EntityMetadata };

    constructor () {
        this._metadata = {};
    }

    public getMetadataByTable (tableName: string) : EntityMetadata | undefined {
        return has(this._metadata, tableName) ? this._metadata[tableName] : undefined;
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
        if (tableName) {
            this._metadata[tableName] = metadata;
            this._updateRelations();
            LOG.debug(`Updated metadata and relations for table "${tableName}"`);
        } else {
            LOG.warn(`Warning! Table name did not exist on metadata: `, metadata);
        }
    }

    /**
     * Updates relations between tables
     */
    private _updateRelations () : void {
        const tables = values(this._metadata);
        LOG.debug(`_updateRelations: Updating metadata for all configured tables (${tables.length}`);
        forEach(
            tables,
            (metadata: EntityMetadata) : void => {

                LOG.debug(`Updating metadata = `, metadata);

                /**
                 * This is the metadata where the @ManyToOne annotation is located
                 */
                const { tableName, fields, manyToOneRelations } = metadata;

                LOG.debug(`tableName = `, tableName, fields);

                // Update many to one -relations
                LOG.debug(`manyToOneRelations = `, manyToOneRelations);
                forEach(
                    manyToOneRelations,
                    (manyToOne: EntityRelationManyToOne) => {
                        LOG.debug(`many to one = `, manyToOne);

                        const manyToOnePropertyName = manyToOne.propertyName;
                        if (!manyToOnePropertyName) {
                            LOG.warn(`Warning! Property name invalid: ${manyToOnePropertyName}`);
                            return;
                        }
                        const manyToOneField : EntityField | undefined = find(fields, (item: EntityField) : boolean => item.propertyName === manyToOnePropertyName);
                        if (!manyToOneField) {
                            LOG.warn(`Warning! Property "${manyToOnePropertyName}" had @ManyToOne annotation but no field configuration found.`);
                            return;
                        }
                        if (manyToOneField.fieldType !== EntityFieldType.JOINED_ENTITY) {
                            LOG.warn(`Warning! Property "${manyToOnePropertyName}" had @ManyToOne annotation but was not joined column type (it was "${manyToOneField.fieldType}").`);
                            return;
                        }

                        const oneToManyTableName = manyToOne.mappedTable;
                        if (!oneToManyTableName) {
                            LOG.debug(`Property "${manyToOnePropertyName}" had @ManyToOne annotation but we could not find remote table name. This might be because the remote entity has not been setup yet.`);
                            return;
                        }

                        /**
                         * This is the metadata where the @OneToMany annotation is located
                         */
                        const oneToManyMetadata = this.getMetadataByTable(oneToManyTableName);
                        if (!oneToManyMetadata) {
                            LOG.debug(`Property "${manyToOnePropertyName}" had @ManyToOne annotation but we could not find metadata for remote table "${oneToManyTableName}". This might be because the remote entity has not been setup yet.`);
                            return;
                        }

                        if (!manyToOneField.metadata) {
                            LOG.debug(`Updated metadata for property "${manyToOne.propertyName}" as `, oneToManyMetadata);
                            manyToOneField.metadata = oneToManyMetadata;
                        } else {
                            LOG.debug(`Metadata was already defined for "${manyToOne.propertyName}" as `, manyToOneField.metadata);
                        }

                    }
                );

            }
        )
    }

}
