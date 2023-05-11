// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isFunction } from "../types/Function";
import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityMetadata } from "./types/EntityMetadata";

export const Table = (tableName: string) => {
    return (target: any) => {
        const TargetEntity = isFunction(target) ? target : undefined;
        EntityMetadataUtils.updateMetadata(target, (metadata: EntityMetadata) => {
            metadata.tableName = tableName;
            if (TargetEntity) {
                metadata.createEntity = (dto?: any) => new TargetEntity(dto);
            }
        });
    };
};
