// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../LogService";
import { isFunction } from "../types/Function";
import { isEntity } from "./Entity";
import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";

const LOG = LogService.createLogger( 'Table' );

export const Table = (tableName: string) => {
    return (
        target: any,
        // @ts-ignore @todo why unused?
        context ?: ClassDecoratorContext
    ) : void => {
        const TargetEntity = isFunction(target) ? target : undefined;
        EntityMetadataUtils.updateMetadata(target, (metadata: EntityMetadata) => {
            metadata.tableName = tableName;
            if (TargetEntity) {

                const createEntity = (dto?: any) => new TargetEntity(dto);

                // We'll test if it creates correct entity object
                const ret : any = createEntity() as unknown as any;
                if (!isEntity(ret)) {
                    LOG.warn(`Warning! @Table(${JSON.stringify(tableName)}): Your entity class was not extended from the Entity base class. Functionality will be broken.`);
                } else {
                    metadata.createEntity = createEntity;
                }

            }
        });
    };
};
